import { ParamsType } from '@ant-design/pro-provider';
import { ActionType, ProTableProps } from '@ant-design/pro-table';
import { message } from 'antd';
import {
  isEmpty,
  isFunction,
  isString,
  join,
  map,
  replace,
  toPairs,
} from 'lodash';
import { MutableRefObject, useCallback, useMemo } from 'react';
import { CommonRecord, RouteParams, User } from '../types/common';
import {
  CreateServiceConfig,
  DeleteServiceConfig,
  RequestConfig,
  RetrieveServiceConfig,
  UpdateServiceConfig,
  useCreateRequest,
  useDeleteRequest,
  useRetrieveRequest,
  useUpdateRequest,
} from './useCRUDRequests';

export type TableCreateServiceConfig<
  TValues extends CommonRecord = CommonRecord
> = CreateServiceConfig<[values: TValues]>;

export type TableCreateRequest<TValues extends CommonRecord = CommonRecord> = (
  values: TValues
) => Promise<boolean>;

export function useTableCreateRequest<
  TValues extends CommonRecord = CommonRecord
>(
  serviceConfig: TableCreateServiceConfig<TValues>,
  action: MutableRefObject<ActionType>
): TableCreateRequest<TValues> {
  const createReq = useCreateRequest<[values: TValues]>(serviceConfig, {
    manual: true,
  });

  return useCallback<TableCreateRequest<TValues>>(
    async (values: TValues) => {
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
  TValues extends CommonRecord = CommonRecord
> = UpdateServiceConfig<[values: TValues, id: string | number]>;

export type TableUpdateRequest<TValues extends CommonRecord = CommonRecord> = (
  values: TValues,
  id: string | number
) => Promise<boolean>;

export function useTableUpdateRequest<
  TValues extends CommonRecord = CommonRecord
>(
  serviceConfig: TableUpdateServiceConfig<TValues>,
  action: MutableRefObject<ActionType>
): TableUpdateRequest<TValues> {
  const updateReq = useUpdateRequest<[values: TValues, id: string | number]>(
    serviceConfig,
    { manual: true }
  );

  return useCallback<TableUpdateRequest>(
    async (values: TValues, id) => {
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
>;

export type TableDeleteRequest = (id?: string | number) => Promise<boolean>;

export function useTableDeleteRequest(
  serviceConfig: TableDeleteServiceConfig,
  action: MutableRefObject<ActionType>
): TableDeleteRequest {
  const deleteReq = useDeleteRequest(serviceConfig, { manual: true });

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
  RetrieveServiceConfig<TData>;

export type TableRetrieveRequest<TData = CommonRecord> = ProTableProps<
  TData,
  ParamsType
>['request'];

export function useTableRetrieveRequest<TData = CommonRecord>(
  serviceConfig: TableRetrieveServiceConfig<TData>
): TableRetrieveRequest<TData> {
  const req = useRetrieveRequest<TData>(serviceConfig, {
    manual: true,
  });

  return useCallback<TableRetrieveRequest<TData>>(
    (params, sort) => {
      const { current, pageSize, ...filter } = params;
      const order: string = join(
        map(toPairs(sort), (s) => `${s[0]} ${replace(s[1], 'end', '')}`),
        ','
      );

      return req.runAsync(current, pageSize, filter, order).then((res) => ({
        data: res.data.items,
        total: res.data.total,
        success: true,
      }));
    },
    [req]
  );
}

type CustomConfig<TData, TValues> = {
  create?: TableCreateServiceConfig<TValues>;
  update?: TableUpdateServiceConfig<TValues>;
  delete?: TableDeleteServiceConfig;
  retrieve: TableRetrieveServiceConfig<TData>;
};

export type TableRequestConfig<
  TData = CommonRecord,
  TValues extends CommonRecord = CommonRecord
> = RequestConfig<
  | Extract<TableRetrieveServiceConfig<TData>, string>
  | (Exclude<TableRetrieveServiceConfig<TData>, string> &
      CustomConfig<TData, TValues>)
>;

export function useTableRequests<
  TData = CommonRecord,
  TValues extends CommonRecord = CommonRecord
>(
  requestConfig: TableRequestConfig<TData, TValues>,
  matchParams: RouteParams,
  user: User,
  action: MutableRefObject<ActionType>
): {
  create?: TableCreateRequest<TValues>;
  update?: TableUpdateRequest<TValues>;
  delete?: TableDeleteRequest;
  retrieve?: TableRetrieveRequest<TData>;
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
    const { create, update, delete: del, retrieve, ...rest } = cfg;
    const commonConfig = isEmpty(rest) ? null : rest;
    return {
      create: create ?? commonConfig,
      update: update ?? commonConfig,
      delete: del ?? commonConfig,
      retrieve: retrieve ?? commonConfig,
    };
  }, [matchParams, requestConfig, user]);

  const create = useTableCreateRequest(
    config.create as TableCreateServiceConfig<TValues>,
    action
  );
  const update = useTableUpdateRequest(
    config.update as TableUpdateServiceConfig<TValues>,
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
    create,
    update,
    delete: del,
    retrieve,
  };
}
