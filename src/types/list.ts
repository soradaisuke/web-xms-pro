import { ProListMeta } from '@ant-design/pro-list';
import { CommonRecord, LinkConfig } from './common';
import { XMSTableColumns } from './table';

export type XMSListMeta<T = CommonRecord> = Omit<
  ProListMeta<T>,
  'valueType' | 'render'
> & {
  /** @name 从数据获取跳转地址 */
  link?: LinkConfig;
  valueType?: XMSTableColumns<T>['valueType'];
  render?: XMSTableColumns<T>['render'];
};

export type XMSListMetas<T = CommonRecord> = {
  [key: string]: XMSListMeta<T>;
  type?: XMSListMeta<T>;
  title?: XMSListMeta<T>;
  subTitle?: XMSListMeta<T>;
  description?: XMSListMeta<T>;
  avatar?: XMSListMeta<T>;
  content?: XMSListMeta<T>;
  actions?: XMSListMeta<T> & {
    cardActionProps?: 'extra' | 'actions';
  };
};
