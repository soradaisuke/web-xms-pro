import { ProDescriptionsProps } from '@ant-design/pro-descriptions';
import { RequestData } from '@ant-design/pro-descriptions/lib/useFetchData';
import { ActionType } from '@ant-design/pro-table';
import { message } from 'antd';
import { useCallback } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useNavigate, useHistory } from 'react-router-dom';
import { CommonRecord } from '../types/common';
import {
  DeleteServiceConfig,
  RetrieveOneServiceConfig,
  UpdateServiceConfig,
  useDeleteRequest,
  useRetrieveOneRequest,
  useUpdateRequest,
} from './useCRUDRequests';

export type DescriptionsUpdateRequest = (
  values: CommonRecord,
  action?: ActionType
) => Promise<boolean>;

export function useDescriptionsUpdateRequest(
  serviceConfig: UpdateServiceConfig,
  action?: ActionType
): DescriptionsUpdateRequest {
  const updateReq = useUpdateRequest(serviceConfig, { manual: true });

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

export type DescriptionsDeleteRequest = () => Promise<boolean>;

export function useDescriptionsDeleteRequest(
  serviceConfig: DeleteServiceConfig
): DescriptionsDeleteRequest {
  const deleteReq = useDeleteRequest(serviceConfig, { manual: true });
  const navigate = useNavigate?.();
  const history = useHistory?.();

  return useCallback<DescriptionsDeleteRequest>(async () => {
    try {
      await deleteReq.run();
      message.success('提交成功');
      if (navigate) {
        navigate(-1)
      } else if (history) {
        history.goBack();
      }
      return true;
    } catch (e) {
      return false;
    }
  }, [deleteReq, history, navigate]);
}

export type DescriptionsRetrieveServiceConfig =
  RetrieveOneServiceConfig<RequestData>;
export type DescriptionsRetrieveRequest = ProDescriptionsProps['request'];

export function useDescriptionsRetrieveRequest(
  serviceConfig: DescriptionsRetrieveServiceConfig
): DescriptionsRetrieveRequest {
  const req = useRetrieveOneRequest<RequestData>(serviceConfig, {
    manual: true,
    formatResult: (res) => ({
      data: res.data,
      success: true,
    }),
  });

  return useCallback<DescriptionsRetrieveRequest>(
    (params) => req.run(params),
    [req]
  );
}
