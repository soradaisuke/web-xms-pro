import { Key } from '@ant-design/pro-list';
import { ParamsType } from '@ant-design/pro-provider';
import { ProTableProps } from '@ant-design/pro-table';
import { CommonRecord } from '../types/common';
export default function getRowKey(rowKey: ProTableProps<CommonRecord, ParamsType>['rowKey'], record: CommonRecord): Key;
