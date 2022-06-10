import { ParamsType } from '@ant-design/pro-provider';
import { ProFormInstance } from '@ant-design/pro-form';
import { ProTableProps } from '@ant-design/pro-table';
import React, { useMemo } from 'react';
// eslint-disable-next-line import/no-cycle
import { TableProps } from '../components/Table';
import { CommonRecord, RouteParams, User } from '../types';
import { TableCreateRequest } from './useTableCRUDRequests';
import CreateRecordSchemaForm from '../components/SchemaForm/CreateRecordSchemaForm';

export default function useMergedToolBarRender<
  T = CommonRecord,
  U = ParamsType
>(
  toolBarRender: TableProps<T, U>['toolBarRender'],
  create: TableCreateRequest,
  form: ProFormInstance,
  matchParams: RouteParams,
  user: User
): ProTableProps<T, U>['toolBarRender'] {
  return useMemo<ProTableProps<T, U>['toolBarRender']>(
    () =>
      toolBarRender
        ? (...args) =>
            toolBarRender(
              {
                defaultCreateButtonRender: (config) => (
                  <CreateRecordSchemaForm
                    key="create"
                    create={create}
                    {...config}
                  />
                ),
                form,
                matchParams,
                user,
              },
              ...args
            )
        : null,
    [toolBarRender, form, matchParams, user, create]
  );
}
