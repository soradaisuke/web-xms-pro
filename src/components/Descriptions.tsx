import React, { useContext, useMemo, useRef } from 'react';
import ProDescriptions, {
  ProDescriptionsItemProps,
  ProDescriptionsProps,
} from '@ant-design/pro-descriptions';
import { useParams } from 'react-router-dom';
import { isFunction, map } from 'lodash';
import { ParamsType } from '@ant-design/pro-provider';
import { RequestConfig, ServiceConfig, useRetrieveOneRequest } from '../hooks/useCRUDRequests';
import { CommonRecord, User } from '../types/common';
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
  'columns' | 'editable'
> & {
  /** @name 数据请求配置 */
  requestConfig?: RequestConfig<CommonRecord>;
  /** @name columns配置 */
  columns: XMSDescriptionsColumns[];
  editable?: ProDescriptionsProps<T, U>['editable'] & {
    requestConfig?: RequestConfig<CommonRecord>;
  }
};

function makeMergedRender(
  render: XMSDescriptionsColumns['render'],
  update: DescriptionsUpdateRequest,
  del: DescriptionsDeleteRequest,
  requestConfig: ServiceConfig,
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
  const { requestConfig, columns, editable } = props;

  const matchParams = useParams();
  const actionRef: DescriptionsProps['actionRef'] = useRef();
  const { user } = useContext(UserContext);

  const service = useMemo(
    () =>
      isFunction(requestConfig) ? requestConfig(matchParams, user) : requestConfig,
    [matchParams, requestConfig, user]
  );

  const editableService = useMemo(
    () => {
      if (editable.requestConfig) {
        return isFunction(requestConfig) ? requestConfig(matchParams, user) : requestConfig;
      }
      return service;
    },
    [editable.requestConfig, matchParams, requestConfig, service, user]
  );

  const retrieve = useRetrieveOneRequest(service);
  const update = useDescriptionsUpdateRequest(service);
  const del = useDescriptionsDeleteRequest(service);
  const editableUpdate = useDescriptionsUpdateRequest(editableService);

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

  const newEditable = useMemo(() => {
    if (editable) {
      return {
        onSave: (dataIndex, row) => editableUpdate({ [dataIndex]: row[dataIndex] }).then(() => actionRef.current.reload()),
        ...editable,
      };
    }
    return null;
  }, [editable, editableUpdate]);

  return (
    <ProDescriptions
      style={{
        padding: '20px',
        background: 'white',
      }}
      request={retrieve.run}
      {...props}
      actionRef={actionRef}
      columns={newColumns}
      editable={newEditable}
    />
  );
}

export default Descriptions;
