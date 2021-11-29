import React from 'react';
import { ParamsType } from '@ant-design/pro-provider';
import { ActionType, ProTableProps } from '@ant-design/pro-table';
import { RecordSchemaFormProps } from './RecordSchemaForm';
import { CommonRecord, RouteParams } from '../../types/common';
import { ServiceConfig, UpdateService } from '../../hooks/useCRUDRequests';
export declare type UpdateRecordSchemaFormProps<T = CommonRecord, U = ParamsType> = RecordSchemaFormProps<T> & Required<Pick<ProTableProps<T, U>, 'rowKey'>> & {
    /** @name 传给该form所编辑的原始数据 */
    record: T;
    /** @name ProTable或ProDescriptions的action实例 */
    containerAction: ActionType;
    update?: (matchParams: RouteParams, record: T, ...base: Parameters<UpdateService>) => ReturnType<UpdateService>;
    requestConfig?: ServiceConfig | ((matchParams: RouteParams) => ServiceConfig);
    /** @name 对提交给后台的数据做转换 */
    normalizeSubmitValues?: (values: T, matchParams: RouteParams, record: T) => T | Promise<T>;
    /** @name 对提交给form的初始数据做转换 */
    normalizeInitialValues?: (record: T, matchParams: RouteParams) => T;
};
declare const UpdateRecordSchemaForm: React.FC<UpdateRecordSchemaFormProps>;
export default UpdateRecordSchemaForm;
