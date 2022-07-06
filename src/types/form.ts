import { ProFormColumnsType } from '@ant-design/pro-form';
import { CommonRecord, XMSValueType } from './common';

/**
 * @group Pro Components
 * @category Pro Form
 */
export type XMSFormColumns = Omit<
  ProFormColumnsType<CommonRecord>,
  'columns' | 'valueType'
> & {
  valueType?: ProFormColumnsType['valueType'] | XMSValueType;
  columns?: XMSFormColumns[] | ((values: CommonRecord) => XMSFormColumns[]);
};
