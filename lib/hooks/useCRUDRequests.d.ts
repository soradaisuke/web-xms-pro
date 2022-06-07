import { Options, Service, Plugin, Result } from 'ahooks/lib/useRequest/src/types';
import { RequestOptionsInit } from 'umi-request';
import { CommonRecord, RouteParams, User } from '../types/common';
import { ResponseStructure } from '../utils/request';
export declare type ServiceConfigObject<TData = CommonRecord, TParams extends any[] = any[]> = {
    requestService: Service<ResponseStructure<TData>, TParams>;
} | {
    requestPath: string;
    requestOptions?: RequestOptionsInit;
};
export declare type ServiceConfig<TData = CommonRecord, TParams extends any[] = any[]> = string | ServiceConfigObject<TData, TParams>;
export declare type RequestConfig<S> = S | ((matchParams: RouteParams, user: User) => S);
declare type CreateArgs = [values: CommonRecord];
export declare type CreateServiceConfig<TParams extends CreateArgs = CreateArgs, TData = CommonRecord> = ServiceConfig<TData, TParams>;
export declare function useCreateRequest<TParams extends CreateArgs = CreateArgs, TData = CommonRecord>(serviceConfig: CreateServiceConfig<TParams, TData>, options?: Options<ResponseStructure<TData>, TParams>, plugins?: Plugin<ResponseStructure<TData>, TParams>[]): Result<ResponseStructure<TData>, TParams>;
declare type UpdateArgs = [values: CommonRecord, id?: string | number];
export declare type UpdateServiceConfig<TParams extends UpdateArgs = UpdateArgs, TData = CommonRecord> = ServiceConfig<TData, TParams>;
export declare function useUpdateRequest<TParams extends UpdateArgs = UpdateArgs, TData = CommonRecord>(serviceConfig: UpdateServiceConfig<TParams, TData>, options?: Options<ResponseStructure<TData>, TParams>, plugins?: Plugin<ResponseStructure<TData>, TParams>[]): Result<ResponseStructure<TData>, TParams>;
declare type DeleteArgs = [id?: string | number];
export declare type DeleteServiceConfig<TParams extends DeleteArgs = DeleteArgs, TData = CommonRecord> = ServiceConfig<TData, TParams>;
export declare function useDeleteRequest<TParams extends DeleteArgs = DeleteArgs, TData = CommonRecord>(serviceConfig: DeleteServiceConfig<TParams, TData>, options?: Options<ResponseStructure<TData>, TParams>, plugins?: Plugin<ResponseStructure<TData>, TParams>[]): Result<ResponseStructure<TData>, TParams>;
export declare type RetrieveResult<TData = CommonRecord> = {
    items: TData[];
    total: number;
};
export declare type RetrieveArgs = [
    page: number,
    pagesize: number,
    filter: CommonRecord,
    order: string
];
export declare type RetrieveServiceConfig<TData = CommonRecord, TParams extends RetrieveArgs = RetrieveArgs> = ServiceConfig<RetrieveResult<TData>, TParams>;
export declare function useRetrieveRequest<TData = CommonRecord, TParams extends RetrieveArgs = RetrieveArgs>(serviceConfig: RetrieveServiceConfig<TData, TParams>, options?: Options<ResponseStructure<RetrieveResult<TData>>, TParams>, plugins?: Plugin<ResponseStructure<RetrieveResult<TData>>, TParams>[]): Result<ResponseStructure<RetrieveResult<TData>>, TParams>;
declare type RetrieveOneArgs = [params: CommonRecord];
export declare type RetrieveOneServiceConfig<TData = CommonRecord, TParams extends RetrieveOneArgs = RetrieveOneArgs> = ServiceConfig<TData, TParams>;
export declare function useRetrieveOneRequest<TData = CommonRecord, TParams extends RetrieveOneArgs = RetrieveOneArgs>(serviceConfig: RetrieveOneServiceConfig<TData, TParams>, options?: Options<ResponseStructure<TData>, TParams>, plugins?: Plugin<ResponseStructure<TData>, TParams>[]): Result<ResponseStructure<TData>, TParams>;
export {};
