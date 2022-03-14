import { BaseResult, OptionsWithFormat, Service } from '@ahooksjs/use-request/lib/types';
import { RequestOptionsInit } from 'umi-request';
import { CommonRecord, RouteParams, User } from '../types/common';
import { ResponseStructure } from '../utils/request';
declare type ServiceConfigObject<R extends ResponseStructure = ResponseStructure, P extends any[] = any[], U = any> = {
    requestPath?: string;
    requestOptions?: RequestOptionsInit;
    requestService?: Service<R, P>;
    useRequestOptions?: Partial<OptionsWithFormat<R, P, U, U>>;
};
export declare type ServiceConfig<R extends ResponseStructure = ResponseStructure, P extends any[] = any[], U = any> = string | ServiceConfigObject<R, P, U>;
export declare type RequestConfig<S extends ServiceConfig> = S | ((matchParams: RouteParams, user: User) => S);
export declare type CreateArgs = [values: CommonRecord];
export declare type CreateService = Service<ResponseStructure, CreateArgs>;
export declare type CreateRequest = BaseResult<any, CreateArgs>;
export declare type CreateServiceConfig = ServiceConfig<ResponseStructure, CreateArgs, any>;
export declare function useCreateRequest(serviceConfig: CreateServiceConfig, useRequestOptions?: Extract<CreateServiceConfig, ServiceConfigObject>['useRequestOptions']): CreateRequest;
export declare type UpdateArgs = [values: CommonRecord, id?: string | number];
export declare type UpdateService = Service<ResponseStructure, UpdateArgs>;
export declare type UpdateRequest = BaseResult<any, UpdateArgs>;
export declare type UpdateServiceConfig = ServiceConfig<ResponseStructure, UpdateArgs, any>;
export declare function useUpdateRequest(serviceConfig: UpdateServiceConfig, useRequestOptions?: Extract<UpdateServiceConfig, ServiceConfigObject>['useRequestOptions']): UpdateRequest;
export declare type DeleteArgs = [id?: string | number];
export declare type DeleteService = Service<ResponseStructure, DeleteArgs>;
export declare type DeleteRequest = BaseResult<any, DeleteArgs>;
export declare type DeleteServiceConfig = ServiceConfig<ResponseStructure, DeleteArgs, any>;
export declare function useDeleteRequest(serviceConfig: DeleteServiceConfig, useRequestOptions?: Extract<DeleteServiceConfig, ServiceConfigObject>['useRequestOptions']): DeleteRequest;
export declare type RetrieveResult = {
    items: CommonRecord[];
    total: number;
};
export declare type RetrieveArgs = [
    page: number,
    pagesize: number,
    filter: CommonRecord,
    order: string
];
export declare type RetrieveService = Service<ResponseStructure<RetrieveResult>, RetrieveArgs>;
export declare type RetrieveRequest<R = any> = BaseResult<R, RetrieveArgs>;
export declare type RetrieveServiceConfig<R = any> = ServiceConfig<ResponseStructure<RetrieveResult>, RetrieveArgs, R>;
export declare function useRetrieveRequest<R = any>(serviceConfig: RetrieveServiceConfig<R>, useRequestOptions?: Extract<RetrieveServiceConfig<R>, ServiceConfigObject>['useRequestOptions']): RetrieveRequest;
export declare type RetrieveOneArgs = [params: Record<string, string | number>];
export declare type RetrieveOneService = Service<ResponseStructure<CommonRecord>, RetrieveOneArgs>;
export declare type RetrieveOneRequest<R = any> = BaseResult<R, RetrieveOneArgs>;
export declare type RetrieveOneServiceConfig<R = any> = ServiceConfig<ResponseStructure<CommonRecord>, RetrieveOneArgs, R>;
export declare function useRetrieveOneRequest<R = any>(serviceConfig: RetrieveOneServiceConfig<R>, useRequestOptions?: Extract<RetrieveOneServiceConfig<R>, ServiceConfigObject>['useRequestOptions']): RetrieveOneRequest;
export {};
