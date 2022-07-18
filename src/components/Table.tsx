import { ProFormInstance } from '@ant-design/pro-form';
import { ParamsType } from '@ant-design/pro-provider';
import ProTable, { ActionType, ProTableProps } from '@ant-design/pro-table';
import { ToolBarProps } from '@ant-design/pro-table/lib/components/ToolBar';
import { FormInstance } from 'antd';
import { find, isBoolean, isFunction, map } from 'lodash';
import React, { useImperativeHandle, useMemo, useRef } from 'react';
import { Params, useParams } from 'react-router-dom';
import { TableRequestConfig, useTableRequests } from '../hooks/useTableCRUDRequests';
import useUser from '../hooks/useUser';
import { CommonRecord, User } from '../types/common';
import { TableCreateButtonRender, XMSTableColumns } from '../types/table';
import defaultSyncToUrl from '../utils/defaultSyncToUrl';
import makeMergedRender from '../utils/makeMergedRender';
import useMergedToolBarRender from '../hooks/useMergedToolBarRender';
import './Table.less';
import { transformTableColumn } from '../utils/transformColumn';
import XmsProProvider from './XmsProProvider';

export type TableProps<T = CommonRecord, U = ParamsType> =
  & Omit<
    ProTableProps<T, U>,
    'columns' | 'toolBarRender' | 'params'
  >
  & Required<Pick<ProTableProps<T, U>, 'rowKey'>>
  & {
    /** @name 数据请求配置 */
    requestConfig?: TableRequestConfig;
    /** @name columns配置 */
    columns: XMSTableColumns[];
    params?: U | ((matchParams: Params) => U);
    toolBarRender?:
      | Extract<ProTableProps<T, U>['toolBarRender'], boolean>
      | ((
        config: {
          defaultCreateButtonRender: TableCreateButtonRender;
          form: FormInstance;
          matchParams: Params;
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
  formRef: propsFormRef,
  actionRef: propsActionRef,
  ...rest
}: TableProps<T, U>) {
  const matchParams = useParams();
  const user = useUser();
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();

  useImperativeHandle(propsFormRef, () => formRef.current);
  useImperativeHandle(propsActionRef, () => actionRef.current);

  const {
    create,
    update,
    delete: del,
    retrieve,
  } = useTableRequests(requestConfig, matchParams, user, actionRef);

  const newColumns = useMemo<ProTableProps<T, U>['columns']>(
    () =>
      map(columns, (col) => {
        const { render } = col;
        return transformTableColumn(
          col,
          makeMergedRender(
            rowKey,
            render,
            update,
            del,
            user,
            matchParams,
          ),
        );
      }) as ProTableProps<T, U>['columns'],
    [columns, del, matchParams, rowKey, update, user],
  );

  const newSearch = useMemo<TableProps['search']>(() => {
    if (isBoolean(search)) {
      return search;
    }
    if (
      !find(
        newColumns,
        (c) =>
          (c.hideInSearch === false || c.hideInSearch === undefined)
          && c.valueType !== 'option',
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
    [form],
  );

  const mergedToolBarRender = useMergedToolBarRender(
    toolBarRender,
    create,
    formRef.current,
    matchParams,
    user,
  );

  return (
    <XmsProProvider>
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
    </XmsProProvider>
  );
}

Table.defaultProps = {
  params: null,
  toolBarRender: null,
  requestConfig: null,
};

export default Table;
