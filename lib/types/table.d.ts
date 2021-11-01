import { ProColumns } from '@ant-design/pro-table';
import { PopconfirmProps } from 'antd';
import { ReactNode } from 'react';
import { TableCreateFormProps } from '../components/SchemaForm/TableCreateForm';
import { TableUpdateFormProps } from '../components/SchemaForm/TableUpdateForm';
import { CommonRecord, XMSValueType } from './common';
export declare type TableCreateConfig = Partial<TableCreateFormProps> & Pick<TableCreateFormProps, 'columns'>;
export declare type TableUpdateConfig = Partial<TableUpdateFormProps> & Pick<TableUpdateFormProps, 'columns'>;
export declare type TableDeleteConfig = {
    /** @name Popconfirm配置 */
    popConfirmProps?: PopconfirmProps;
};
export declare type TableOnlineOfflineConfig = {
    onlineStatus?: number;
    offlineStatus?: number;
    onlineText?: string;
    offlineText?: string;
    statusKey?: string;
};
export declare type TableCreateButtonRender = (config: TableCreateConfig) => ReactNode;
export declare type TableUpdateButtonRender = (config: TableUpdateConfig) => ReactNode;
export declare type TableDeleteButtonRender = (config?: TableDeleteConfig) => ReactNode;
export declare type TableOnlineOfflineButtonRender = (config?: TableOnlineOfflineConfig) => ReactNode;
export declare type TableSwapButtonRender = (config?: Partial<TableUpdateConfig>) => ReactNode;
export declare type XMSTableColumns = Omit<ProColumns<CommonRecord>, 'valueType' | 'render'> & {
    /** @name 从数据获取跳转地址 */
    link?: (record: CommonRecord) => string;
    valueType?: ProColumns['valueType'] | XMSValueType;
    render?: (config: {
        update: (values: CommonRecord) => Promise<boolean>;
        defaultUpdateButtonRender: TableUpdateButtonRender;
        defaultDeleteButtonRender: TableDeleteButtonRender;
        defaultOnlineOfflineButtonRender: TableOnlineOfflineButtonRender;
        defaultSwapButtonRender: TableSwapButtonRender;
    }, ...base: Parameters<ProColumns<CommonRecord>['render']>) => ReturnType<ProColumns<CommonRecord>['render']>;
};
