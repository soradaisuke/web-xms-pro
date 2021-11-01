import { ProColumns } from '@ant-design/pro-table';
import { CommonRecord, XMSValueType } from './common';

export type XMSDescriptionsColumns = Omit<
  ProColumns<CommonRecord>,
  'valueType'
> & {
  /** @name 从数据获取跳转地址 */
  link?: (record: CommonRecord) => string;
  valueType?: ProColumns['valueType'] | XMSValueType;
};
