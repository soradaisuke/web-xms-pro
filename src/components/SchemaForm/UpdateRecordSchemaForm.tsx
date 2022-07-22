import { EditOutlined } from '@ant-design/icons';
import { ParamsType } from '@ant-design/pro-provider';
import { ProTableProps } from '@ant-design/pro-table';
import { Button, Tooltip } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { Params, useParams } from 'react-router-dom';
import { DescriptionsUpdateRequest } from '../../hooks/useDescriptionCRUDRequests';
import { TableUpdateRequest } from '../../hooks/useTableCRUDRequests';
import { CommonRecord } from '../../types/common';
import getRowKey from '../../utils/getRowKey';
import RecordSchemaForm, { RecordSchemaFormProps } from './RecordSchemaForm';

export type UpdateRecordSchemaFormProps<
  T = CommonRecord,
  U = ParamsType,
> =
  & RecordSchemaFormProps<T>
  & Required<Pick<ProTableProps<T, U>, 'rowKey'>>
  & {
    /** @name 传给该form所编辑的原始数据 */
    record: T;
    update: TableUpdateRequest | DescriptionsUpdateRequest;
    /**
     * @deprecated 使用transform
     */
    normalizeSubmitValues?: (
      values: T,
      matchParams: Params,
      record: T,
    ) => T | Promise<T>;
    /**
     * 提交时转化值，一般用于将值转化为提交的数据
     * 如果需要二次确认等操作，可以返回Promise
     */
    transform?: (
      values: T,
      matchParams: Params,
      record: T,
    ) => T | Promise<T>;
    /**
     * @deprecated 使用convertValues
     */
    normalizeInitialValues?: (record: T, matchParams: Params) => T;
    /**
     * 获取时转化值，一般用于将数据格式化为组件接收的格式
     */
    convertValues?: (record: T, matchParams: Params) => T;
  };

function UpdateRecordSchemaForm<T = CommonRecord>({
  normalizeInitialValues,
  normalizeSubmitValues,
  transform,
  convertValues,
  update,
  record,
  rowKey,
  ...rest
}: UpdateRecordSchemaFormProps<T>) {
  const matchParams = useParams();

  const convertValuesFn = useMemo(() => convertValues || normalizeInitialValues || ((v) => v), [
    convertValues,
    normalizeInitialValues,
  ]);
  const transformFn = useMemo(() => transform || normalizeSubmitValues || ((v) => v), [
    normalizeSubmitValues,
    transform,
  ]);

  const onFinish = useCallback(
    async (values) =>
      update(
        await transformFn(values, matchParams, record),
        getRowKey(rowKey, record),
      ),
    [update, transformFn, matchParams, record, rowKey],
  );

  const props = useMemo<RecordSchemaFormProps<T>>(() => ({
    trigger: (
      <Tooltip title="编辑">
        <Button icon={<EditOutlined />} shape="circle" type="primary" />
      </Tooltip>
    ),
    layoutType: 'ModalForm',
    initialValues: convertValuesFn(record, matchParams),
    onFinish,
    record,
    ...rest,
  }), [matchParams, convertValuesFn, onFinish, record, rest]);

  return (
    <RecordSchemaForm
      {...props}
    />
  );
}

UpdateRecordSchemaForm.defaultProps = {
  normalizeSubmitValues: null,
  normalizeInitialValues: null,
  transform: null,
  convertValues: null,
};

export default UpdateRecordSchemaForm;
