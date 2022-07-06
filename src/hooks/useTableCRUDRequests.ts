import { ParamsType } from '@ant-design/pro-provider';
import { ActionType, ProTableProps } from '@ant-design/pro-table';
import { Options, Plugin } from 'ahooks/lib/useRequest/src/types';
import { message } from 'antd';
import {
  concat,
  isFunction,
  isString,
  join,
  map,
  merge,
  replace,
  toPairs,
} from 'lodash';
import { MutableRefObject, useCallback, useMemo } from 'react';
import { Params } from 'react-router-dom';
import { CommonRecord, ListResp, User } from '../types/common';
import {
  CreateServiceConfig,
  DeleteServiceConfig,
  RequestConfig,
  RetrieveArgs,
  RetrieveServiceConfig,
  UpdateServiceConfig,
  useCreateRequest,
  useDeleteRequest,
  useRetrieveRequest,
  useUpdateRequest,
} from './useCRUDRequests';

export type TableCreateServiceConfig<
  TValue extends CommonRecord = CommonRecord
> = CreateServiceConfig<[values: TValue]> & {
  useRequestOptions?: Options<any, [values: TValue]>;
  useRequestPlugins?: Plugin<any, [values: TValue]>[];
};

export type TableCreateRequest<TValue = CommonRecord> = (
  values: TValue
) => Promise<boolean>;

export function useTableCreateRequest<
  TValue extends CommonRecord = CommonRecord
>(
  serviceConfig: TableCreateServiceConfig<TValue>,
  action: MutableRefObject<ActionType>
): TableCreateRequest<TValue> {
  const createReq = useCreateRequest<[values: TValue]>(
    serviceConfig,
    merge({}, serviceConfig?.useRequestOptions ?? {}, {
      manual: true,
    }),
    concat([], serviceConfig?.useRequestPlugins ?? [])
  );

  return useCallback<TableCreateRequest<TValue>>(
    async (values: TValue) => {
      try {
        await createReq.runAsync(values);
        message.success('提交成功');
        action.current?.reload();
        return true;
      } catch (e) {
        return false;
      }
    },
    [action, createReq]
  );
}

export type TableUpdateServiceConfig<
  TValue extends CommonRecord = CommonRecord
> = UpdateServiceConfig<[values: TValue, id: string | number]> & {
  useRequestOptions?: Options<any, [values: TValue, id: string | number]>;
  useRequestPlugins?: Plugin<any, [values: TValue, id: string | number]>[];
};

export type TableUpdateRequest<TValue extends CommonRecord = CommonRecord> = (
  values: TValue,
  id: string | number
) => Promise<boolean>;

export function useTableUpdateRequest<
  TValue extends CommonRecord = CommonRecord
>(
  serviceConfig: TableUpdateServiceConfig<TValue>,
  action: MutableRefObject<ActionType>
): TableUpdateRequest<TValue> {
  const updateReq = useUpdateRequest<[values: TValue, id: string | number]>(
    serviceConfig,
    merge({}, serviceConfig?.useRequestOptions ?? {}, {
      manual: true,
    }),
    concat([], serviceConfig?.useRequestPlugins ?? [])
  );

  return useCallback<TableUpdateRequest>(
    async (values: TValue, id) => {
      try {
        await updateReq.runAsync(values, id);
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

export type TableDeleteServiceConfig = DeleteServiceConfig<
  [id: string | number]
> & {
  useRequestOptions?: Options<any, [id: string | number]>;
  useRequestPlugins?: Plugin<any, [id: string | number]>[];
};

export type TableDeleteRequest = (id?: string | number) => Promise<boolean>;

export function useTableDeleteRequest(
  serviceConfig: TableDeleteServiceConfig,
  action: MutableRefObject<ActionType>
): TableDeleteRequest {
  const deleteReq = useDeleteRequest(
    serviceConfig,
    merge({}, serviceConfig?.useRequestOptions ?? {}, {
      manual: true,
    }),
    concat([], serviceConfig?.useRequestPlugins ?? [])
  );

  return useCallback<TableDeleteRequest>(
    async (id) => {
      try {
        await deleteReq.runAsync(id);
        message.success('提交成功');
        action.current?.reload();
        return true;
      } catch (e) {
        return false;
      }
    },
    [action, deleteReq]
  );
}

export type TableRetrieveServiceConfig<TData = CommonRecord> =
  RetrieveServiceConfig<TData> & {
    useRequestOptions?: Options<ListResp<TData>, RetrieveArgs>;
    useRequestPlugins?: Plugin<ListResp<TData>, RetrieveArgs>[];
  };

export type TableRetrieveRequest<TData = CommonRecord> = ProTableProps<
  TData,
  ParamsType
>['request'];

export function useTableRetrieveRequest<TData = CommonRecord>(
  serviceConfig: TableRetrieveServiceConfig<TData>
): TableRetrieveRequest<TData> {
  const req = useRetrieveRequest<TData>(
    serviceConfig,
    merge({}, serviceConfig?.useRequestOptions ?? {}, {
      manual: true,
    }),
    concat([], serviceConfig?.useRequestPlugins ?? [])
  );

  return useCallback<TableRetrieveRequest<TData>>(
    (params, sort) => {
      const { current, pageSize, ...filter } = params;
      const order: string = join(
        map(toPairs(sort), (s) => `${s[0]} ${replace(s[1], 'end', '')}`),
        ','
      );

      return req.runAsync(current, pageSize, filter, order).then((res) => ({
        data: res.items,
        total: res.total,
        success: true,
      }));
    },
    [req]
  );
}

type CustomConfig<TData, TValue> = {
  create?: Partial<Exclude<TableCreateServiceConfig<TValue>, string>>;
  update?: Partial<Exclude<TableUpdateServiceConfig<TValue>, string>>;
  delete?: Partial<Exclude<TableDeleteServiceConfig, string>>;
  retrieve?: Partial<Exclude<TableRetrieveServiceConfig<TData>, string>>;
};

export type TableRequestConfig<
  TData = CommonRecord,
  TValue extends CommonRecord = CommonRecord
> = RequestConfig<
  | Extract<TableRetrieveServiceConfig<TData>, string>
  | (Partial<Exclude<TableRetrieveServiceConfig<TData>, string>> &
      CustomConfig<TData, TValue>)
>;

export function useTableRequests<
  TData = CommonRecord,
  TValue extends CommonRecord = CommonRecord
>(
  requestConfig: TableRequestConfig<TData, TValue>,
  matchParams: Params,
  user: User,
  action: MutableRefObject<ActionType>
): {
  create?: TableCreateRequest<TValue>;
  update?: TableUpdateRequest<TValue>;
  delete?: TableDeleteRequest;
  retrieve?: TableRetrieveRequest<TData>;
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
        create: cfg,
        update: cfg,
        delete: cfg,
        retrieve: cfg,
      };
    }
    const { create, update, delete: del, retrieve, ...rest } = cfg;
    return {
      create: merge({}, rest, create),
      update: merge({}, rest, update),
      delete: merge({}, rest, del),
      retrieve: merge({}, rest, retrieve),
    };
  }, [matchParams, requestConfig, user]);

  const create = useTableCreateRequest(
    config.create as TableCreateServiceConfig<TValue>,
    action
  );
  const update = useTableUpdateRequest(
    config.update as TableUpdateServiceConfig<TValue>,
    action
  );
  const del = useTableDeleteRequest(
    config.delete as TableDeleteServiceConfig,
    action
  );
  const retrieve = useTableRetrieveRequest(
    config.retrieve as TableRetrieveServiceConfig<TData>
  );

  return {
    create: config.create ? create : null,
    update: config.update ? update : null,
    delete: config.delete ? del : null,
    retrieve: config.retrieve ? retrieve : null,
  };
}
