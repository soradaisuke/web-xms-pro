import { ProDescriptionsProps } from '@ant-design/pro-descriptions';
import { ActionType } from '@ant-design/pro-table';
import { Options, Plugin } from 'ahooks/lib/useRequest/src/types';
import { MutableRefObject } from 'react';
import { CommonRecord, RouteParams, User } from '../types/common';
import { DeleteServiceConfig, RequestConfig, RetrieveOneServiceConfig, UpdateServiceConfig } from './useCRUDRequests';
export declare type DescriptionsUpdateServiceConfig<TValue extends CommonRecord = CommonRecord> = UpdateServiceConfig<[values: TValue]> & {
    useRequestOptions?: Options<any, [values: TValue]>;
    useRequestPlugins?: Plugin<any, [values: TValue]>[];
};
export declare type DescriptionsUpdateRequest<TValue extends CommonRecord = CommonRecord> = (values: TValue) => Promise<boolean>;
export declare function useDescriptionsUpdateRequest<TValue extends CommonRecord = CommonRecord>(serviceConfig: DescriptionsUpdateServiceConfig<TValue>, action: MutableRefObject<ActionType>): DescriptionsUpdateRequest<TValue>;
export declare type DescriptionsDeleteServiceConfig = DeleteServiceConfig<[]> & {
    useRequestOptions?: Options<any, []>;
    useRequestPlugins?: Plugin<any, []>[];
};
export declare type DescriptionsDeleteRequest = () => Promise<boolean>;
export declare function useDescriptionsDeleteRequest(serviceConfig: DescriptionsDeleteServiceConfig): DescriptionsDeleteRequest;
export declare type DescriptionsRetrieveServiceConfig<TData = CommonRecord> = RetrieveOneServiceConfig<TData> & {
    useRequestOptions?: Options<TData, [params: CommonRecord]>;
    useRequestPlugins?: Plugin<TData, [params: CommonRecord]>[];
};
export declare type DescriptionsRetrieveRequest<TData = CommonRecord> = ProDescriptionsProps<TData>['request'];
export declare function useDescriptionsRetrieveRequest<TData = CommonRecord>(serviceConfig: DescriptionsRetrieveServiceConfig<TData>): DescriptionsRetrieveRequest<TData>;
declare type CustomConfig<TData, TValue> = {
    update?: Partial<Exclude<DescriptionsUpdateServiceConfig<TValue>, string>>;
    delete?: Partial<Exclude<DescriptionsDeleteServiceConfig, string>>;
    retrieve?: Partial<Exclude<DescriptionsRetrieveServiceConfig<TData>, string>>;
};
export declare type DescriptionsRequestConfig<TData = CommonRecord, TValue extends CommonRecord = CommonRecord> = RequestConfig<Extract<DescriptionsRetrieveServiceConfig<TData>, string> | (Partial<Exclude<DescriptionsRetrieveServiceConfig<TData>, string>> & CustomConfig<TData, TValue>)>;
export declare function useDescriptionsRequests<TData = CommonRecord, TValue extends CommonRecord = CommonRecord>(requestConfig: DescriptionsRequestConfig<TData, TValue>, matchParams: RouteParams, user: User, action: MutableRefObject<ActionType>): {
    update?: DescriptionsUpdateRequest<TValue>;
    delete?: DescriptionsDeleteRequest;
    retrieve?: DescriptionsRetrieveRequest<TData>;
};
export {};
