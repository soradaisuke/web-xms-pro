import React, { useCallback, useMemo, useRef, useState } from 'react';
import ProDescriptions, {
  ProDescriptionsItemProps,
  ProDescriptionsProps,
} from '@ant-design/pro-descriptions';
import { Params, useParams } from 'react-router-dom';
import { map } from 'lodash';
import { Button, Result } from 'antd';
import { ParamsType } from '@ant-design/pro-provider';
import { ProCoreActionType } from '@ant-design/pro-utils';
import { CommonRecord, User } from '../types/common';
import { XMSDescriptionsColumns } from '../types/descriptions';
import {
  DescriptionsDeleteRequest,
  DescriptionsRequestConfig,
  DescriptionsUpdateRequest,
  useDescriptionsRequests,
} from '../hooks/useDescriptionCRUDRequests';
import UpdateRecordSchemaForm from './SchemaForm/UpdateRecordSchemaForm';
import makeLinkRender from '../utils/makeLinkRender';
import makeDefaultOnlineOfflineButtonRender from '../utils/makeDefaultOnlineOfflineButtonRender';
import makeDefaultDeleteButtonRender from '../utils/makeDefaultDeleteButtonRender';
import makeDefaultSwapButtonRender from '../utils/makeDefaultSwapButtonRender';
import useUser from '../hooks/useUser';

export type DescriptionsProps<T = CommonRecord, U = ParamsType> = Omit<
  ProDescriptionsProps<T, U>,
  'columns'
> & {
  /** @name 数据请求配置 */
  requestConfig?: DescriptionsRequestConfig;
  /** @name columns配置 */
  columns: XMSDescriptionsColumns[];
};

function makeMergedRender(
  render: XMSDescriptionsColumns['render'],
  update: DescriptionsUpdateRequest,
  del: DescriptionsDeleteRequest,
  user: User,
  matchParams: Params
): ProDescriptionsItemProps['render'] {
  if (!render) {
    return null;
  }
  return (...args) => {
    const record = args[1];
    const defaultUpdate = update;
    const defaultDelete = del;
    const defaultUpdateButtonRender = (config) => (
      <UpdateRecordSchemaForm
        key="update"
        record={record}
        update={update}
        {...config}
      />
    );

    return render(
      {
        user,
        update: defaultUpdate,
        defaultUpdateButtonRender,
        defaultDeleteButtonRender: makeDefaultDeleteButtonRender(defaultDelete),
        defaultOnlineOfflineButtonRender: makeDefaultOnlineOfflineButtonRender(
          record,
          matchParams,
          defaultUpdate
        ),
        defaultSwapButtonRender: makeDefaultSwapButtonRender(
          defaultUpdateButtonRender
        ),
      },
      ...args
    );
  };
}

function Descriptions({ requestConfig, columns, ...rest }: DescriptionsProps) {
  const matchParams = useParams();
  const user = useUser();
  const actionRef = useRef<ProCoreActionType>();
  const [error, setError] = useState<Error>();

  const {
    update,
    delete: del,
    retrieve,
  } = useDescriptionsRequests(requestConfig, matchParams, user, actionRef);

  const newColumns = useMemo<ProDescriptionsProps['columns']>(
    () =>
      map(columns, (col) => {
        const { link, render, valueType } = col;
        const newCol = {
          ...col,
          render: makeMergedRender(render, update, del, user, matchParams),
        };
        if (link && !render) {
          newCol.render = makeLinkRender(link);
        }
        if (valueType === 'image') {
          newCol.valueType = {
            type: 'image',
            width: 100,
          };
        }
        return newCol;
      }) as ProDescriptionsProps['columns'],
    [columns, del, matchParams, update, user]
  );

  const onRequestError = useCallback<ProDescriptionsProps['onRequestError']>(
    (e) => setError(e),
    []
  );

  if (error) {
    return (
      <Result
        status="error"
        title={error.message}
        extra={[
          <Button
            type="primary"
            key="retry"
            onClick={() => actionRef.current?.reload()}
          >
            重试
          </Button>,
        ]}
      />
    );
  }

  return (
    <ProDescriptions
      request={retrieve}
      {...rest}
      actionRef={actionRef}
      columns={newColumns}
      onRequestError={onRequestError}
    />
  );
}

Descriptions.defaultProps = {
  requestConfig: null,
};

export default Descriptions;
