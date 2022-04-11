import React, { useCallback, useMemo } from 'react';
import { Button, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { get, isFunction } from 'lodash';
import { ParamsType } from '@ant-design/pro-provider';
import { ActionType, ProTableProps } from '@ant-design/pro-table';
import RecordSchemaForm, { RecordSchemaFormProps } from './RecordSchemaForm';
import { useTableUpdateRequest } from '../../hooks/useTableCRUDRequests';
import { CommonRecord, RouteParams } from '../../types/common';
import {
  RequestConfig,
  UpdateServiceConfig,
} from '../../hooks/useCRUDRequests';
import getRowKey from '../../utils/getRowKey';
import useUser from '../../hooks/useUser';

export type UpdateRecordSchemaFormProps<
  T = CommonRecord,
  U = ParamsType
> = RecordSchemaFormProps<T> &
  Required<Pick<ProTableProps<T, U>, 'rowKey'>> & {
    /** @name 传给该form所编辑的原始数据 */
    record: T;
    /** @name ProTable或ProDescriptions的action实例 */
    containerAction: ActionType;
    requestConfig?: RequestConfig<UpdateServiceConfig>;
    /** @name 对提交给后台的数据做转换 */
    normalizeSubmitValues?: (
      values: T,
      matchParams: RouteParams,
      record: T
    ) => T | Promise<T>;
    /** @name 对提交给form的初始数据做转换 */
    normalizeInitialValues?: (record: T, matchParams: RouteParams) => T;
  };

function UpdateRecordSchemaForm({
  normalizeInitialValues,
  normalizeSubmitValues,
  requestConfig,
  containerAction,
  record,
  rowKey,
  ...rest
}: UpdateRecordSchemaFormProps) {
  const matchParams = useParams();
  const user = useUser();

  const service = useMemo(
    () =>
      isFunction(requestConfig)
        ? requestConfig(matchParams, user)
        : requestConfig,
    [matchParams, requestConfig, user]
  );

  const req = useTableUpdateRequest(service, containerAction);

  const onFinish = useCallback(
    async (values) =>
      req(
        await normalizeSubmitValues(values, matchParams, record),
        get(record, getRowKey(rowKey, record))
      ),
    [req, normalizeSubmitValues, matchParams, record, rowKey]
  );

  return (
    <RecordSchemaForm
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      trigger={
        <Tooltip title="编辑">
          <Button icon={<EditOutlined />} shape="circle" type="primary" />
        </Tooltip>
      }
      layoutType="ModalForm"
      initialValues={normalizeInitialValues(record, matchParams)}
      onFinish={onFinish}
      record={record}
      {...rest}
    />
  );
}

UpdateRecordSchemaForm.defaultProps = {
  normalizeSubmitValues: (v) => v,
  normalizeInitialValues: (v) => v,
  requestConfig: null,
};

export default UpdateRecordSchemaForm;
