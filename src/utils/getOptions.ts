import { RequestOptionsType } from '@ant-design/pro-utils';
import { get, map } from 'lodash';
import { CommonRecord, ListReqParams } from '../types';
import getList from './getList';

export type OptionKey = {
  valueKey: string;
  labelKey: string;
};

export default function getOptions<T = CommonRecord>(url: string, {
  valueKey,
  labelKey,
  ...params
}: ListReqParams & OptionKey): Promise<RequestOptionsType[]> {
  return getList<T>(url, params).then((res) =>
    map(res.items, (item) => ({
      label: get(item, labelKey),
      value: get(item, valueKey),
    }))
  );
}
