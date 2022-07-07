import { ProDescriptionsProps } from '@ant-design/pro-descriptions';
import { ActionType } from '@ant-design/pro-table';
import { Options, Plugin } from 'ahooks/lib/useRequest/src/types';
import { message } from 'antd';
import { concat, isFunction, isString, merge } from 'lodash';
import { MutableRefObject, useCallback, useMemo } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useNavigate, useHistory, Params } from 'react-router-dom';
import { CommonRecord, User } from '../types/common';
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
  TValue extends CommonRecord = CommonRecord
> = UpdateServiceConfig<[values: TValue]> & {
  useRequestOptions?: Options<any, [values: TValue]>;
  useRequestPlugins?: Plugin<any, [values: TValue]>[];
};

export type DescriptionsUpdateRequest<
  TValue extends CommonRecord = CommonRecord
> = (values: TValue) => Promise<boolean>;

export function useDescriptionsUpdateRequest<
  TValue extends CommonRecord = CommonRecord
>(
  serviceConfig: DescriptionsUpdateServiceConfig<TValue>,
  action: MutableRefObject<ActionType>
): DescriptionsUpdateRequest<TValue> {
  const updateReq = useUpdateRequest<[values: TValue]>(
    serviceConfig,
    merge({}, serviceConfig?.useRequestOptions ?? {}, {
      manual: true,
    }),
    concat([], serviceConfig?.useRequestPlugins ?? [])
  );

  return useCallback<DescriptionsUpdateRequest>(
    async (values: TValue) => {
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
  useRequestOptions?: Options<any, []>;
  useRequestPlugins?: Plugin<any, []>[];
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
    useRequestOptions?: Options<TData, [params: CommonRecord]>;
    useRequestPlugins?: Plugin<TData, [params: CommonRecord]>[];
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
        data: res,
        success: true,
      })),
    [req]
  );
}

type CustomConfig<TData, TValue> = {
  update?: Partial<Exclude<DescriptionsUpdateServiceConfig<TValue>, string>>;
  delete?: Partial<Exclude<DescriptionsDeleteServiceConfig, string>>;
  retrieve?: Partial<Exclude<DescriptionsRetrieveServiceConfig<TData>, string>>;
};

export type DescriptionsRequestConfig<
  TData = CommonRecord,
  TValue extends CommonRecord = CommonRecord
> = RequestConfig<
  | Extract<DescriptionsRetrieveServiceConfig<TData>, string>
  | (Partial<Exclude<DescriptionsRetrieveServiceConfig<TData>, string>> &
      CustomConfig<TData, TValue>)
>;

export function useDescriptionsRequests<
  TData = CommonRecord,
  TValue extends CommonRecord = CommonRecord
>(
  requestConfig: DescriptionsRequestConfig<TData, TValue>,
  matchParams: Params,
  user: User,
  action: MutableRefObject<ActionType>
): {
  update?: DescriptionsUpdateRequest<TValue>;
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
    config.update as DescriptionsUpdateServiceConfig<TValue>,
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
