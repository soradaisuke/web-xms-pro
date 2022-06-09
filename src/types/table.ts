import { ProFormColumnsType } from '@ant-design/pro-form';
import { ProColumns } from '@ant-design/pro-table';
import { PopconfirmProps } from 'antd';
import { ReactNode } from 'react';
import { CreateRecordSchemaFormProps } from '../components/SchemaForm/CreateRecordSchemaForm';
import { UpdateRecordSchemaFormProps } from '../components/SchemaForm/UpdateRecordSchemaForm';
import { CommonRecord, LinkConfig, User, XMSValueType } from './common';
import { XMSFormColumns } from './form';

export type TableCreateConfig = Partial<
  Omit<CreateRecordSchemaFormProps, 'columns'>
> &
  Pick<CreateRecordSchemaFormProps, 'columns'>;

export type TableUpdateConfig = Partial<
  Omit<UpdateRecordSchemaFormProps, 'columns'>
> &
  Pick<UpdateRecordSchemaFormProps, 'columns'> & {
    key?: string;
  };

export type TableDeleteConfig = {
  /** @name Popconfirm配置 */
  popConfirmProps?: PopconfirmProps;
};

export type TableOnlineOfflineConfig = Pick<
  UpdateRecordSchemaFormProps,
  'normalizeSubmitValues'
> & {
  onlineStatus?: number;
  offlineStatus?: number;
  onlineText?: string;
  offlineText?: string;
  statusKey?: string;
};

export type TableCreateButtonRender = (config: TableCreateConfig) => ReactNode;
export type TableUpdateButtonRender = (config: TableUpdateConfig) => ReactNode;
export type TableDeleteButtonRender = (config?: TableDeleteConfig) => ReactNode;
export type TableOnlineOfflineButtonRender = (
  config?: TableOnlineOfflineConfig
) => ReactNode;
export type TableSwapButtonRender = (
  config?: Partial<TableUpdateConfig>
) => ReactNode;

export type XMSTableColumns<T = CommonRecord> = Omit<
  ProColumns<T>,
  'valueType' | 'render'
> & {
  /** @name 从数据获取跳转地址 */
  link?: LinkConfig;
  valueType?:
    | ProColumns['valueType']
    | Extract<ProFormColumnsType['valueType'], 'dependency'>
    | XMSValueType;
  render?: (
    config: {
      user: User;
      update: (values: CommonRecord) => Promise<boolean>;
      defaultUpdateButtonRender: TableUpdateButtonRender;
      defaultDeleteButtonRender: TableDeleteButtonRender;
      defaultOnlineOfflineButtonRender: TableOnlineOfflineButtonRender;
      defaultSwapButtonRender: TableSwapButtonRender;
    },
    ...base: Parameters<ProColumns<T>['render']>
  ) => ReturnType<ProColumns<T>['render']>;
  columns?: XMSFormColumns['columns'];
};
