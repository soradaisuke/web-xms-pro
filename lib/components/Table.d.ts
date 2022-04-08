/// <reference types="react" />
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
        matchParams: RouteParams;
        user: User;
    }, ...base: Parameters<ToolBarProps<T>['toolBarRender']>) => ReturnType<ToolBarProps<T>['toolBarRender']>);
};
declare function Table<T = CommonRecord, U = ParamsType>({ rowKey, requestConfig, columns, toolBarRender, search, params, form, ...rest }: TableProps<T, U>): JSX.Element;
declare namespace Table {
    var defaultProps: {
        params: any;
        toolBarRender: any;
        requestConfig: any;
    };
}
export default Table;
