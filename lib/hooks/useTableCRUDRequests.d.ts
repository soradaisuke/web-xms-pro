import { ParamsType } from '@ant-design/pro-provider';
import { ActionType, ProTableProps } from '@ant-design/pro-table';
import { Options, Plugin } from 'ahooks/lib/useRequest/src/types';
import { MutableRefObject } from 'react';
import { CommonRecord, ListResp, RouteParams, User } from '../types/common';
import { CreateServiceConfig, DeleteServiceConfig, RequestConfig, RetrieveArgs, RetrieveServiceConfig, UpdateServiceConfig } from './useCRUDRequests';
export declare type TableCreateServiceConfig<TValue extends CommonRecord = CommonRecord> = CreateServiceConfig<[values: TValue]> & {
    useRequestOptions?: Options<any, [values: TValue]>;
    useRequestPlugins?: Plugin<any, [values: TValue]>[];
};
export declare type TableCreateRequest<TValue = CommonRecord> = (values: TValue) => Promise<boolean>;
export declare function useTableCreateRequest<TValue extends CommonRecord = CommonRecord>(serviceConfig: TableCreateServiceConfig<TValue>, action: MutableRefObject<ActionType>): TableCreateRequest<TValue>;
export declare type TableUpdateServiceConfig<TValue extends CommonRecord = CommonRecord> = UpdateServiceConfig<[values: TValue, id: string | number]> & {
    useRequestOptions?: Options<any, [values: TValue, id: string | number]>;
    useRequestPlugins?: Plugin<any, [values: TValue, id: string | number]>[];
};
export declare type TableUpdateRequest<TValue extends CommonRecord = CommonRecord> = (values: TValue, id: string | number) => Promise<boolean>;
export declare function useTableUpdateRequest<TValue extends CommonRecord = CommonRecord>(serviceConfig: TableUpdateServiceConfig<TValue>, action: MutableRefObject<ActionType>): TableUpdateRequest<TValue>;
export declare type TableDeleteServiceConfig = DeleteServiceConfig<[
    id: string | number
]> & {
    useRequestOptions?: Options<any, [id: string | number]>;
    useRequestPlugins?: Plugin<any, [id: string | number]>[];
};
export declare type TableDeleteRequest = (id?: string | number) => Promise<boolean>;
export declare function useTableDeleteRequest(serviceConfig: TableDeleteServiceConfig, action: MutableRefObject<ActionType>): TableDeleteRequest;
export declare type TableRetrieveServiceConfig<TData = CommonRecord> = RetrieveServiceConfig<TData> & {
    useRequestOptions?: Options<ListResp<TData>, RetrieveArgs>;
    useRequestPlugins?: Plugin<ListResp<TData>, RetrieveArgs>[];
};
export declare type TableRetrieveRequest<TData = CommonRecord> = ProTableProps<TData, ParamsType>['request'];
export declare function useTableRetrieveRequest<TData = CommonRecord>(serviceConfig: TableRetrieveServiceConfig<TData>): TableRetrieveRequest<TData>;
declare type CustomConfig<TData, TValue> = {
    create?: Partial<Exclude<TableCreateServiceConfig<TValue>, string>>;
    update?: Partial<Exclude<TableUpdateServiceConfig<TValue>, string>>;
    delete?: Partial<Exclude<TableDeleteServiceConfig, string>>;
    retrieve?: Partial<Exclude<TableRetrieveServiceConfig<TData>, string>>;
};
export declare type TableRequestConfig<TData = CommonRecord, TValue extends CommonRecord = CommonRecord> = RequestConfig<Extract<TableRetrieveServiceConfig<TData>, string> | (Partial<Exclude<TableRetrieveServiceConfig<TData>, string>> & CustomConfig<TData, TValue>)>;
export declare function useTableRequests<TData = CommonRecord, TValue extends CommonRecord = CommonRecord>(requestConfig: TableRequestConfig<TData, TValue>, matchParams: RouteParams, user: User, action: MutableRefObject<ActionType>): {
    create?: TableCreateRequest<TValue>;
    update?: TableUpdateRequest<TValue>;
    delete?: TableDeleteRequest;
    retrieve?: TableRetrieveRequest<TData>;
};
export {};
