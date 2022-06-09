import { ProDescriptionsProps } from '@ant-design/pro-descriptions';
import { ActionType } from '@ant-design/pro-table';
import { Options, Plugin } from 'ahooks/lib/useRequest/src/types';
import { MutableRefObject } from 'react';
import { CommonRecord, RouteParams, User } from '../types/common';
import { ResponseStructure } from '../utils/request';
import { DeleteServiceConfig, RequestConfig, RetrieveOneServiceConfig, UpdateServiceConfig } from './useCRUDRequests';
export declare type DescriptionsUpdateServiceConfig<TValues extends CommonRecord = CommonRecord> = UpdateServiceConfig<[values: TValues]> & {
    useRequestOptions?: Options<ResponseStructure, [values: TValues]>;
    useRequestPlugins?: Plugin<ResponseStructure, [values: TValues]>[];
};
export declare type DescriptionsUpdateRequest<TValues extends CommonRecord = CommonRecord> = (values: TValues) => Promise<boolean>;
export declare function useDescriptionsUpdateRequest<TValues extends CommonRecord = CommonRecord>(serviceConfig: DescriptionsUpdateServiceConfig<TValues>, action: MutableRefObject<ActionType>): DescriptionsUpdateRequest<TValues>;
export declare type DescriptionsDeleteServiceConfig = DeleteServiceConfig<[]> & {
    useRequestOptions?: Options<ResponseStructure, []>;
    useRequestPlugins?: Plugin<ResponseStructure, []>[];
};
export declare type DescriptionsDeleteRequest = () => Promise<boolean>;
export declare function useDescriptionsDeleteRequest(serviceConfig: DescriptionsDeleteServiceConfig): DescriptionsDeleteRequest;
export declare type DescriptionsRetrieveServiceConfig<TData = CommonRecord> = RetrieveOneServiceConfig<TData> & {
    useRequestOptions?: Options<ResponseStructure, [params: CommonRecord]>;
    useRequestPlugins?: Plugin<ResponseStructure, [params: CommonRecord]>[];
};
export declare type DescriptionsRetrieveRequest<TData = CommonRecord> = ProDescriptionsProps<TData>['request'];
export declare function useDescriptionsRetrieveRequest<TData = CommonRecord>(serviceConfig: DescriptionsRetrieveServiceConfig<TData>): DescriptionsRetrieveRequest<TData>;
declare type CustomConfig<TData, TValues> = {
    update?: Partial<Exclude<DescriptionsUpdateServiceConfig<TValues>, string>>;
    delete?: Partial<Exclude<DescriptionsDeleteServiceConfig, string>>;
    retrieve?: Partial<Exclude<DescriptionsRetrieveServiceConfig<TData>, string>>;
};
export declare type DescriptionsRequestConfig<TData = CommonRecord, TValues extends CommonRecord = CommonRecord> = RequestConfig<Extract<DescriptionsRetrieveServiceConfig<TData>, string> | (Partial<Exclude<DescriptionsRetrieveServiceConfig<TData>, string>> & CustomConfig<TData, TValues>)>;
export declare function useDescriptionsRequests<TData = CommonRecord, TValues extends CommonRecord = CommonRecord>(requestConfig: DescriptionsRequestConfig<TData, TValues>, matchParams: RouteParams, user: User, action: MutableRefObject<ActionType>): {
    update?: DescriptionsUpdateRequest<TValues>;
    delete?: DescriptionsDeleteRequest;
    retrieve?: DescriptionsRetrieveRequest<TData>;
};
export {};
