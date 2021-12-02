import React, { useCallback, useContext, useMemo, useRef } from 'react';
import ProTable, { ProColumns, ProTableProps } from '@ant-design/pro-table';
import { ToolBarProps } from '@ant-design/pro-table/lib/components/ToolBar';
import { find, forEach, get, isBoolean, isFunction, isMap, isNumber, keys, map, toNumber } from 'lodash';
import { useParams } from 'react-router-dom';
import { FormInstance } from 'antd';
import { ProFormInstance } from '@ant-design/pro-form';
import { ParamsType } from '@ant-design/pro-provider';
import CreateRecordSchemaForm from './SchemaForm/CreateRecordSchemaForm';
import { CommonRecord, RouteParams, User } from '../types/common';
import { TableCreateButtonRender, XMSTableColumns } from '../types/table';
import { RequestConfig, ServiceConfig, useRetrieveRequest } from '../hooks/useCRUDRequests';
import UpdateRecordSchemaForm from './SchemaForm/UpdateRecordSchemaForm';
import {
  TableDeleteRequest,
  TableUpdateRequest,
  useTableDeleteRequest,
  useTableUpdateRequest,
} from '../hooks/useTableCRUDRequests';
import getRowKey from '../utils/getRowKey';
import makeLinkRender from '../utils/makeLinkRender';
import makeDefaultOnlineOfflineButtonRender from '../utils/makeDefaultOnlineOfflineButtonRender';
import makeDefaultDeleteButtonRender from '../utils/makeDefaultDeleteButtonRender';
import UserContext from '../contexts/UserContext';
import makeDefaultSwapButtonRender from '../utils/makeDefaultSwapButtonRender';

export type TableProps<T = CommonRecord, U = ParamsType> = Omit<
  ProTableProps<T, U>,
  'columns' | 'toolBarRender' | 'params'
> &
  Required<Pick<ProTableProps<T, U>, 'rowKey'>> & {
    /** @name 数据请求配置 */
    requestConfig?: RequestConfig;
    /** @name columns配置 */
    columns: XMSTableColumns[];
    params?: U | ((matchParams: RouteParams) => U);
    toolBarRender?:
      | Extract<ProTableProps<T, U>['toolBarRender'], boolean>
      | ((
          config: {
            defaultCreateButtonRender: TableCreateButtonRender;
            form: FormInstance;
            params: RouteParams;
          },
          ...base: Parameters<ToolBarProps<T>['toolBarRender']>
        ) => ReturnType<ToolBarProps<T>['toolBarRender']>);
  };

function useMergedToolBarRender<T = CommonRecord, U = ParamsType>(
  toolBarRender: TableProps<T, U>['toolBarRender'],
  requestConfig: ServiceConfig,
  form: FormInstance,
  params: RouteParams
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
                    requestConfig={requestConfig}
                    containerAction={args[0]}
                    {...config}
                  />
                ),
                form,
                params,
              },
              ...args
            )
        : null,
    [toolBarRender, form, params, requestConfig]
  );
}

function makeMergedRender(
  rowKey: TableProps['rowKey'],
  render: XMSTableColumns['render'],
  update: TableUpdateRequest,
  del: TableDeleteRequest,
  requestConfig: ServiceConfig,
  user: User
): ProColumns['render'] {
  if (!render) {
    return null;
  }
  return (...args) => {
    const record = args[1];
    const action = args[3];
    const key = get(record, getRowKey(rowKey, record));
    const defaultUpdate = (values) => update(values, key, action);
    const defaultDelete = () => del(key, action);
    const defaultUpdateButtonRender = (config) => (
      <UpdateRecordSchemaForm
        key="update"
        rowKey={rowKey}
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

const Table: React.FC<TableProps> = function(props) {
  const {
    rowKey,
    requestConfig,
    columns,
    toolBarRender,
    search,
    params,
    form,
  } = props;
  const matchParams = useParams();
  const { user } = useContext(UserContext);
  const formRef = useRef<ProFormInstance>();

  const ser = useMemo(
    () =>
      isFunction(requestConfig) ? requestConfig(matchParams, user) : requestConfig,
    [matchParams, requestConfig, user]
  );

  const retrieve = useRetrieveRequest(ser);

  const update = useTableUpdateRequest(ser);

  const del = useTableDeleteRequest(ser);

  const newColumns = useMemo(
    () =>
      map(columns, (col) => {
        const { link, render, valueType, defaultSortOrder, sortDirections } =
          col;
        const newCol = {
          ...col,
          render: makeMergedRender(rowKey, render, update, del, ser, user),
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
      }),
    [columns, del, rowKey, ser, update, user]
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

  const defaultSyncToUrl = useCallback((values, type) => {
    if (type === 'get') {
      const newValues = { ...values };
      forEach(keys(newValues), key => {
        const column = find(newColumns, c => c.dataIndex === key);
        if (isMap(column?.valueEnum) && isNumber(column.valueEnum.keys().next().value)) {
          newValues[key] = toNumber(newValues[key]);
        }
      })
      return newValues;
    }
    return values;
  }, [newColumns]);

  const newForm = useMemo<TableProps['form']>(
    () => ({
      syncToInitialValues: false,
      ...(form || {}),
      syncToUrl: (values, type) => {
        if (isFunction(form?.syncToUrl)) {
          return form.syncToUrl(defaultSyncToUrl(values, type), type)
        }
        return defaultSyncToUrl(values, type);
      },
    }),
    [defaultSyncToUrl, form]
  );

  const mergedToolBarRender = useMergedToolBarRender(
    toolBarRender,
    ser,
    formRef.current,
    matchParams
  );

  return (
    <ProTable
      request={retrieve.run}
      {...props}
      form={newForm}
      formRef={formRef}
      search={newSearch}
      params={isFunction(params) ? params(matchParams) : params}
      toolBarRender={mergedToolBarRender}
      columns={newColumns}
    />
  );
}

export default Table;
