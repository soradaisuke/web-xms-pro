import React, { useCallback, useMemo } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { ActionType } from '@ant-design/pro-table';
import { isFunction } from 'lodash';
import RecordSchemaForm, { RecordSchemaFormProps } from './RecordSchemaForm';
import { useTableCreateRequest } from '../../hooks/useTableCRUDRequests';
import { CommonRecord, RouteParams } from '../../types/common';
import { CreateService, ServiceConfig } from '../../hooks/useCRUDRequests';

export type CreateRecordSchemaFormProps<T = CommonRecord> =
  RecordSchemaFormProps<T> & {
    /** @name ProTable或ProDescriptions的action实例 */
    containerAction: ActionType;
    create?: (
      matchParams: RouteParams,
      ...base: Parameters<CreateService>
    ) => ReturnType<CreateService>;
    requestConfig?:
      | ServiceConfig
      | ((matchParams: RouteParams) => ServiceConfig);
    normalizeSubmitValues?: (
      values: T,
      matchParams: RouteParams
    ) => T | Promise<T>;
  };

const CreateRecordSchemaForm: React.FC<CreateRecordSchemaFormProps> = function(props) {
  const {
    normalizeSubmitValues = (v) => v,
    create,
    requestConfig,
    containerAction,
    ...otherProps
  } = props;

  const matchParams = useParams();

  const service = useMemo(() => {
    if (create) {
      return (...args: Parameters<CreateService>) =>
        create(matchParams, ...args);
    }
    return isFunction(requestConfig) ? requestConfig(matchParams) : requestConfig;
  }, [create, matchParams, requestConfig]);

  const req = useTableCreateRequest(service, containerAction);

  const onFinish = useCallback(
    async (values) => req(await normalizeSubmitValues(values, matchParams)),
    [matchParams, normalizeSubmitValues, req]
  );

  return (
    <RecordSchemaForm
      trigger={
        <Button icon={<PlusOutlined />} type="primary">
          新建
        </Button>
      }
      layoutType="ModalForm"
      onFinish={onFinish}
      {...otherProps}
    />
  );
}

export default CreateRecordSchemaForm;
