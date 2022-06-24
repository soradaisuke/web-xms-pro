import { Context, RequestOptionsInit, OnionMiddleware, RequestInterceptor, ResponseInterceptor, RequestOptionsWithResponse, RequestOptionsWithoutResponse } from 'umi-request';
import { CommonRecord } from '../types/common';
export declare enum ErrorShowType {
    SILENT = 0,
    WARN_MESSAGE = 1,
    ERROR_MESSAGE = 2,
    NOTIFICATION = 4
}
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
declare type ErrorAdapter<T = ResponseStructure> = (resData: T, ctx: Context) => ErrorInfoStructure;
declare type ResultAdapter<T = ResponseStructure, R = any> = (resData: T) => R;
export declare type RequestOptions = (RequestOptionsInit | RequestOptionsWithoutResponse | RequestOptionsWithResponse) & {
    skipErrorHandler?: boolean;
    skipFormatResult?: boolean;
    errorShowType?: ErrorShowType;
    errorAdaptor?: ErrorAdapter;
    resultAdapter?: ResultAdapter;
};
export declare const request: import("umi-request").RequestMethod<false>;
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
export declare function extendRequestConfig(requestConfig: RequestConfig): void;
export {};
