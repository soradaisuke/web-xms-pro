/// <reference types="react" />
import { ParamsType } from '@ant-design/pro-provider';
import { ActionType, ProTableProps } from '@ant-design/pro-table';
import { RecordSchemaFormProps } from './RecordSchemaForm';
import { CommonRecord, RouteParams } from '../../types/common';
import { RequestConfig, UpdateServiceConfig } from '../../hooks/useCRUDRequests';
export declare type UpdateRecordSchemaFormProps<T = CommonRecord, U = ParamsType> = RecordSchemaFormProps<T> & Required<Pick<ProTableProps<T, U>, 'rowKey'>> & {
    /** @name 传给该form所编辑的原始数据 */
    record: T;
    /** @name ProTable或ProDescriptions的action实例 */
    containerAction: ActionType;
    requestConfig: RequestConfig<UpdateServiceConfig>;
    /** @name 对提交给后台的数据做转换 */
    normalizeSubmitValues?: (values: T, matchParams: RouteParams, record: T) => T | Promise<T>;
    /** @name 对提交给form的初始数据做转换 */
    normalizeInitialValues?: (record: T, matchParams: RouteParams) => T;
};
declare function UpdateRecordSchemaForm({ normalizeInitialValues, normalizeSubmitValues, requestConfig, containerAction, record, rowKey, ...rest }: UpdateRecordSchemaFormProps): JSX.Element;
declare namespace UpdateRecordSchemaForm {
    var defaultProps: {
        normalizeSubmitValues: (v: any) => any;
        normalizeInitialValues: (v: any) => any;
    };
}
export default UpdateRecordSchemaForm;
