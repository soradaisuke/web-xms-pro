import { ProDescriptionsProps } from '@ant-design/pro-descriptions';
import { ActionType } from '@ant-design/pro-table';
import { Options, Plugin } from 'ahooks/lib/useRequest/src/types';
import { message } from 'antd';
import { concat, isFunction, isString, merge } from 'lodash';
import { MutableRefObject, useCallback, useMemo } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useNavigate, useHistory } from 'react-router-dom';
import { CommonRecord, RouteParams, User } from '../types/common';
import { ResponseStructure } from '../utils/request';
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
> = UpdateServiceConfig<[values: TValues]> & {
  useRequestOptions?: Options<ResponseStructure, [values: TValues]>;
  useRequestPlugins?: Plugin<ResponseStructure, [values: TValues]>[];
};

export type DescriptionsUpdateRequest<
  TValues extends CommonRecord = CommonRecord
> = (values: TValues) => Promise<boolean>;

export function useDescriptionsUpdateRequest<
  TValues extends CommonRecord = CommonRecord
>(
  serviceConfig: DescriptionsUpdateServiceConfig<TValues>,
  action: MutableRefObject<ActionType>
): DescriptionsUpdateRequest<TValues> {
  const updateReq = useUpdateRequest<[values: TValues]>(
    serviceConfig,
    merge({}, serviceConfig?.useRequestOptions ?? {}, {
      manual: true,
    }),
    concat([], serviceConfig?.useRequestPlugins ?? [])
  );

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

export type DescriptionsDeleteServiceConfig = DeleteServiceConfig<[]> & {
  useRequestOptions?: Options<ResponseStructure, []>;
  useRequestPlugins?: Plugin<ResponseStructure, []>[];
};

export type DescriptionsDeleteRequest = () => Promise<boolean>;

export function useDescriptionsDeleteRequest(
  serviceConfig: DescriptionsDeleteServiceConfig
): DescriptionsDeleteRequest {
  const deleteReq = useDeleteRequest(
    serviceConfig,
    merge({}, serviceConfig?.useRequestOptions ?? {}, {
      manual: true,
    }),
    concat([], serviceConfig?.useRequestPlugins ?? [])
  );
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
  RetrieveOneServiceConfig<TData> & {
    useRequestOptions?: Options<ResponseStructure, [params: CommonRecord]>;
    useRequestPlugins?: Plugin<ResponseStructure, [params: CommonRecord]>[];
  };

export type DescriptionsRetrieveRequest<TData = CommonRecord> =
  ProDescriptionsProps<TData>['request'];

export function useDescriptionsRetrieveRequest<TData = CommonRecord>(
  serviceConfig: DescriptionsRetrieveServiceConfig<TData>
): DescriptionsRetrieveRequest<TData> {
  const req = useRetrieveOneRequest<TData>(
    serviceConfig,
    merge({}, serviceConfig?.useRequestOptions ?? {}, {
      manual: true,
    }),
    concat([], serviceConfig?.useRequestPlugins ?? [])
  );

  return useCallback<DescriptionsRetrieveRequest>(
    (params) =>
      req.runAsync(params).then((res) => ({
        data: res.data,
        success: true,
      })),
    [req]
  );
}

type CustomConfig<TData, TValues> = {
  update?: Partial<Exclude<DescriptionsUpdateServiceConfig<TValues>, string>>;
  delete?: Partial<Exclude<DescriptionsDeleteServiceConfig, string>>;
  retrieve?: Partial<Exclude<DescriptionsRetrieveServiceConfig<TData>, string>>;
};

export type DescriptionsRequestConfig<
  TData = CommonRecord,
  TValues extends CommonRecord = CommonRecord
> = RequestConfig<
  | Extract<DescriptionsRetrieveServiceConfig<TData>, string>
  | (Partial<Exclude<DescriptionsRetrieveServiceConfig<TData>, string>> &
      CustomConfig<TData, TValues>)
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

    if (!cfg) {
      return {};
    }

    if (isString(cfg)) {
      return {
        update: cfg,
        delete: cfg,
        retrieve: cfg,
      };
    }
    const { update, delete: del, retrieve, ...rest } = cfg;
    return {
      update: merge({}, rest, update),
      delete: merge({}, rest, del),
      retrieve: merge({}, rest, retrieve),
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
    update: config.update ? update : null,
    delete: config.delete ? del : null,
    retrieve: config.retrieve ? retrieve : null,
  };
}
