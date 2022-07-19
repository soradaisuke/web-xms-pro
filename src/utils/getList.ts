import { CommonRecord, ListReqParams, ListResp } from '../types';
import { request } from './request';

export default function getList<T = CommonRecord>(url: string, {
  page = 1,
  pagesize = 999,
  order,
  filter,
}: ListReqParams = {}): Promise<ListResp<T>> {
  return request.get<ListResp<T>>(url, {
    params: {
      page,
      pagesize,
      order,
      filter: JSON.stringify(filter),
    },
  });
}
