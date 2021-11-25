import React, { useCallback, useMemo } from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { get, isFunction } from 'lodash';
import { ParamsType } from '@ant-design/pro-provider';
import { ActionType, ProTableProps } from '@ant-design/pro-table';
import RecordSchemaForm, { RecordSchemaFormProps } from './RecordSchemaForm';
import { useTableUpdateRequest } from '../../hooks/useTableCRUDRequests';
import { CommonRecord, RouteParams } from '../../types/common';
import { ServiceConfig, UpdateService } from '../../hooks/useCRUDRequests';
import getRowKey from '../../utils/getRowKey';

export type TableUpdateFormProps<
  T = CommonRecord,
  U = ParamsType
> = RecordSchemaFormProps<T> &
  Required<Pick<ProTableProps<T, U>, 'rowKey'>> & {
    /** @name 传给该form所编辑的原始数据 */
    record: T;
    /** @name ProTable的action实例 */
    tableAction: ActionType;
    update?: (
      matchParams: RouteParams,
      record: T,
      ...base: Parameters<UpdateService>
    ) => ReturnType<UpdateService>;
    requestConfig?:
      | ServiceConfig
      | ((matchParams: RouteParams) => ServiceConfig);
    /** @name 对提交给后台的数据做转换 */
    normalizeSubmitValues?: (
      values: T,
      matchParams: RouteParams,
      record: T
    ) => T | Promise<T>;
    /** @name 对提交给form的初始数据做转换 */
    normalizeInitialValues?: (record: T, matchParams: RouteParams) => T;
  };

const TableUpdateForm: React.FC<TableUpdateFormProps> = function(props) {
  const {
    normalizeInitialValues = (v) => v,
    normalizeSubmitValues = (v) => v,
    update,
    requestConfig,
    tableAction,
    record,
    rowKey,
    ...otherProps
  } = props;

  const matchParams = useParams();

  const service = useMemo(() => {
    if (update) {
      return (...args: Parameters<UpdateService>) =>
        update(matchParams, record, ...args);
    }
    return isFunction(requestConfig) ? service(matchParams) : requestConfig;
  }, [matchParams, record, requestConfig, update]);

  const req = useTableUpdateRequest(service, tableAction);

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
      trigger={
        <Button
          style={{ marginRight: 10 }}
          icon={<EditOutlined />}
          shape="circle"
          type="primary"
        />
      }
      layoutType="ModalForm"
      initialValues={normalizeInitialValues(record, matchParams)}
      onFinish={onFinish}
      record={record}
      {...otherProps}
    />
  );
}

export default TableUpdateForm;
