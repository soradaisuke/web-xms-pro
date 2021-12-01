import React, { useContext, useMemo } from 'react';
import ProDescriptions, {
  ProDescriptionsItemProps,
  ProDescriptionsProps,
} from '@ant-design/pro-descriptions';
import { useParams } from 'react-router-dom';
import { isFunction, map } from 'lodash';
import { ParamsType } from '@ant-design/pro-provider';
import { ServiceConfig, useRetrieveOneRequest } from '../hooks/useCRUDRequests';
import { CommonRecord, RouteParams } from '../types/common';
import { XMSDescriptionsColumns } from '../types/descriptions';
import { DescriptionsDeleteRequest, DescriptionsUpdateRequest, useDescriptionsDeleteRequest, useDescriptionsUpdateRequest } from '../hooks/useDescriptionCRUDRequests';
import UpdateRecordSchemaForm from './SchemaForm/UpdateRecordSchemaForm';
import makeLinkRender from '../utils/makeLinkRender';
import makeDefaultOnlineOfflineButtonRender from '../utils/makeDefaultOnlineOfflineButtonRender';
import makeDefaultDeleteButtonRender from '../utils/makeDefaultDeleteButtonRender';
import UserContext from '../contexts/UserContext';
import makeDefaultSwapButtonRender from '../utils/makeDefaultSwapButtonRender';

export type DescriptionsProps<T = CommonRecord, U = ParamsType> = Omit<
  ProDescriptionsProps<T, U>,
  'columns'
> & {
  /** @name 数据请求配置 */
  requestConfig?: ServiceConfig | ((matchParams: RouteParams) => ServiceConfig);
  /** @name columns配置 */
  columns: XMSDescriptionsColumns[];
};

function makeMergedRender(
  render: XMSDescriptionsColumns['render'],
  update: DescriptionsUpdateRequest,
  del: DescriptionsDeleteRequest,
  requestConfig: ServiceConfig,
  user: CommonRecord
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
  const { user } = useContext(UserContext);

  const ser = useMemo(
    () =>
      isFunction(requestConfig) ? requestConfig(matchParams) : requestConfig,
    [matchParams, requestConfig]
  );

  const retrieve = useRetrieveOneRequest(ser);
  const update = useDescriptionsUpdateRequest(ser);
  const del = useDescriptionsDeleteRequest(ser);

  const newColumns = useMemo(
    () =>
      map(columns, (col) => {
        const { link, render, valueType } = col;
        const newCol = {
          ...col,
          render: makeMergedRender(render, update, del, ser, user),
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
    [columns, del, ser, update, user]
  );

  return (
    <ProDescriptions
      style={{
        padding: '20px',
        background: 'white',
      }}
      request={retrieve.run}
      {...props}
      columns={newColumns}
    />
  );
}

export default Descriptions;
