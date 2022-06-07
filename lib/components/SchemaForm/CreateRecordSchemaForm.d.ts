/// <reference types="react" />
import { RecordSchemaFormProps } from './RecordSchemaForm';
import { TableCreateRequest } from '../../hooks/useTableCRUDRequests';
import { CommonRecord, RouteParams } from '../../types/common';
export declare type CreateRecordSchemaFormProps<T = CommonRecord> = RecordSchemaFormProps<T> & {
    create: TableCreateRequest;
    normalizeSubmitValues?: (values: T, matchParams: RouteParams) => T | Promise<T>;
};
declare function CreateRecordSchemaForm({ normalizeSubmitValues, create, ...rest }: CreateRecordSchemaFormProps): JSX.Element;
declare namespace CreateRecordSchemaForm {
    var defaultProps: {
        normalizeSubmitValues: (v: any) => any;
    };
}
export default CreateRecordSchemaForm;
