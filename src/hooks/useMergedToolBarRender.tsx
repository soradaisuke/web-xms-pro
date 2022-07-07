import { ParamsType } from '@ant-design/pro-provider';
import { ProFormInstance } from '@ant-design/pro-form';
import { ProTableProps } from '@ant-design/pro-table';
import React, { useMemo } from 'react';
import { Params } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import { TableProps } from 'components/Table';
import { CommonRecord, User } from 'types/common';
import CreateRecordSchemaForm from 'components/SchemaForm/CreateRecordSchemaForm';
import { TableCreateRequest } from './useTableCRUDRequests';

export default function useMergedToolBarRender<
  T = CommonRecord,
  U = ParamsType
>(
  toolBarRender: TableProps<T, U>['toolBarRender'],
  create: TableCreateRequest,
  form: ProFormInstance,
  matchParams: Params,
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
