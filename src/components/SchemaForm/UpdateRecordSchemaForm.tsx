import { EditOutlined } from '@ant-design/icons';
import { ParamsType } from '@ant-design/pro-provider';
import { ProTableProps } from '@ant-design/pro-table';
import { Button, Tooltip } from 'antd';
import { get } from 'lodash';
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
    /** @name 对提交给后台的数据做转换 */
    normalizeSubmitValues?: (
      values: T,
      matchParams: Params,
      record: T,
    ) => T | Promise<T>;
    /** @name 对提交给form的初始数据做转换 */
    normalizeInitialValues?: (record: T, matchParams: Params) => T;
  };

function UpdateRecordSchemaForm<T = CommonRecord>({
  normalizeInitialValues,
  normalizeSubmitValues,
  update,
  record,
  rowKey,
  ...rest
}: UpdateRecordSchemaFormProps<T>) {
  const matchParams = useParams();

  const onFinish = useCallback(
    async (values) =>
      update(
        await normalizeSubmitValues(values, matchParams, record),
        get(record, getRowKey(rowKey, record)),
      ),
    [update, normalizeSubmitValues, matchParams, record, rowKey],
  );

  const props = useMemo<RecordSchemaFormProps<T>>(() => ({
    trigger: (
      <Tooltip title="编辑">
        <Button icon={<EditOutlined />} shape="circle" type="primary" />
      </Tooltip>
    ),
    layoutType: 'ModalForm',
    initialValues: normalizeInitialValues(record, matchParams),
    onFinish,
    record,
    ...rest,
  }), [matchParams, normalizeInitialValues, onFinish, record, rest]);

  return (
    <RecordSchemaForm
      {...props}
    />
  );
}

UpdateRecordSchemaForm.defaultProps = {
  normalizeSubmitValues: (v) => v,
  normalizeInitialValues: (v) => v,
};

export default UpdateRecordSchemaForm;
