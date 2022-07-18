import { ProListMeta } from '@ant-design/pro-list';
import { CommonRecord } from './common';
import type { XMSTableColumns } from './table';

/**
 * @group Pro Components
 * @category Pro List
 */
export type XMSListMeta<T = CommonRecord> =
  & Omit<
    ProListMeta<T>,
    'valueType' | 'render'
  >
  & {
    link?: (record: CommonRecord) => string;
    valueType?: XMSTableColumns<T>['valueType'];
    render?: XMSTableColumns<T>['render'];
  };

/**
 * @group Pro Components
 * @category Pro List
 */
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
