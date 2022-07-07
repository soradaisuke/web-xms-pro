import { ProColumns } from '@ant-design/pro-table';
import { get } from 'lodash';
import React from 'react';
import { Params } from 'react-router-dom';
import UpdateRecordSchemaForm from '../components/SchemaForm/UpdateRecordSchemaForm';
// eslint-disable-next-line import/no-cycle
import { TableProps } from '../components/Table';
import {
  TableDeleteRequest,
  TableUpdateRequest,
} from '../hooks/useTableCRUDRequests';
import { User } from '../types/common';
import { XMSTableColumns } from '../types/table';
import getRowKey from './getRowKey';
import makeDefaultDeleteButtonRender from './makeDefaultDeleteButtonRender';
import makeDefaultOnlineOfflineButtonRender from './makeDefaultOnlineOfflineButtonRender';
import makeDefaultSwapButtonRender from './makeDefaultSwapButtonRender';

export default function makeMergedRender(
  rowKey: TableProps['rowKey'],
  render: XMSTableColumns['render'],
  update: TableUpdateRequest,
  del: TableDeleteRequest,
  user: User,
  matchParams: Params
): ProColumns['render'] {
  if (!render) {
    return null;
  }
  return (...args) => {
    const record = args[1];
    const key = get(record, getRowKey(rowKey, record));
    const defaultUpdate = (values) => update(values, key);
    const defaultDelete = () => del(key);
    const defaultUpdateButtonRender = (config) => (
      <UpdateRecordSchemaForm
        key="update"
        rowKey={rowKey}
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
