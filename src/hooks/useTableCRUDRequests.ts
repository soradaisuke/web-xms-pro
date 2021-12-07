import { ParamsType } from '@ant-design/pro-provider';
import { ActionType, ProTableProps, RequestData } from '@ant-design/pro-table';
import { message } from 'antd';
import { join, map, replace, toPairs } from 'lodash';
import { useCallback } from 'react';
import { CommonRecord } from '../types/common';
import {
  CreateServiceConfig,
  DeleteServiceConfig,
  RetrieveServiceConfig,
  UpdateServiceConfig,
  useCreateRequest,
  useDeleteRequest,
  useRetrieveRequest,
  useUpdateRequest,
} from './useCRUDRequests';

export type TableCreateRequest = (
  values: CommonRecord,
  action?: ActionType
) => Promise<boolean>;

export function useTableCreateRequest(
  serviceConfig: CreateServiceConfig,
  action?: ActionType
): TableCreateRequest {
  const createReq = useCreateRequest(serviceConfig, { manual: true });

  return useCallback<TableCreateRequest>(
    async (values, a) => {
      try {
        await createReq.run(values);
        message.success('提交成功');
        (a || action)?.reload();
        return true;
      } catch (e) {
        return false;
      }
    },
    [action, createReq]
  );
}

export type TableUpdateRequest = (
  values: CommonRecord,
  id?: string | number,
  action?: ActionType
) => Promise<boolean>;

export function useTableUpdateRequest(
  serviceConfig: UpdateServiceConfig,
  action?: ActionType
): TableUpdateRequest {
  const updateReq = useUpdateRequest(serviceConfig, { manual: true });

  return useCallback<TableUpdateRequest>(
    async (values, id, a) => {
      try {
        await updateReq.run(values, id);
        message.success('提交成功');
        (a || action)?.reload();
        return true;
      } catch (e) {
        return false;
      }
    },
    [action, updateReq]
  );
}

export type TableDeleteRequest = (
  id?: string | number,
  action?: ActionType
) => Promise<boolean>;

export function useTableDeleteRequest(
  serviceConfig: DeleteServiceConfig,
  action?: ActionType
): TableDeleteRequest {
  const deleteReq = useDeleteRequest(serviceConfig, { manual: true });

  return useCallback<TableDeleteRequest>(
    async (id, a) => {
      try {
        await deleteReq.run(id);
        message.success('提交成功');
        (a || action)?.reload();
        return true;
      } catch (e) {
        return false;
      }
    },
    [action, deleteReq]
  );
}

export type TableRetrieveServiceConfig = RetrieveServiceConfig<RequestData<CommonRecord>>;
export type TableRetrieveRequest = ProTableProps<CommonRecord, ParamsType>['request'];

export function useTableRetrieveRequest(
  serviceConfig: TableRetrieveServiceConfig
): TableRetrieveRequest {
  const req = useRetrieveRequest<RequestData<CommonRecord>>(serviceConfig, { 
    manual: true,
    formatResult: (res) => ({
      data: res.data.items,
      total: res.data.total,
      success: true
    })
  });

  return useCallback<TableRetrieveRequest>(
    (params, sort) => {
      const { current, pageSize, ...filter } = params;
      const order: string = join(
        map(toPairs(sort), (s) => `${s[0]} ${replace(s[1], 'end', '')}`),
        ','
      );

      return req.run(current, pageSize, filter, order);
    },
    [req]
  );
}
