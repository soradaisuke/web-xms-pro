import {
  extend,
  Context,
  RequestOptionsInit,
  OnionMiddleware,
  RequestInterceptor,
  ResponseInterceptor,
  ResponseError,
} from 'umi-request';
import { message, notification } from 'antd';
import useAhooksRequest, { UseRequestProvider } from '@ahooksjs/use-request';
import {
  BaseOptions,
  BaseResult,
  CombineService,
  OptionsWithFormat,
} from '@ahooksjs/use-request/lib/types';
import { CommonRecord } from '../types/common';

export enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 4,
}

export interface ResponseStructure<T = any> extends CommonRecord {
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

type ErrorAdapter = (
  resData: ResponseStructure,
  ctx: Context
) => ErrorInfoStructure;

const defaultErrorAdapter: ErrorAdapter = (
  resData: ResponseStructure
): ErrorInfoStructure => {
  const errorInfo: ErrorInfoStructure = {
    success: resData.errcode === 0,
    errorCode: resData.errcode,
    errorMessage: resData.errmsg,
  };

  return errorInfo;
};

function makeErrorHandler(
  errorAdaptor: ErrorAdapter
): (error: ResponseError) => void {
  return (error: RequestError) => {
    if (error?.request?.options?.skipErrorHandler) {
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
      const errorMessage = errorInfo?.errorMessage;
      const errorCode = errorInfo?.errorCode;
      // const errorPage =
      //   requestConfig.errorConfig?.errorPage || DEFAULT_ERROR_PAGE;

      switch (errorInfo?.showType) {
        case ErrorShowType.SILENT:
          // do nothing
          break;
        case ErrorShowType.WARN_MESSAGE:
          message.warn(errorMessage);
          break;
        case ErrorShowType.ERROR_MESSAGE:
          message.error(errorMessage);
          break;
        case ErrorShowType.NOTIFICATION:
          notification.open({
            description: errorMessage,
            message: errorCode,
          });
          break;
        default:
          message.error(errorMessage);
          break;
      }
    } else {
      message.error(error.message || 'Request error, please retry.');
    }
    throw error;
  };
}

const request = extend({
  credentials: 'include',
  errorHandler: makeErrorHandler(defaultErrorAdapter),
});

function useRequest<
  R extends ResponseStructure = ResponseStructure,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  P extends any[] = any,
  U = CommonRecord
>(
  service: CombineService<R, P>,
  options: OptionsWithFormat<R, P, U, U>
): BaseResult<U, P>;

function useRequest<
  R extends ResponseStructure = ResponseStructure,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  P extends any[] = any
>(service: CombineService<R, P>, options?: BaseOptions<R, P>): BaseResult<R, P>;

function useRequest<
  R extends ResponseStructure = ResponseStructure,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  P extends any[] = any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
>(service: CombineService<R, P>, options: any = {}): any {
  return useAhooksRequest(service, {
    formatResult: (res) => res?.data,
    requestMethod: (requestOptions) => {
      if (typeof requestOptions === 'string') {
        return request(requestOptions);
      }
      if (typeof requestOptions === 'object') {
        const { url, ...rest } = requestOptions;
        return request(url, rest);
      }
      throw new Error('request options error');
    },
    ...options,
  });
}

export interface RequestOptions extends RequestOptionsInit {
  /** @name 错误处理配置 */
  errorConfig?: {
    /** @name 错误消息适配器 */
    adaptor?: ErrorAdapter;
  };
  /** @name 中间件 */
  middlewares?: OnionMiddleware[];
  /** @name request拦截器 */
  requestInterceptors?: RequestInterceptor[];
  /** @name response拦截器 */
  responseInterceptors?: ResponseInterceptor[];
  /** @name 获取用户信息的path */
  authPath: string;
}

function extendRequestConfig(requestOptions: RequestOptions): void {
  const errorAdaptor =
    requestOptions.errorConfig?.adaptor || defaultErrorAdapter;

  request.extendOptions({
    errorHandler: makeErrorHandler(errorAdaptor),
    ...requestOptions,
  });

  // 中间件统一错误处理
  // 后端返回格式 { success: boolean, data: any }
  // 按照项目具体情况修改该部分逻辑
  request.use(async (ctx, next) => {
    await next();
    const { req, res } = ctx;
    if (req.options?.skipErrorHandler) {
      return;
    }
    const { options } = req;
    const { getResponse } = options;
    const resData = getResponse ? res.data : res;
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
  const customMiddlewares = requestOptions.middlewares || [];
  customMiddlewares.forEach((mw) => {
    request.use(mw);
  });

  // Add user custom interceptors
  const requestInterceptors = requestOptions.requestInterceptors || [];
  const responseInterceptors = requestOptions.responseInterceptors || [];
  requestInterceptors.map((ri) => request.interceptors.request.use(ri));
  responseInterceptors.map((ri) => request.interceptors.response.use(ri));
}

export { request, useRequest, extendRequestConfig, UseRequestProvider };
