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
  DeleteArgs,
  RetrieveOneArgs,
  ServiceConfig,
  UpdateArgs,
  useDeleteRequest,
  useRetrieveOneRequest,
  useUpdateRequest,
} from './useCRUDRequests';

export type DescriptionsUpdateRequest<P = CommonRecord> = (
  values: P,
  action?: ActionType
) => Promise<boolean>;

export function useDescriptionsUpdateRequest<
  R = CommonRecord,
  P = CommonRecord
>(
  serviceConfig: ServiceConfig<R, UpdateArgs<P>>,
  action?: ActionType
): DescriptionsUpdateRequest<P> {
  const updateReq = useUpdateRequest<R, P>(serviceConfig, { manual: true });

  return useCallback<DescriptionsUpdateRequest<P>>(
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

export function useDescriptionsDeleteRequest<R = CommonRecord>(
  serviceConfig: ServiceConfig<R, DeleteArgs>
): DescriptionsDeleteRequest {
  const deleteReq = useDeleteRequest<R>(serviceConfig, { manual: true });
  const navigate = useNavigate?.();
  const history = useHistory?.();

  return useCallback<DescriptionsDeleteRequest>(async () => {
    try {
      await deleteReq.run();
      message.success('提交成功');
      if (navigate) {
        navigate(-1);
      } else if (history) {
        history.goBack();
      }
      return true;
    } catch (e) {
      return false;
    }
  }, [deleteReq, history, navigate]);
}

export function useDescriptionsRetrieveRequest<R = CommonRecord>(
  serviceConfig: ServiceConfig<R, RetrieveOneArgs>
): ProDescriptionsProps<R>['request'] {
  const req = useRetrieveOneRequest<R, RequestData<R>>(serviceConfig, {
    manual: true,
    formatResult: (res) => ({
      data: res.data,
      success: true,
    }),
  });

  return useCallback<ProDescriptionsProps<R>['request']>(
    (params) => req.run(params),
    [req]
  );
}
