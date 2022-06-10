import { ProColumns } from '@ant-design/pro-table';
import { TableProps } from '../components/Table';
import { TableDeleteRequest, TableUpdateRequest } from '../hooks/useTableCRUDRequests';
import { RouteParams, User } from '../types/common';
import { XMSTableColumns } from '../types/table';
export default function makeMergedRender(rowKey: TableProps['rowKey'], render: XMSTableColumns['render'], update: TableUpdateRequest, del: TableDeleteRequest, user: User, matchParams: RouteParams): ProColumns['render'];
