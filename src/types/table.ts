import { ProFormColumnsType } from '@ant-design/pro-form';
import { ProColumns } from '@ant-design/pro-table';
import { PopconfirmProps } from 'antd';
import { ReactNode } from 'react';
import type { CreateRecordSchemaFormProps } from '../components/SchemaForm/CreateRecordSchemaForm';
import type { UpdateRecordSchemaFormProps } from '../components/SchemaForm/UpdateRecordSchemaForm';
import { CommonRecord, User, XMSValueType } from './common';
import { XMSFormColumns } from './form';

/**
 * @group Pro Components
 * @category Pro Table
 */
export type TableCreateConfig =
  & Partial<
    Omit<CreateRecordSchemaFormProps, 'columns'>
  >
  & Pick<CreateRecordSchemaFormProps, 'columns'>;

/**
 * @group Pro Components
 * @category Pro Table
 */
export type TableUpdateConfig =
  & Partial<
    Omit<UpdateRecordSchemaFormProps, 'columns'>
  >
  & Pick<UpdateRecordSchemaFormProps, 'columns'>
  & {
    key?: string;
  };

/**
 * @group Pro Components
 * @category Pro Table
 */
export type TableDeleteConfig = {
  /** @name Popconfirm配置 */
  popConfirmProps?: PopconfirmProps;
};

/**
 * @group Pro Components
 * @category Pro Table
 */
export type TableOnlineOfflineConfig =
  & Pick<
    UpdateRecordSchemaFormProps,
    'normalizeSubmitValues'
  >
  & {
    /**
     * @defaultValue 1
     */
    onlineStatus?: number;
    /**
     * @defaultValue 0
     */
    offlineStatus?: number;
    /**
     * @defaultValue 上线
     */
    onlineText?: string;
    /**
     * @defaultValue 下线
     */
    offlineText?: string;
    /**
     * @defaultValue status
     */
    statusKey?: string;
    onlinePopConfirmProps?: PopconfirmProps;
    offlinePopConfirmProps?: PopconfirmProps;
  };

/**
 * @group Pro Components
 * @category Pro Table
 */
export type TableCreateButtonRender = (config: TableCreateConfig) => ReactNode;

/**
 * @group Pro Components
 * @category Pro Table
 */
export type TableUpdateButtonRender = (config: TableUpdateConfig) => ReactNode;

/**
 * @group Pro Components
 * @category Pro Table
 */
export type TableDeleteButtonRender = (config?: TableDeleteConfig) => ReactNode;

/**
 * @group Pro Components
 * @category Pro Table
 */
export type TableOnlineOfflineButtonRender = (
  config?: TableOnlineOfflineConfig,
) => ReactNode;

/**
 * @group Pro Components
 * @category Pro Table
 */
export type TableSwapButtonRender = (
  config?: Partial<TableUpdateConfig>,
) => ReactNode;

/**
 * @group Pro Components
 * @category Pro Table
 */
export type XMSTableColumns<T = CommonRecord> =
  & Omit<
    ProColumns<T>,
    'valueType' | 'render'
  >
  & {
    link?: (record: CommonRecord) => string;
    valueType?:
      | ProColumns['valueType']
      | Extract<ProFormColumnsType['valueType'], 'dependency' | 'formSet'>
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
