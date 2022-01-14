import React from 'react';
import { ProTableProps } from '@ant-design/pro-table';
import { ToolBarProps } from '@ant-design/pro-table/lib/components/ToolBar';
import { FormInstance } from 'antd';
import { ParamsType } from '@ant-design/pro-provider';
import { CommonRecord, RouteParams, User } from '../types/common';
import { TableCreateButtonRender, XMSTableColumns } from '../types/table';
import { RequestConfig } from '../hooks/useCRUDRequests';
import { TableRetrieveServiceConfig } from '../hooks/useTableCRUDRequests';
export declare type TableProps<T = CommonRecord, U = ParamsType> = Omit<ProTableProps<T, U>, 'columns' | 'toolBarRender' | 'params'> & Required<Pick<ProTableProps<T, U>, 'rowKey'>> & {
    /** @name 数据请求配置 */
    requestConfig?: RequestConfig<TableRetrieveServiceConfig>;
    /** @name columns配置 */
    columns: XMSTableColumns[];
    params?: U | ((matchParams: RouteParams) => U);
    toolBarRender?: Extract<ProTableProps<T, U>['toolBarRender'], boolean> | ((config: {
        defaultCreateButtonRender: TableCreateButtonRender;
        form: FormInstance;
        params: RouteParams;
        user: User;
    }, ...base: Parameters<ToolBarProps<T>['toolBarRender']>) => ReturnType<ToolBarProps<T>['toolBarRender']>);
};
declare const Table: React.FC<TableProps>;
export default Table;
