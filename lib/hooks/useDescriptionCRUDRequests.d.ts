import { ActionType } from '@ant-design/pro-table';
import { CommonRecord } from '../types/common';
import { DeleteService, RetrieveOneRequest, ServiceConfig, UpdateService } from './useCRUDRequests';
export declare type DescriptionsRetrieveRequest = RetrieveOneRequest;
export declare type DescriptionsUpdateRequest = (values: CommonRecord, action?: ActionType) => Promise<boolean>;
export declare type DescriptionsDeleteRequest = () => Promise<boolean>;
export declare function useDescriptionsUpdateRequest(service: UpdateService | ServiceConfig, action?: ActionType): DescriptionsUpdateRequest;
export declare function useDescriptionsDeleteRequest(service: DeleteService | ServiceConfig): DescriptionsDeleteRequest;
