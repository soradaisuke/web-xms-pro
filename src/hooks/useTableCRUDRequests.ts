import { ActionType } from '@ant-design/pro-table';
import { message } from 'antd';
import { useCallback } from 'react';
import { CommonRecord } from '../types/common';
import {
  CreateService,
  DeleteService,
  RetrieveRequest,
  ServiceConfig,
  UpdateService,
  useCreateRequest,
  useDeleteRequest,
  useUpdateRequest,
} from './useCRUDRequests';

export type TableRetrieveRequest = RetrieveRequest;

export type TableCreateRequest = (
  values: CommonRecord,
  action?: ActionType
) => Promise<boolean>;

export type TableUpdateRequest = (
  values: CommonRecord,
  id?: string | number,
  action?: ActionType
) => Promise<boolean>;

export type TableDeleteRequest = (
  id?: string | number,
  action?: ActionType
) => Promise<boolean>;

export function useTableCreateRequest(
  service: CreateService | ServiceConfig,
  action?: ActionType
): TableCreateRequest {
  const createReq = useCreateRequest(service);

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

export function useTableUpdateRequest(
  service: UpdateService | ServiceConfig,
  action?: ActionType
): TableUpdateRequest {
  const updateReq = useUpdateRequest(service);

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

export function useTableDeleteRequest(
  service: DeleteService | ServiceConfig,
  action?: ActionType
): TableDeleteRequest {
  const deleteReq = useDeleteRequest(service);

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
