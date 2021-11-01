import { BaseResult, Service } from '@ahooksjs/use-request/lib/types';
import {
  isPlainObject,
  isString,
  join,
  map,
  merge,
  replace,
  toPairs,
} from 'lodash';
import { RequestOptionsInit } from 'umi-request';
import { CommonRecord } from '../types/common';
import { request, useRequest } from '../utils/request';

export type ServiceConfigObject = {
  requestPath: string;
  requestOptions?: RequestOptionsInit;
};

export type ServiceConfig = string | ServiceConfigObject;

export type RetrieveService = Service<
  {
    data: CommonRecord[];
    success: boolean;
    total: number;
  },
  [
    params: Record<string, string | number>,
    sort: Record<string, 'ascend' | 'descend'>
  ]
>;

export type RetrieveOneService = Service<
  CommonRecord,
  [params: Record<string, string | number>]
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CreateService = Service<any, [values: CommonRecord]>;

export type UpdateService = Service<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  [values: CommonRecord, id?: string | number]
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DeleteService = Service<any, [id?: string | number]>;

export type RetrieveRequest = BaseResult<
  {
    data: CommonRecord[];
    success: boolean;
    total: number;
  },
  [
    params: Record<string, string | number>,
    sort: Record<string, 'ascend' | 'descend'>
  ]
>;

export type RetrieveOneRequest = BaseResult<
  CommonRecord,
  [params: Record<string, string | number>]
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CreateRequest = BaseResult<any, [values: CommonRecord]>;

export type UpdateRequest = BaseResult<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  [values: CommonRecord, id?: string | number]
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DeleteRequest = BaseResult<any, [id?: string | number]>;

export function useCreateRequest(
  service: CreateService | ServiceConfig
): CreateRequest {
  let ser = service;
  if (isString(service)) {
    ser = (values) =>
      request(service, {
        data: values,
        method: 'post',
      });
  } else if (isPlainObject(service)) {
    ser = (values) =>
      request(
        (service as ServiceConfigObject).requestPath,
        merge(
          {
            data: values,
            method: 'post',
          },
          (service as ServiceConfigObject).requestOptions
        )
      );
  }

  return useRequest(ser, {
    manual: true,
  });
}

export function useRetrieveRequest(
  service: RetrieveService | ServiceConfig
): RetrieveRequest {
  let ser = service;
  if (isString(service)) {
    ser = (
      params: Record<string, string | number>,
      sort: Record<string, 'ascend' | 'descend'>
    ) => {
      const { current, pageSize, ...filter } = params;
      const order: string = join(
        map(toPairs(sort), (s) => `${s[0]} ${replace(s[1], 'end', '')}`),
        ','
      );

      return request(service, {
        params: {
          page: current,
          pagesize: pageSize,
          filter: JSON.stringify(filter),
          order,
        },
        method: 'get',
      });
    };
  } else if (isPlainObject(service)) {
    ser = (
      params: Record<string, string | number>,
      sort: Record<string, 'ascend' | 'descend'>
    ) => {
      const { current, pageSize, ...filter } = params;
      const order: string = join(
        map(toPairs(sort), (s) => `${s[0]} ${replace(s[1], 'end', '')}`),
        ','
      );

      return request(
        (service as ServiceConfigObject).requestPath,
        merge(
          {
            params: {
              page: current,
              pagesize: pageSize,
              filter: JSON.stringify(filter),
              order,
            },
            method: 'get',
          },
          (service as ServiceConfigObject).requestOptions
        )
      );
    };
  }

  return useRequest(ser, {
    manual: true,
    formatResult: (response) => ({
      data: response.data.items,
      success: true,
      total: response.data.total,
    }),
  });
}

export function useRetrieveOneRequest(
  service: RetrieveOneService | ServiceConfig
): RetrieveOneRequest {
  let ser = service;
  if (isString(service)) {
    ser = (params) =>
      request(service, {
        params,
        method: 'get',
      });
  } else if (isPlainObject(service)) {
    ser = (params) =>
      request(
        (service as ServiceConfigObject).requestPath,
        merge(
          {
            params,
            method: 'get',
          },
          (service as ServiceConfigObject).requestOptions
        )
      );
  }

  return useRequest(ser, {
    manual: true,
    formatResult: (response) => ({
      data: response.data,
      success: true,
    }),
  });
}

export function useUpdateRequest(
  service: UpdateService | ServiceConfig
): UpdateRequest {
  let ser = service;
  if (isString(service)) {
    ser = (values, id) =>
      request(`${service}${id ? `/${id}` : ''}`, {
        data: values,
        method: 'put',
      });
  } else if (isPlainObject(service)) {
    ser = (values, id) =>
      request(
        `${(service as ServiceConfigObject).requestPath}${id ? `/${id}` : ''}`,
        merge(
          {
            data: values,
            method: 'put',
          },
          (service as ServiceConfigObject).requestOptions
        )
      );
  }

  return useRequest(ser, {
    manual: true,
  });
}

export function useDeleteRequest(
  service: DeleteService | ServiceConfig
): DeleteRequest {
  let ser = service;
  if (isString(service)) {
    ser = (id?) =>
      request(`${service}${id ? `/${id}` : ''}`, { method: 'delete' });
  } else if (isPlainObject(service)) {
    ser = (id?) =>
      request(
        `${(service as ServiceConfigObject).requestPath}${id ? `/${id}` : ''}`,
        merge(
          { method: 'delete' },
          (service as ServiceConfigObject).requestOptions
        )
      );
  }

  return useRequest(ser, {
    manual: true,
  });
}
