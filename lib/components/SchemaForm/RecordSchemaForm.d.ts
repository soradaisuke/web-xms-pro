/// <reference types="react" />
import { FormSchema } from '@ant-design/pro-form/lib/components/SchemaForm';
import { CommonRecord } from '../../types/common';
import { XMSFormColumns } from '../../types/form';
export declare type RecordSchemaFormProps<T = CommonRecord> = Omit<FormSchema<T>, 'columns'> & {
    columns: XMSFormColumns[];
    record?: T;
};
declare function RecordSchemaForm<T = CommonRecord>({ layoutType, columns, record, ...rest }: RecordSchemaFormProps<T>): JSX.Element;
declare namespace RecordSchemaForm {
    var defaultProps: {
        record: any;
    };
}
export default RecordSchemaForm;
