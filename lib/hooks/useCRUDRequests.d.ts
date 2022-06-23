import { Options, Service, Plugin, Result } from 'ahooks/lib/useRequest/src/types';
import { CommonRecord, ListResp, RouteParams, User } from '../types/common';
import { RequestOptions } from '../utils/request';
export declare type ServiceConfigObject<TData = CommonRecord, TParams extends any[] = any[]> = {
    requestService: Service<TData, TParams>;
} | {
    requestPath: string;
    requestOptions?: RequestOptions;
};
export declare type ServiceConfig<TData = CommonRecord, TParams extends any[] = any[]> = string | ServiceConfigObject<TData, TParams>;
export declare type RequestConfig<S> = S | ((matchParams: RouteParams, user: User) => S);
declare type CreateArgs = [values: CommonRecord];
export declare type CreateServiceConfig<TParams extends CreateArgs = CreateArgs, TData = CommonRecord> = ServiceConfig<TData, TParams>;
export declare function useCreateRequest<TParams extends CreateArgs = CreateArgs, TData = CommonRecord>(serviceConfig: CreateServiceConfig<TParams, TData>, options?: Options<TData, TParams>, plugins?: Plugin<TData, TParams>[]): Result<TData, TParams>;
declare type UpdateArgs = [values: CommonRecord, id?: string | number];
export declare type UpdateServiceConfig<TParams extends UpdateArgs = UpdateArgs, TData = CommonRecord> = ServiceConfig<TData, TParams>;
export declare function useUpdateRequest<TParams extends UpdateArgs = UpdateArgs, TData = CommonRecord>(serviceConfig: UpdateServiceConfig<TParams, TData>, options?: Options<TData, TParams>, plugins?: Plugin<TData, TParams>[]): Result<TData, TParams>;
declare type DeleteArgs = [id?: string | number];
export declare type DeleteServiceConfig<TParams extends DeleteArgs = DeleteArgs, TData = CommonRecord> = ServiceConfig<TData, TParams>;
export declare function useDeleteRequest<TParams extends DeleteArgs = DeleteArgs, TData = CommonRecord>(serviceConfig: DeleteServiceConfig<TParams, TData>, options?: Options<TData, TParams>, plugins?: Plugin<TData, TParams>[]): Result<TData, TParams>;
export declare type RetrieveArgs = [
    page: number,
    pagesize: number,
    filter: CommonRecord,
    order: string
];
export declare type RetrieveServiceConfig<TData = CommonRecord, TParams extends RetrieveArgs = RetrieveArgs> = ServiceConfig<ListResp<TData>, TParams>;
export declare function useRetrieveRequest<TData = CommonRecord, TParams extends RetrieveArgs = RetrieveArgs>(serviceConfig: RetrieveServiceConfig<TData, TParams>, options?: Options<ListResp<TData>, TParams>, plugins?: Plugin<ListResp<TData>, TParams>[]): Result<ListResp<TData>, TParams>;
declare type RetrieveOneArgs = [params: CommonRecord];
export declare type RetrieveOneServiceConfig<TData = CommonRecord, TParams extends RetrieveOneArgs = RetrieveOneArgs> = ServiceConfig<TData, TParams>;
export declare function useRetrieveOneRequest<TData = CommonRecord, TParams extends RetrieveOneArgs = RetrieveOneArgs>(serviceConfig: RetrieveOneServiceConfig<TData, TParams>, options?: Options<TData, TParams>, plugins?: Plugin<TData, TParams>[]): Result<TData, TParams>;
export {};
