import React, { useMemo, useRef } from 'react';
import ProTable, { ProColumns, ProTableProps } from '@ant-design/pro-table';
import { ToolBarProps } from '@ant-design/pro-table/lib/components/ToolBar';
import { find, get, isBoolean, isFunction, map, startsWith } from 'lodash';
import { Link, useParams } from 'react-router-dom';
import { Button, FormInstance, Popconfirm } from 'antd';
import {
  CloudDownloadOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { ProFormInstance } from '@ant-design/pro-form';
import { ParamsType } from '@ant-design/pro-provider';
import TableCreateForm from './SchemaForm/TableCreateForm';
import { CommonRecord, RouteParams } from '../types/common';
import { TableCreateButtonRender, XMSTableColumns } from '../types/table';
import { ServiceConfig, useRetrieveRequest } from '../hooks/useCRUDRequests';
import TableUpdateForm from './SchemaForm/TableUpdateForm';
import {
  TableDeleteRequest,
  TableUpdateRequest,
  useTableDeleteRequest,
  useTableUpdateRequest,
} from '../hooks/useTableCRUDRequests';
import getRowKey from '../utils/getRowKey';

export type TableProps<T = CommonRecord, U = ParamsType> = Omit<
  ProTableProps<T, U>,
  'columns' | 'toolBarRender' | 'params'
> &
  Required<Pick<ProTableProps<T, U>, 'rowKey'>> & {
    /** @name 数据请求配置 */
    requestConfig?:
      | ServiceConfig
      | ((matchParams: RouteParams) => ServiceConfig);
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
                  <TableCreateForm
                    requestConfig={requestConfig}
                    tableAction={args[0]}
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
  requestConfig: ServiceConfig
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
      <TableUpdateForm
        rowKey={rowKey}
        record={record}
        tableAction={action}
        requestConfig={requestConfig}
        {...config}
      />
    );

    return render(
      {
        update: defaultUpdate,
        defaultUpdateButtonRender,
        defaultDeleteButtonRender: (config = {}) => {
          const { popConfirmProps = {} } = config;
          return (
            <Popconfirm
              title="确定删除？"
              onConfirm={defaultDelete}
              okText="确定"
              cancelText="取消"
              {...popConfirmProps}
            >
              <Button
                danger
                style={{ marginRight: 10 }}
                icon={<DeleteOutlined />}
                shape="circle"
                type="primary"
              />
            </Popconfirm>
          );
        },
        defaultOnlineOfflineButtonRender: (config = {}) => {
          const {
            onlineStatus = 1,
            offlineStatus = 0,
            onlineText = '上线',
            offlineText = '下线',
            statusKey = 'status',
          } = config;
          const status = get(record, statusKey);

          return (
            <Popconfirm
              title={`确定${
                status === onlineStatus ? offlineText : onlineText
              }？`}
              onConfirm={() =>
                defaultUpdate({
                  [statusKey]:
                    status === onlineStatus ? offlineStatus : onlineStatus,
                })
              }
              okText="确定"
              cancelText="取消"
            >
              <Button
                danger={status === onlineStatus}
                style={{ marginRight: 10 }}
                icon={
                  status === onlineStatus ? (
                    <CloudDownloadOutlined />
                  ) : (
                    <CloudUploadOutlined />
                  )
                }
                shape="circle"
                type="primary"
              />
            </Popconfirm>
          );
        },
        defaultSwapButtonRender: (config) =>
          defaultUpdateButtonRender({
            columns: [
              {
                dataIndex: 'pos',
                title: '序号',
                valueType: 'digit',
                formItemProps: {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                },
              },
            ],
            trigger: (
              <Button
                style={{ marginRight: 10 }}
                icon={<SwapOutlined />}
                shape="circle"
                type="primary"
              />
            ),
            ...(config || {}),
          }),
      },
      ...args
    );
  };
}

const Table: React.FC<TableProps> = (props) => {
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
  const formRef = useRef<ProFormInstance>();

  const ser = useMemo(
    () =>
      isFunction(requestConfig) ? requestConfig(matchParams) : requestConfig,
    [matchParams, requestConfig]
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
          render: makeMergedRender(rowKey, render, update, del, ser),
        };
        if (link && !render) {
          newCol.render = (dom, record) => {
            const url = link(record);
            if (startsWith(url, 'http') || startsWith(url, '//')) {
              return (
                <Button href={url} target="_blank" type="link">
                  {dom}
                </Button>
              );
            }
            return <Link to={link(record)}>{dom}</Link>;
          };
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
    [columns, del, rowKey, ser, update]
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
      syncToUrl: true,
      syncToInitialValues: false,
      ...(form || {}),
    }),
    [form]
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
};

export default Table;
