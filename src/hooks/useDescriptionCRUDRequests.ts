import { ProDescriptionsProps } from '@ant-design/pro-descriptions';
import { ActionType } from '@ant-design/pro-table';
import { message } from 'antd';
import { isFunction, isString } from 'lodash';
import { MutableRefObject, useCallback, useMemo } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useNavigate, useHistory } from 'react-router-dom';
import { CommonRecord, RouteParams, User } from '../types/common';
import {
  DeleteServiceConfig,
  RequestConfig,
  RetrieveOneServiceConfig,
  UpdateServiceConfig,
  useDeleteRequest,
  useRetrieveOneRequest,
  useUpdateRequest,
} from './useCRUDRequests';

export type DescriptionsUpdateServiceConfig<
  TValues extends CommonRecord = CommonRecord
> = UpdateServiceConfig<[values: TValues]>;

export type DescriptionsUpdateRequest<
  TValues extends CommonRecord = CommonRecord
> = (values: TValues) => Promise<boolean>;

export function useDescriptionsUpdateRequest<
  TValues extends CommonRecord = CommonRecord
>(
  serviceConfig: DescriptionsUpdateServiceConfig<TValues>,
  action: MutableRefObject<ActionType>
): DescriptionsUpdateRequest<TValues> {
  const updateReq = useUpdateRequest<[values: TValues]>(serviceConfig, {
    manual: true,
  });

  return useCallback<DescriptionsUpdateRequest>(
    async (values: TValues) => {
      try {
        await updateReq.runAsync(values);
        message.success('提交成功');
        action.current?.reload();
        return true;
      } catch (e) {
        return false;
      }
    },
    [action, updateReq]
  );
}

export type DescriptionsDeleteServiceConfig = DeleteServiceConfig<[]>;

export type DescriptionsDeleteRequest = () => Promise<boolean>;

export function useDescriptionsDeleteRequest(
  serviceConfig: DescriptionsDeleteServiceConfig
): DescriptionsDeleteRequest {
  const deleteReq = useDeleteRequest(serviceConfig, { manual: true });
  const navigate = useNavigate?.();
  const history = useHistory?.();

  return useCallback<DescriptionsDeleteRequest>(async () => {
    try {
      await deleteReq.runAsync();
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

export type DescriptionsRetrieveServiceConfig<TData = CommonRecord> =
  RetrieveOneServiceConfig<TData>;

export type DescriptionsRetrieveRequest<TData = CommonRecord> =
  ProDescriptionsProps<TData>['request'];

export function useDescriptionsRetrieveRequest<TData = CommonRecord>(
  serviceConfig: DescriptionsRetrieveServiceConfig<TData>
): DescriptionsRetrieveRequest<TData> {
  const req = useRetrieveOneRequest<TData>(serviceConfig, {
    manual: true,
  });

  return useCallback<DescriptionsRetrieveRequest>(
    (params) =>
      req.runAsync(params).then((res) => ({
        data: res.data,
        success: true,
      })),
    [req]
  );
}

export type DescriptionsRequestConfig<
  TData = CommonRecord,
  TValues extends CommonRecord = CommonRecord
> = RequestConfig<
  DescriptionsRetrieveServiceConfig<TData> & {
    update?: DescriptionsUpdateServiceConfig<TValues>;
    delete?: DescriptionsDeleteServiceConfig;
    retrieve: DescriptionsRetrieveServiceConfig<TData>;
  }
>;

export function useDescriptionsRequests<
  TData = CommonRecord,
  TValues extends CommonRecord = CommonRecord
>(
  requestConfig: DescriptionsRequestConfig<TData, TValues>,
  matchParams: RouteParams,
  user: User,
  action: MutableRefObject<ActionType>
): {
  update?: DescriptionsUpdateRequest<TValues>;
  delete?: DescriptionsDeleteRequest;
  retrieve?: DescriptionsRetrieveRequest<TData>;
} {
  const config = useMemo(() => {
    const cfg = isFunction(requestConfig)
      ? requestConfig(matchParams, user)
      : requestConfig;
    if (isString(cfg)) {
      return {
        update: cfg,
        delete: cfg,
        retrieve: cfg,
      };
    }
    const { requestPath, update, delete: del, retrieve, ...rest } = cfg;
    const commonConfig = requestPath ? { ...rest, requestPath } : null;
    return {
      update: update ?? commonConfig,
      delete: del ?? commonConfig,
      retrieve: retrieve ?? commonConfig,
    };
  }, [matchParams, requestConfig, user]);

  const update = useDescriptionsUpdateRequest(
    config.update as DescriptionsUpdateServiceConfig<TValues>,
    action
  );
  const del = useDescriptionsDeleteRequest(
    config.delete as DescriptionsDeleteServiceConfig
  );
  const retrieve = useDescriptionsRetrieveRequest(
    config.retrieve as DescriptionsRetrieveServiceConfig<TData>
  );

  return {
    update,
    delete: del,
    retrieve,
  };
}
