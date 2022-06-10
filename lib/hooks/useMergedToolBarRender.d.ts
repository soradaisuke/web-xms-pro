import { ParamsType } from '@ant-design/pro-provider';
import { ProFormInstance } from '@ant-design/pro-form';
import { ProTableProps } from '@ant-design/pro-table';
import { TableProps } from '../components/Table';
import { CommonRecord, RouteParams, User } from '../types';
import { TableCreateRequest } from './useTableCRUDRequests';
export default function useMergedToolBarRender<T = CommonRecord, U = ParamsType>(toolBarRender: TableProps<T, U>['toolBarRender'], create: TableCreateRequest, form: ProFormInstance, matchParams: RouteParams, user: User): ProTableProps<T, U>['toolBarRender'];
