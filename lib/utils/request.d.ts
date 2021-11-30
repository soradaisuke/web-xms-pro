import { Context, RequestOptionsInit, OnionMiddleware, RequestInterceptor, ResponseInterceptor } from 'umi-request';
import { UseRequestProvider } from '@ahooksjs/use-request';
import { BaseOptions, BaseResult, CombineService, OptionsWithFormat } from '@ahooksjs/use-request/lib/types';
import { CommonRecord } from '../types/common';
export declare enum ErrorShowType {
    SILENT = 0,
    WARN_MESSAGE = 1,
    ERROR_MESSAGE = 2,
    NOTIFICATION = 4
}
interface ResponseStructure {
    errcode: number;
    errmsg: string;
    data?: CommonRecord;
}
interface ErrorInfoStructure {
    success: boolean;
    data?: ResponseStructure;
    errorCode?: number;
    errorMessage?: string;
    showType?: ErrorShowType;
}
declare type ErrorAdapter = <T extends ResponseStructure>(resData: T, ctx: Context) => ErrorInfoStructure;
declare const request: import("umi-request").RequestMethod<false>;
declare function useRequest<R extends ResponseStructure = ResponseStructure, P extends any[] = any, U = CommonRecord>(service: CombineService<R, P>, options: OptionsWithFormat<R, P, U, U>): BaseResult<U, P>;
declare function useRequest<R extends ResponseStructure = ResponseStructure, P extends any[] = any>(service: CombineService<R, P>, options?: BaseOptions<R['data'], P>): BaseResult<R['data'], P>;
export interface RequestConfig extends RequestOptionsInit {
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
declare function extendRequestConfig(requestConfig: RequestConfig): void;
export { request, useRequest, extendRequestConfig, UseRequestProvider };
