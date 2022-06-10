import React, { useMemo, useRef } from 'react';
import ProTable, { ActionType, ProTableProps } from '@ant-design/pro-table';
import { ToolBarProps } from '@ant-design/pro-table/lib/components/ToolBar';
import { find, get, isBoolean, isFunction, map } from 'lodash';
import { useParams } from 'react-router-dom';
import { FormInstance } from 'antd';
import { ProFormInstance } from '@ant-design/pro-form';
import { ParamsType } from '@ant-design/pro-provider';
import { CommonRecord, RouteParams, User } from '../types/common';
import { TableCreateButtonRender, XMSTableColumns } from '../types/table';
import {
  TableRequestConfig,
  useTableRequests,
} from '../hooks/useTableCRUDRequests';
import makeLinkRender from '../utils/makeLinkRender';
import useUser from '../hooks/useUser';
import defaultSyncToUrl from '../utils/defaultSyncToUrl';
// eslint-disable-next-line import/no-cycle
import makeMergedRender from '../utils/makeMergedRender';
// eslint-disable-next-line import/no-cycle
import useMergedToolBarRender from '../hooks/useMergedToolBarRender';

export type TableProps<T = CommonRecord, U = ParamsType> = Omit<
  ProTableProps<T, U>,
  'columns' | 'toolBarRender' | 'params'
> &
  Required<Pick<ProTableProps<T, U>, 'rowKey'>> & {
    /** @name 数据请求配置 */
    requestConfig?: TableRequestConfig;
    /** @name columns配置 */
    columns: XMSTableColumns[];
    params?: U | ((matchParams: RouteParams) => U);
    toolBarRender?:
      | Extract<ProTableProps<T, U>['toolBarRender'], boolean>
      | ((
          config: {
            defaultCreateButtonRender: TableCreateButtonRender;
            form: FormInstance;
            matchParams: RouteParams;
            user: User;
          },
          ...base: Parameters<ToolBarProps<T>['toolBarRender']>
        ) => ReturnType<ToolBarProps<T>['toolBarRender']>);
  };

function Table<T = CommonRecord, U = ParamsType>({
  rowKey,
  requestConfig,
  columns,
  toolBarRender,
  search,
  params,
  form,
  ...rest
}: TableProps<T, U>) {
  const matchParams = useParams();
  const user = useUser();
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();

  const {
    create,
    update,
    delete: del,
    retrieve,
  } = useTableRequests(requestConfig, matchParams, user, actionRef);

  const newColumns = useMemo<ProTableProps<T, U>['columns']>(
    () =>
      map(columns, (col) => {
        const { link, render, valueType, defaultSortOrder, sortDirections } =
          col;
        const newCol = {
          ...col,
          render: makeMergedRender(
            rowKey,
            render,
            update,
            del,
            user,
            matchParams
          ),
        };
        if (link && !render) {
          newCol.render = makeLinkRender(link);
        }
        if (
          valueType === 'image' ||
          get(col, ['valueType', 'type']) === 'image'
        ) {
          newCol.hideInSearch = true;
        }
        if (valueType === 'image') {
          newCol.valueType = {
            type: 'image',
            width: 100,
          };
        }
        if (sortDirections || defaultSortOrder) {
          newCol.sorter = true;
        }
        return newCol;
      }) as ProTableProps<T, U>['columns'],
    [columns, del, matchParams, rowKey, update, user]
  );

  const newSearch = useMemo<TableProps['search']>(() => {
    if (isBoolean(search)) {
      return search;
    }
    if (
      !find(
        newColumns,
        (c) =>
          (c.hideInSearch === false || c.hideInSearch === undefined) &&
          c.valueType !== 'option'
      )
    ) {
      return false;
    }
    return {
      defaultCollapsed: false,
      labelWidth: 'auto',
      ...(search || {}),
    };
  }, [newColumns, search]);

  const newForm = useMemo<TableProps['form']>(
    () => ({
      syncToInitialValues: false,
      ...(form || {}),
      syncToUrl: (values, type) => {
        if (isFunction(form?.syncToUrl)) {
          return form.syncToUrl(defaultSyncToUrl(values, type), type);
        }
        return defaultSyncToUrl(values, type);
      },
    }),
    [form]
  );

  const mergedToolBarRender = useMergedToolBarRender(
    toolBarRender,
    create,
    formRef.current,
    matchParams,
    user
  );

  return (
    <ProTable
      request={retrieve}
      {...rest}
      rowKey={rowKey}
      form={newForm}
      formRef={formRef}
      search={newSearch}
      params={isFunction(params) ? params(matchParams) : params}
      toolBarRender={mergedToolBarRender}
      columns={newColumns}
      actionRef={actionRef}
    />
  );
}

Table.defaultProps = {
  params: null,
  toolBarRender: null,
  requestConfig: null,
};

export default Table;
