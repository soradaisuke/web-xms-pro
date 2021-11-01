import React from 'react';
import { FormSchema } from '@ant-design/pro-form/lib/components/SchemaForm';
import { CommonRecord } from '../../types/common';
import { XMSFormColumns } from '../../types/form';
export declare type RecordSchemaFormProps<T = CommonRecord> = Omit<FormSchema<T>, 'columns'> & {
    columns: XMSFormColumns[];
    record?: T;
};
declare const RecordSchemaForm: React.FC<RecordSchemaFormProps>;
export default RecordSchemaForm;
