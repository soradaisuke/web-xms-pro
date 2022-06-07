import React, { useCallback } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import RecordSchemaForm, { RecordSchemaFormProps } from './RecordSchemaForm';
import { TableCreateRequest } from '../../hooks/useTableCRUDRequests';
import { CommonRecord, RouteParams } from '../../types/common';

export type CreateRecordSchemaFormProps<T = CommonRecord> =
  RecordSchemaFormProps<T> & {
    create: TableCreateRequest;
    normalizeSubmitValues?: (
      values: T,
      matchParams: RouteParams
    ) => T | Promise<T>;
  };

function CreateRecordSchemaForm({
  normalizeSubmitValues,
  create,
  ...rest
}: CreateRecordSchemaFormProps) {
  const matchParams = useParams();

  const onFinish = useCallback(
    async (values) => create(await normalizeSubmitValues(values, matchParams)),
    [matchParams, normalizeSubmitValues, create]
  );

  return (
    <RecordSchemaForm
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      trigger={
        <Button icon={<PlusOutlined />} type="primary">
          新建
        </Button>
      }
      layoutType="ModalForm"
      onFinish={onFinish}
      {...rest}
    />
  );
}

CreateRecordSchemaForm.defaultProps = {
  normalizeSubmitValues: (v) => v,
};

export default CreateRecordSchemaForm;
