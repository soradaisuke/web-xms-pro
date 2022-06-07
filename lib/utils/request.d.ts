import { Context, RequestOptionsInit, OnionMiddleware, RequestInterceptor, ResponseInterceptor } from 'umi-request';
import { Options, Service, Plugin, Result } from 'ahooks/lib/useRequest/src/types';
import { CommonRecord } from '../types/common';
export declare enum ErrorShowType {
    SILENT = 0,
    WARN_MESSAGE = 1,
    ERROR_MESSAGE = 2,
    NOTIFICATION = 4
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
declare type ErrorAdapter = (resData: ResponseStructure, ctx: Context) => ErrorInfoStructure;
declare const request: import("umi-request").RequestMethod<false>;
declare function useRequest<TData = CommonRecord, TParams extends any[] = any>(service: Service<TData, TParams>, options?: Options<TData, TParams>, plugins?: Plugin<TData, TParams>[]): Result<TData, TParams>;
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
declare function extendRequestConfig(requestOptions: RequestOptions): void;
export { request, useRequest, extendRequestConfig };
