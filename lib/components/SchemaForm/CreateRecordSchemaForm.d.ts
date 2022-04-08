/// <reference types="react" />
import { ActionType } from '@ant-design/pro-table';
import { RecordSchemaFormProps } from './RecordSchemaForm';
import { CommonRecord, RouteParams } from '../../types/common';
import { CreateServiceConfig, RequestConfig } from '../../hooks/useCRUDRequests';
export declare type CreateRecordSchemaFormProps<T = CommonRecord> = RecordSchemaFormProps<T> & {
    /** @name ProTable或ProDescriptions的action实例 */
    containerAction: ActionType;
    requestConfig: RequestConfig<CreateServiceConfig>;
    normalizeSubmitValues?: (values: T, matchParams: RouteParams) => T | Promise<T>;
};
declare function CreateRecordSchemaForm({ normalizeSubmitValues, requestConfig, containerAction, ...rest }: CreateRecordSchemaFormProps): JSX.Element;
declare namespace CreateRecordSchemaForm {
    var defaultProps: {
        normalizeSubmitValues: (v: any) => any;
    };
}
export default CreateRecordSchemaForm;
