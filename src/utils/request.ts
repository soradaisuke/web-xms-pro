import {
  extend,
  Context,
  RequestOptionsInit,
  OnionMiddleware,
  RequestInterceptor,
  ResponseInterceptor,
  ResponseError,
  RequestOptionsWithResponse,
  RequestOptionsWithoutResponse,
} from 'umi-request';
import { isUndefined, mapValues, toString } from 'lodash';
import { CommonRecord } from '../types/common';
import showError, { ErrorShowType, XmsError } from './showError';

interface ResponseStructure<T = any> extends CommonRecord {
  errcode: number;
  errmsg?: string;
  data?: T;
}

interface ErrorInfoStructure {
  success: boolean;
  data?: ResponseStructure;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

interface RequestError extends Error {
  data?: ResponseStructure;
  info?: ErrorInfoStructure;
  request?: Context['req'];
  response?: Context['res'];
}

type ErrorAdapter<T = ResponseStructure> = (
  resData: T,
  ctx: Context
) => ErrorInfoStructure;

type ResultAdapter<T = ResponseStructure, R = any> = (resData: T) => R;

export type RequestOptions = (
  | RequestOptionsInit
  | RequestOptionsWithoutResponse
  | RequestOptionsWithResponse
) & {
  skipErrorHandler?: boolean;
  skipFormatResult?: boolean;
  errorShowType?: ErrorShowType;
  errorAdaptor?: ErrorAdapter;
  resultAdapter?: ResultAdapter;
};

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
    const options = error?.request?.options as RequestOptions;
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

export const request = extend({
  credentials: 'include',
  errorHandler: makeErrorHandler(defaultErrorAdapter),
});

export interface RequestConfig extends RequestOptionsInit {
  /** @name 错误处理配置 */
  errorConfig?: {
    /** @name 错误消息适配器 */
    adaptor?: ErrorAdapter;
  };
  resultAdapter?: ResultAdapter;
  /** @name 中间件 */
  middlewares?: OnionMiddleware[];
  /** @name request拦截器 */
  requestInterceptors?: RequestInterceptor[];
  /** @name response拦截器 */
  responseInterceptors?: ResponseInterceptor[];
}

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
    const options = req.options as RequestOptions;
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
    const options = req.options as RequestOptions;
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
