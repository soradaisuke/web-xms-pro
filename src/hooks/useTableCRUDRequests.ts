import { ActionType, ProTableProps, RequestData } from '@ant-design/pro-table';
import { message } from 'antd';
import { join, map, replace, toPairs } from 'lodash';
import { useCallback } from 'react';
import { CommonRecord } from '../types/common';
import {
  CreateArgs,
  DeleteArgs,
  RetrieveArgs,
  RetrieveResult,
  ServiceConfig,
  UpdateArgs,
  useCreateRequest,
  useDeleteRequest,
  useRetrieveRequest,
  useUpdateRequest,
} from './useCRUDRequests';

export type TableCreateRequest<P = CommonRecord> = (
  values: P,
  action?: ActionType
) => Promise<boolean>;

export function useTableCreateRequest<R = CommonRecord, P = CommonRecord>(
  serviceConfig: ServiceConfig<R, CreateArgs<P>>,
  action?: ActionType
): TableCreateRequest<P> {
  const createReq = useCreateRequest<R, P>(serviceConfig, { manual: true });

  return useCallback<TableCreateRequest<P>>(
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

export type TableUpdateRequest<P = CommonRecord> = (
  values: P,
  id?: string | number,
  action?: ActionType
) => Promise<boolean>;

export function useTableUpdateRequest<R = CommonRecord, P = CommonRecord>(
  serviceConfig: ServiceConfig<R, UpdateArgs<P>>,
  action?: ActionType
): TableUpdateRequest<P> {
  const updateReq = useUpdateRequest<R, P>(serviceConfig, { manual: true });

  return useCallback<TableUpdateRequest<P>>(
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

export function useTableDeleteRequest<R = CommonRecord>(
  serviceConfig: ServiceConfig<R, DeleteArgs>,
  action?: ActionType
): TableDeleteRequest {
  const deleteReq = useDeleteRequest<R>(serviceConfig, { manual: true });

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

export function useTableRetrieveRequest<R = CommonRecord, P = CommonRecord>(
  serviceConfig: ServiceConfig<RetrieveResult<R>, RetrieveArgs>
): ProTableProps<R, P>['request'] {
  const req = useRetrieveRequest<CommonRecord, RequestData<CommonRecord>>(
    serviceConfig,
    {
      manual: true,
      formatResult: (res) => ({
        data: res.data.items,
        total: res.data.total,
        success: true,
      }),
    }
  );

  return useCallback<ProTableProps<R, P>['request']>(
    (params, sort) => {
      const { current, pageSize, ...filter } = params;
      const order: string = join(
        map(toPairs(sort), (s) => `${s[0]} ${replace(s[1], 'end', '')}`),
        ','
      );

      return req.run(current, pageSize, filter, order) as Promise<
        Partial<RequestData<R>>
      >;
    },
    [req]
  );
}
