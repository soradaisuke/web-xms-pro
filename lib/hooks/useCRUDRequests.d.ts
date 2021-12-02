import { BaseResult, Service } from '@ahooksjs/use-request/lib/types';
import { RequestOptionsInit } from 'umi-request';
import { CommonRecord, RouteParams, User } from '../types/common';
export declare type ServiceConfigObject = {
    requestPath: string;
    requestOptions?: RequestOptionsInit;
};
export declare type ServiceConfig = string | ServiceConfigObject;
export declare type RequestConfig = ServiceConfig | ((matchParams: RouteParams, user: User) => ServiceConfig);
export declare type RetrieveService = Service<{
    data: CommonRecord[];
    success: boolean;
    total: number;
}, [
    params: Record<string, string | number>,
    sort: Record<string, 'ascend' | 'descend'>
]>;
export declare type RetrieveOneService = Service<CommonRecord, [
    params: Record<string, string | number>
]>;
export declare type CreateService = Service<any, [values: CommonRecord]>;
export declare type UpdateService = Service<any, [
    values: CommonRecord,
    id?: string | number
]>;
export declare type DeleteService = Service<any, [id?: string | number]>;
export declare type RetrieveRequest = BaseResult<{
    data: CommonRecord[];
    success: boolean;
    total: number;
}, [
    params: Record<string, string | number>,
    sort: Record<string, 'ascend' | 'descend'>
]>;
export declare type RetrieveOneRequest = BaseResult<CommonRecord, [
    params: Record<string, string | number>
]>;
export declare type CreateRequest = BaseResult<any, [values: CommonRecord]>;
export declare type UpdateRequest = BaseResult<any, [
    values: CommonRecord,
    id?: string | number
]>;
export declare type DeleteRequest = BaseResult<any, [id?: string | number]>;
export declare function useCreateRequest(service: CreateService | ServiceConfig): CreateRequest;
export declare function useRetrieveRequest(service: RetrieveService | ServiceConfig): RetrieveRequest;
export declare function useRetrieveOneRequest(service: RetrieveOneService | ServiceConfig): RetrieveOneRequest;
export declare function useUpdateRequest(service: UpdateService | ServiceConfig): UpdateRequest;
export declare function useDeleteRequest(service: DeleteService | ServiceConfig): DeleteRequest;
