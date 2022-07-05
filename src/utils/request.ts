/**
 * @module request
 */
import {
  extend,
  Context,
  RequestOptionsInit,
  OnionMiddleware,
  RequestInterceptor,
  ResponseInterceptor,
  ResponseError,
  RequestMethod,
  RequestResponse,
} from 'umi-request';
import { isUndefined, mapValues, toString } from 'lodash';
import { CommonRecord } from '../types/common';
import showError, { ErrorShowType, XmsError } from './showError';

export * as UmiRequest from 'umi-request';

/**
 * 默认的后端请求返回格式
 *
 * @typeParam T - 数据（data）的类型
 */
export interface ResponseStructure<T = any> extends CommonRecord {
  /**
   * 错误代码，0代表成功，非0代表失败
   */
  errcode: number;
  /**
   * 错误消息
   */
  errmsg?: string;
  /**
   * 数据
   */
  data?: T;
}

/**
 * 格式化的错误信息
 */
export interface ErrorInfoStructure<T = ResponseStructure> {
  /**
   * 是否成功
   */
  success: boolean;
  /**
   * 后端返回数据
   */
  data?: T;
  /**
   * 错误代码
   */
  errorCode?: number;
  /**
   * 错误消息
   */
  errorMessage?: string;
  /**
   * 错误展示类型
   *
   * @defaultValue {@link ErrorShowType.ERROR_MESSAGE}
   */
  showType?: ErrorShowType;
}

interface RequestError<T = ResponseStructure> extends Error {
  data?: T;
  info?: ErrorInfoStructure;
  request?: Context['req'];
  response?: Context['res'];
}

/**
 * 错误适配器
 *
 * @typeParam T - 后端返回数据类型
 * @param resData - 后端返回数据
 * @param ctx - 上下文
 * @returns 转换后给前端使用的错误数据
 */
export type ErrorAdapter<T = ResponseStructure> = (
  resData: T,
  ctx: Context
) => ErrorInfoStructure<T>;

/**
 * 数据适配器
 *
 * @typeParam T - 后端返回数据类型
 * @typeParam R - 前端获取数据类型
 * @param resData - 后端返回数据
 * @returns 转换后给前端使用的数据
 */
export type ResultAdapter<T = ResponseStructure, R = any> = (resData: T) => R;

/**
 * 请求参数
 */
export interface XmsRequestOptionsInit extends RequestOptionsInit {
  /**
   * 是否跳过全局错误处理器
   *
   * @defaultValue `false`
   */
  skipErrorHandler?: boolean;
  /**
   * 是否跳过全局数据适配器
   *
   * @defaultValue `false`
   */
  skipFormatResult?: boolean;
  /**
   * 错误展示类型
   *
   * @defaultValue {@link ErrorShowType.ERROR_MESSAGE}
   */
  errorShowType?: ErrorShowType;
  /**
   * 错误适配器
   */
  errorAdaptor?: ErrorAdapter;
  /**
   * 数据适配器
   */
  resultAdapter?: ResultAdapter;
}

export interface XmsRequestOptionsWithResponse extends XmsRequestOptionsInit {
  getResponse: true;
}

export interface XmsRequestOptionsWithoutResponse
  extends XmsRequestOptionsInit {
  getResponse: false;
}

const defaultErrorAdapter: ErrorAdapter = (
  resData: ResponseStructure,
  ctx: Context
): ErrorInfoStructure => {
  const errorInfo: ErrorInfoStructure = {
    success: resData.errcode === 0,
    errorCode: resData.errcode || ctx.res.status,
    errorMessage: resData.errmsg || toString(resData),
  };

  return errorInfo;
};

const defaultResultAdapter: ResultAdapter = (resData: ResponseStructure) =>
  resData.data;

function makeErrorHandler(
  errorAdaptor: ErrorAdapter
): (error: ResponseError) => void {
  return (error: RequestError) => {
    const options = error?.request?.options as XmsRequestOptionsInit;
    if (options?.skipErrorHandler) {
      throw error;
    }

    let errorInfo: ErrorInfoStructure | undefined;
    if (error.name === 'ResponseError' && error.data && error.request) {
      const ctx: Context = {
        req: error.request,
        res: error.response,
      };
      errorInfo = errorAdaptor(error.data, ctx);
      // eslint-disable-next-line no-param-reassign
      error.message = errorInfo?.errorMessage || error.message;
      // eslint-disable-next-line no-param-reassign
      error.data = errorInfo.data;
      // eslint-disable-next-line no-param-reassign
      error.info = errorInfo;
    }
    errorInfo = error.info;

    if (errorInfo) {
      const e: XmsError = new Error(errorInfo?.errorMessage);
      e.code = errorInfo?.errorCode;
      e.showType = options?.errorShowType || errorInfo?.showType;
      showError(e);
    } else {
      showError(error);
    }
    throw error;
  };
}

export interface XmsRequestMethod<R = false> extends RequestMethod<R> {
  <T = any>(url: string, options: XmsRequestOptionsWithResponse): Promise<
    RequestResponse<T>
  >;
  <T = any>(url: string, options: XmsRequestOptionsWithoutResponse): Promise<T>;
  <T = any>(url: string, options?: XmsRequestOptionsInit): R extends true
    ? Promise<RequestResponse<T>>
    : Promise<T>;
  get: XmsRequestMethod<R>;
  post: XmsRequestMethod<R>;
  delete: XmsRequestMethod<R>;
  put: XmsRequestMethod<R>;
  patch: XmsRequestMethod<R>;
  head: XmsRequestMethod<R>;
  options: XmsRequestMethod<R>;
  rpc: XmsRequestMethod<R>;
}

/**
 * 全局请求实例
 */
export const request: XmsRequestMethod = extend({
  credentials: 'include',
  errorHandler: makeErrorHandler(defaultErrorAdapter),
});

/**
 * 全局request配置
 */
export interface RequestConfig extends RequestOptionsInit {
  /**
   * 全局错误配置
   */
  errorConfig?: {
    /**
     * 全局错误适配器
     */
    adaptor?: ErrorAdapter;
  };
  /**
   * 全局数据适配器
   */
  resultAdapter?: ResultAdapter;
  /** 中间件 */
  middlewares?: OnionMiddleware[];
  /** request拦截器 */
  requestInterceptors?: RequestInterceptor[];
  /** response拦截器 */
  responseInterceptors?: ResponseInterceptor[];
}

/**
 * 扩展全局request配置
 * @param requestConfig 全局request配置
 */
export function extendRequestConfig(requestConfig: RequestConfig): void {
  const globalErrorAdaper =
    requestConfig.errorConfig?.adaptor || defaultErrorAdapter;
  const globalResultAdaper =
    requestConfig.resultAdapter || defaultResultAdapter;

  request.extendOptions({
    errorHandler: makeErrorHandler(globalErrorAdaper),
    ...requestConfig,
  });

  // 中间件统一返回数据格式
  request.use(async (ctx, next) => {
    await next();
    const { req, res } = ctx;
    const options = req.options as XmsRequestOptionsInit;
    if (options?.skipFormatResult) {
      return;
    }
    const resData = options?.getResponse ? res.data : res;
    const resultAdaptor = options.resultAdapter || globalResultAdaper;
    const result = resultAdaptor(resData);
    ctx.res = options?.getResponse
      ? {
          ...res,
          data: result,
        }
      : result;
  });

  // 中间件统一错误处理
  // 后端返回格式 { success: boolean, data: any }
  // 按照项目具体情况修改该部分逻辑
  request.use(async (ctx, next) => {
    await next();
    const { req, res } = ctx;
    const options = req.options as XmsRequestOptionsInit;
    if (options?.skipErrorHandler) {
      return;
    }
    const { getResponse } = options;
    const resData = getResponse ? res.data : res;
    const errorAdaptor = options.errorAdaptor || globalErrorAdaper;
    const errorInfo = errorAdaptor(resData, ctx);
    if (errorInfo.success === false) {
      // 抛出错误到 errorHandler 中处理
      const error: RequestError = new Error(errorInfo.errorMessage);
      error.name = 'BizError';
      error.data = resData;
      error.info = errorInfo;
      error.response = res;
      throw error;
    }
  });

  // Add user custom middlewares
  const customMiddlewares = requestConfig.middlewares || [];
  customMiddlewares.forEach((mw) => {
    request.use(mw);
  });

  request.interceptors.request.use((url, options) => {
    if (options.method === 'put') {
      return {
        url,
        options: {
          ...options,
          data: mapValues(options.data, (v) => (isUndefined(v) ? null : v)),
        },
      };
    }
    return { url, options };
  });

  // Add user custom interceptors
  const requestInterceptors = requestConfig.requestInterceptors || [];
  const responseInterceptors = requestConfig.responseInterceptors || [];
  requestInterceptors.map((ri) => request.interceptors.request.use(ri));
  responseInterceptors.map((ri) => request.interceptors.response.use(ri));
}
