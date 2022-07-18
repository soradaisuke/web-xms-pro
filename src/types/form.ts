import { ProFormColumnsType } from '@ant-design/pro-form';
import { CommonRecord, XMSValueType } from './common';

/**
 * @group Pro Components
 * @category Pro Form
 */
export type XMSFormColumns<T = CommonRecord> =
  & Omit<
    ProFormColumnsType<T>,
    'columns' | 'valueType'
  >
  & {
    valueType?: ProFormColumnsType['valueType'] | XMSValueType | 'object';
    columns?: XMSFormColumns[] | ((values: CommonRecord) => XMSFormColumns[]);
  };
