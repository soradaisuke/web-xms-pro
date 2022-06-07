/// <reference types="react" />
import { ParamsType } from '@ant-design/pro-provider';
import { ProTableProps } from '@ant-design/pro-table';
import { RecordSchemaFormProps } from './RecordSchemaForm';
import { TableUpdateRequest } from '../../hooks/useTableCRUDRequests';
import { CommonRecord, RouteParams } from '../../types/common';
import { DescriptionsUpdateRequest } from '../../hooks/useDescriptionCRUDRequests';
export declare type UpdateRecordSchemaFormProps<T = CommonRecord, U = ParamsType> = RecordSchemaFormProps<T> & Required<Pick<ProTableProps<T, U>, 'rowKey'>> & {
    /** @name 传给该form所编辑的原始数据 */
    record: T;
    update: TableUpdateRequest | DescriptionsUpdateRequest;
    /** @name 对提交给后台的数据做转换 */
    normalizeSubmitValues?: (values: T, matchParams: RouteParams, record: T) => T | Promise<T>;
    /** @name 对提交给form的初始数据做转换 */
    normalizeInitialValues?: (record: T, matchParams: RouteParams) => T;
};
declare function UpdateRecordSchemaForm({ normalizeInitialValues, normalizeSubmitValues, update, record, rowKey, ...rest }: UpdateRecordSchemaFormProps): JSX.Element;
declare namespace UpdateRecordSchemaForm {
    var defaultProps: {
        normalizeSubmitValues: (v: any) => any;
        normalizeInitialValues: (v: any) => any;
    };
}
export default UpdateRecordSchemaForm;
