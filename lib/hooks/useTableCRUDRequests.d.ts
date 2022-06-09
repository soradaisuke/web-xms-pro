import { ParamsType } from '@ant-design/pro-provider';
import { ActionType, ProTableProps } from '@ant-design/pro-table';
import { Options, Plugin } from 'ahooks/lib/useRequest/src/types';
import { MutableRefObject } from 'react';
import { CommonRecord, RouteParams, User } from '../types/common';
import { ResponseStructure } from '../utils/request';
import { CreateServiceConfig, DeleteServiceConfig, RequestConfig, RetrieveArgs, RetrieveResult, RetrieveServiceConfig, UpdateServiceConfig } from './useCRUDRequests';
export declare type TableCreateServiceConfig<TValues extends CommonRecord = CommonRecord> = CreateServiceConfig<[values: TValues]> & {
    useRequestOptions?: Options<ResponseStructure, [values: TValues]>;
    useRequestPlugins?: Plugin<ResponseStructure, [values: TValues]>[];
};
export declare type TableCreateRequest<TValues extends CommonRecord = CommonRecord> = (values: TValues) => Promise<boolean>;
export declare function useTableCreateRequest<TValues extends CommonRecord = CommonRecord>(serviceConfig: TableCreateServiceConfig<TValues>, action: MutableRefObject<ActionType>): TableCreateRequest<TValues>;
export declare type TableUpdateServiceConfig<TValues extends CommonRecord = CommonRecord> = UpdateServiceConfig<[values: TValues, id: string | number]> & {
    useRequestOptions?: Options<ResponseStructure, [
        values: TValues,
        id: string | number
    ]>;
    useRequestPlugins?: Plugin<ResponseStructure, [
        values: TValues,
        id: string | number
    ]>[];
};
export declare type TableUpdateRequest<TValues extends CommonRecord = CommonRecord> = (values: TValues, id: string | number) => Promise<boolean>;
export declare function useTableUpdateRequest<TValues extends CommonRecord = CommonRecord>(serviceConfig: TableUpdateServiceConfig<TValues>, action: MutableRefObject<ActionType>): TableUpdateRequest<TValues>;
export declare type TableDeleteServiceConfig = DeleteServiceConfig<[
    id: string | number
]> & {
    useRequestOptions?: Options<ResponseStructure, [id: string | number]>;
    useRequestPlugins?: Plugin<ResponseStructure, [id: string | number]>[];
};
export declare type TableDeleteRequest = (id?: string | number) => Promise<boolean>;
export declare function useTableDeleteRequest(serviceConfig: TableDeleteServiceConfig, action: MutableRefObject<ActionType>): TableDeleteRequest;
export declare type TableRetrieveServiceConfig<TData = CommonRecord> = RetrieveServiceConfig<TData> & {
    useRequestOptions?: Options<ResponseStructure<RetrieveResult<TData>>, RetrieveArgs>;
    useRequestPlugins?: Plugin<ResponseStructure<RetrieveResult<TData>>, RetrieveArgs>[];
};
export declare type TableRetrieveRequest<TData = CommonRecord> = ProTableProps<TData, ParamsType>['request'];
export declare function useTableRetrieveRequest<TData = CommonRecord>(serviceConfig: TableRetrieveServiceConfig<TData>): TableRetrieveRequest<TData>;
declare type CustomConfig<TData, TValues> = {
    create?: Partial<Exclude<TableCreateServiceConfig<TValues>, string>>;
    update?: Partial<Exclude<TableUpdateServiceConfig<TValues>, string>>;
    delete?: Partial<Exclude<TableDeleteServiceConfig, string>>;
    retrieve?: Partial<Exclude<TableRetrieveServiceConfig<TData>, string>>;
};
export declare type TableRequestConfig<TData = CommonRecord, TValues extends CommonRecord = CommonRecord> = RequestConfig<Extract<TableRetrieveServiceConfig<TData>, string> | (Partial<Exclude<TableRetrieveServiceConfig<TData>, string>> & CustomConfig<TData, TValues>)>;
export declare function useTableRequests<TData = CommonRecord, TValues extends CommonRecord = CommonRecord>(requestConfig: TableRequestConfig<TData, TValues>, matchParams: RouteParams, user: User, action: MutableRefObject<ActionType>): {
    create?: TableCreateRequest<TValues>;
    update?: TableUpdateRequest<TValues>;
    delete?: TableDeleteRequest;
    retrieve?: TableRetrieveRequest<TData>;
};
export {};
