import React, { useMemo, useRef } from 'react';
import ProTable, {
  ActionType,
  ProColumns,
  ProTableProps,
} from '@ant-design/pro-table';
import { ToolBarProps } from '@ant-design/pro-table/lib/components/ToolBar';
import {
  find,
  get,
  isBoolean,
  isFunction,
  map,
  toNumber,
  mapValues,
} from 'lodash';
import { useParams } from 'react-router-dom';
import { FormInstance } from 'antd';
import { ProFormInstance } from '@ant-design/pro-form';
import { ParamsType } from '@ant-design/pro-provider';
import CreateRecordSchemaForm from './SchemaForm/CreateRecordSchemaForm';
import { CommonRecord, RouteParams, User } from '../types/common';
import { TableCreateButtonRender, XMSTableColumns } from '../types/table';
import UpdateRecordSchemaForm from './SchemaForm/UpdateRecordSchemaForm';
import {
  TableCreateRequest,
  TableDeleteRequest,
  TableRequestConfig,
  TableUpdateRequest,
  useTableRequests,
} from '../hooks/useTableCRUDRequests';
import getRowKey from '../utils/getRowKey';
import makeLinkRender from '../utils/makeLinkRender';
import makeDefaultOnlineOfflineButtonRender from '../utils/makeDefaultOnlineOfflineButtonRender';
import makeDefaultDeleteButtonRender from '../utils/makeDefaultDeleteButtonRender';
import makeDefaultSwapButtonRender from '../utils/makeDefaultSwapButtonRender';
import useUser from '../hooks/useUser';
import isNumeric from '../utils/isNumeric';

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

function useMergedToolBarRender<T = CommonRecord, U = ParamsType>(
  toolBarRender: TableProps<T, U>['toolBarRender'],
  create: TableCreateRequest,
  form: FormInstance,
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

function makeMergedRender(
  rowKey: TableProps['rowKey'],
  render: XMSTableColumns['render'],
  update: TableUpdateRequest,
  del: TableDeleteRequest,
  user: User,
  matchParams: RouteParams
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

function defaultSyncToUrl(values, type) {
  if (type === 'get') {
    return mapValues(values, (v) => {
      if (v === 'true') {
        return true;
      }
      if (v === 'false') {
        return false;
      }
      if (isNumeric(v)) {
        return toNumber(v);
      }
      return v;
    });
  }
  return values;
}

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
