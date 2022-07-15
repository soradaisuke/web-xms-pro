import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { Params, useParams } from 'react-router-dom';
import { TableCreateRequest } from '../../hooks/useTableCRUDRequests';
import { CommonRecord } from '../../types/common';
import RecordSchemaForm, { RecordSchemaFormProps } from './RecordSchemaForm';

export type CreateRecordSchemaFormProps<T = CommonRecord> = RecordSchemaFormProps<T> & {
  create: TableCreateRequest;
  normalizeSubmitValues?: (values: T, matchParams: Params) => T | Promise<T>;
};

function CreateRecordSchemaForm<T = CommonRecord>({
  normalizeSubmitValues,
  create,
  ...rest
}: CreateRecordSchemaFormProps<T>) {
  const matchParams = useParams();

  const onFinish = useCallback(
    async (values) => create(await normalizeSubmitValues(values, matchParams)),
    [matchParams, normalizeSubmitValues, create],
  );

  const props = useMemo<RecordSchemaFormProps<T>>(() => ({
    trigger: (
      <Button icon={<PlusOutlined />} type="primary">
        新建
      </Button>
    ),
    layoutType: 'ModalForm',
    onFinish,
    ...rest,
  }), [onFinish, rest]);

  return (
    <RecordSchemaForm
      {...props}
    />
  );
}

CreateRecordSchemaForm.defaultProps = {
  normalizeSubmitValues: (v) => v,
};

export default CreateRecordSchemaForm;
