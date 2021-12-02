import React from 'react';
import { ActionType } from '@ant-design/pro-table';
import { RecordSchemaFormProps } from './RecordSchemaForm';
import { CommonRecord, RouteParams } from '../../types/common';
import { CreateService, RequestConfig } from '../../hooks/useCRUDRequests';
export declare type CreateRecordSchemaFormProps<T = CommonRecord> = RecordSchemaFormProps<T> & {
    /** @name ProTable或ProDescriptions的action实例 */
    containerAction: ActionType;
    create?: (matchParams: RouteParams, ...base: Parameters<CreateService>) => ReturnType<CreateService>;
    requestConfig?: RequestConfig;
    normalizeSubmitValues?: (values: T, matchParams: RouteParams) => T | Promise<T>;
};
declare const CreateRecordSchemaForm: React.FC<CreateRecordSchemaFormProps>;
export default CreateRecordSchemaForm;
