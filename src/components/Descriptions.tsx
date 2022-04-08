import React, { useMemo } from 'react';
import ProDescriptions, {
  ProDescriptionsItemProps,
  ProDescriptionsProps,
} from '@ant-design/pro-descriptions';
import { useParams } from 'react-router-dom';
import { isFunction, map } from 'lodash';
import { ParamsType } from '@ant-design/pro-provider';
import { DeleteServiceConfig, RequestConfig } from '../hooks/useCRUDRequests';
import { CommonRecord, RouteParams, User } from '../types/common';
import { XMSDescriptionsColumns } from '../types/descriptions';
import {
  DescriptionsDeleteRequest,
  DescriptionsRetrieveServiceConfig,
  DescriptionsUpdateRequest,
  useDescriptionsDeleteRequest,
  useDescriptionsRetrieveRequest,
  useDescriptionsUpdateRequest,
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
  requestConfig: RequestConfig<DescriptionsRetrieveServiceConfig>;
  /** @name columns配置 */
  columns: XMSDescriptionsColumns[];
};

function makeMergedRender(
  render: XMSDescriptionsColumns['render'],
  update: DescriptionsUpdateRequest,
  del: DescriptionsDeleteRequest,
  requestConfig: DescriptionsRetrieveServiceConfig,
  user: User,
  matchParams: RouteParams
): ProDescriptionsItemProps['render'] {
  if (!render) {
    return null;
  }
  return (...args) => {
    const record = args[1];
    const action = args[3];
    const defaultUpdate = (values) => update(values, action);
    const defaultDelete = del;
    const defaultUpdateButtonRender = (config) => (
      <UpdateRecordSchemaForm
        key="update"
        record={record}
        containerAction={action}
        requestConfig={requestConfig}
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

  const service = useMemo(
    () =>
      isFunction(requestConfig)
        ? requestConfig(matchParams, user)
        : requestConfig ?? '',
    [matchParams, requestConfig, user]
  );

  const retrieve = useDescriptionsRetrieveRequest(service);
  const update = useDescriptionsUpdateRequest(service);
  const del = useDescriptionsDeleteRequest(service as DeleteServiceConfig);

  const newColumns = useMemo<ProDescriptionsProps['columns']>(
    () =>
      map(columns, (col) => {
        const { link, render, valueType } = col;
        const newCol = {
          ...col,
          render: makeMergedRender(
            render,
            update,
            del,
            service,
            user,
            matchParams
          ),
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
    [columns, del, matchParams, service, update, user]
  );

  return (
    <ProDescriptions
      style={{
        padding: '20px',
        background: 'white',
      }}
      request={retrieve}
      {...rest}
      columns={newColumns}
    />
  );
}

export default Descriptions;
