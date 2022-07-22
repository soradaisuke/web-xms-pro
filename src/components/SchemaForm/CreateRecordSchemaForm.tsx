import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { Params, useParams } from 'react-router-dom';
import { TableCreateRequest } from '../../hooks/useTableCRUDRequests';
import { CommonRecord } from '../../types/common';
import RecordSchemaForm, { RecordSchemaFormProps } from './RecordSchemaForm';

export type CreateRecordSchemaFormProps<T = CommonRecord> = RecordSchemaFormProps<T> & {
  create: TableCreateRequest;
  /**
   * @deprecated 使用transform
   */
  normalizeSubmitValues?: (values: T, matchParams: Params) => T | Promise<T>;
  /**
   * 提交时转化值，一般用于将值转化为提交的数据
   * 如果需要二次确认等操作，可以返回Promise
   */
  transform?: (values: T, matchParams: Params) => T | Promise<T>;
};

function CreateRecordSchemaForm<T = CommonRecord>({
  normalizeSubmitValues,
  transform,
  create,
  ...rest
}: CreateRecordSchemaFormProps<T>) {
  const matchParams = useParams();

  const transformFn = useMemo(() => transform || normalizeSubmitValues || ((v) => v), [
    normalizeSubmitValues,
    transform,
  ]);

  const onFinish = useCallback(
    async (values) => create(await transformFn(values, matchParams)),
    [matchParams, transformFn, create],
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
  normalizeSubmitValues: null,
  transform: null,
};

export default CreateRecordSchemaForm;
