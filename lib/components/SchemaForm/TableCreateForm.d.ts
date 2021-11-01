import React from 'react';
import { ActionType } from '@ant-design/pro-table';
import { RecordSchemaFormProps } from './RecordSchemaForm';
import { CommonRecord, RouteParams } from '../../types/common';
import { CreateService, ServiceConfig } from '../../hooks/useCRUDRequests';
export declare type TableCreateFormProps<T = CommonRecord> = RecordSchemaFormProps<T> & {
    tableAction: ActionType;
    create?: (matchParams: RouteParams, ...base: Parameters<CreateService>) => ReturnType<CreateService>;
    requestConfig?: ServiceConfig | ((matchParams: RouteParams) => ServiceConfig);
    normalizeSubmitValues?: (values: T, matchParams: RouteParams) => T | Promise<T>;
};
declare const TableCreateForm: React.FC<TableCreateFormProps>;
export default TableCreateForm;
