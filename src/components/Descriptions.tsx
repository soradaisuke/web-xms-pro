import React, { useMemo } from 'react';
import ProDescriptions, {
  ProDescriptionsItemProps,
  ProDescriptionsProps,
} from '@ant-design/pro-descriptions';
import { useParams } from 'react-router-dom';
import { isFunction, map } from 'lodash';
import { ParamsType } from '@ant-design/pro-provider';
import { DeleteServiceConfig, RequestConfig, RetrieveOneServiceConfig } from '../hooks/useCRUDRequests';
import { CommonRecord, User } from '../types/common';
import { XMSDescriptionsColumns } from '../types/descriptions';
import { DescriptionsDeleteRequest, DescriptionsUpdateRequest, useDescriptionsDeleteRequest, useDescriptionsRetrieveRequest, useDescriptionsUpdateRequest } from '../hooks/useDescriptionCRUDRequests';
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
  requestConfig?: RequestConfig<RetrieveOneServiceConfig>;
  /** @name columns配置 */
  columns: XMSDescriptionsColumns[];
};

function makeMergedRender(
  render: XMSDescriptionsColumns['render'],
  update: DescriptionsUpdateRequest,
  del: DescriptionsDeleteRequest,
  requestConfig: RetrieveOneServiceConfig,
  user: User
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
        defaultOnlineOfflineButtonRender: makeDefaultOnlineOfflineButtonRender(record, defaultUpdate),
        defaultSwapButtonRender: makeDefaultSwapButtonRender(defaultUpdateButtonRender),
      },
      ...args
    );
  };
}

const Descriptions: React.FC<DescriptionsProps> = function(props) {
  const { requestConfig, columns } = props;

  const matchParams = useParams();
  const user = useUser();

  const service = useMemo(
    () =>
      isFunction(requestConfig) ? requestConfig(matchParams, user) : (requestConfig ?? ''),
    [matchParams, requestConfig, user]
  );

  const retrieve = useDescriptionsRetrieveRequest(service);
  const update = useDescriptionsUpdateRequest(service);
  const del = useDescriptionsDeleteRequest(service as DeleteServiceConfig);

  const newColumns = useMemo(
    () =>
      map(columns, (col) => {
        const { link, render, valueType } = col;
        const newCol = {
          ...col,
          render: makeMergedRender(render, update, del, service, user),
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
      }),
    [columns, del, service, update, user]
  );

  return (
    <ProDescriptions
      style={{
        padding: '20px',
        background: 'white',
      }}
      request={retrieve}
      {...props}
      columns={newColumns}
    />
  );
}

export default Descriptions;
