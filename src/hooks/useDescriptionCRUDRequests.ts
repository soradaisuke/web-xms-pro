import { ActionType } from '@ant-design/pro-table';
import { message } from 'antd';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommonRecord } from '../types/common';
import { DeleteService, RetrieveOneRequest, ServiceConfig, UpdateService, useDeleteRequest, useUpdateRequest } from './useCRUDRequests';

export type DescriptionsRetrieveRequest = RetrieveOneRequest;

export type DescriptionsUpdateRequest = (
  values: CommonRecord,
  action?: ActionType
) => Promise<boolean>;

export type DescriptionsDeleteRequest = () => Promise<boolean>;

export function useDescriptionsUpdateRequest(
  service: UpdateService | ServiceConfig,
  action?: ActionType
): DescriptionsUpdateRequest {
  const updateReq = useUpdateRequest(service);

  return useCallback<DescriptionsUpdateRequest>(
    async (values, a) => {
      try {
        await updateReq.run(values);
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

export function useDescriptionsDeleteRequest(
  service: DeleteService | ServiceConfig,
): DescriptionsDeleteRequest {
  const deleteReq = useDeleteRequest(service);
  const navigate = useNavigate();

  return useCallback<DescriptionsDeleteRequest>(
    async () => {
      try {
        await deleteReq.run();
        message.success('提交成功');
        navigate(-1);
        return true;
      } catch (e) {
        return false;
      }
    },
    [deleteReq, navigate]
  );
}