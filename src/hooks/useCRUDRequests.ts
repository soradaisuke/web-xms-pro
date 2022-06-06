import {
  BaseResult,
  OptionsWithFormat,
  Service,
} from '@ahooksjs/use-request/lib/types';
import { isPlainObject, isString, merge, omitBy } from 'lodash';
import { RequestOptionsInit } from 'umi-request';
import { CommonRecord, RouteParams, User } from '../types/common';
import { request, ResponseStructure, useRequest } from '../utils/request';

type ServiceConfigObject<R = any, P extends any[] = any[], U = any> = {
  requestPath?: string;
  requestOptions?: RequestOptionsInit;
  requestService?: Service<ResponseStructure<R>, P>;
  useRequestOptions?: Partial<OptionsWithFormat<ResponseStructure<R>, P, U, U>>;
};

export type ServiceConfig<R = any, P extends any[] = any[], U = any> =
  | string
  | ServiceConfigObject<R, P, U>;

export type RequestConfig<S extends ServiceConfig> =
  | S
  | ((matchParams: RouteParams, user: User) => S);

export type CreateArgs<P = CommonRecord> = [values: P];

export function useCreateRequest<R = CommonRecord, P = CommonRecord>(
  serviceConfig: ServiceConfig<R, CreateArgs<P>>,
  useRequestOptions?: Partial<
    OptionsWithFormat<ResponseStructure<R>, CreateArgs<P>, R, R>
  >
): BaseResult<R, CreateArgs<P>> {
  let service: Service<ResponseStructure<R>, CreateArgs<P>>;
  const options = merge(
    {
      formatResult: (response) => response.data,
    },
    useRequestOptions
  );

  if (isString(serviceConfig)) {
    service = (values) =>
      request(serviceConfig, {
        data: values,
        method: 'post',
      });
  } else if (isPlainObject(serviceConfig)) {
    service =
      serviceConfig.requestService ??
      ((values) =>
        request(
          serviceConfig.requestPath,
          merge(
            {
              data: values,
              method: 'post',
            },
            serviceConfig.requestOptions
          )
        ));
    merge(options, serviceConfig.useRequestOptions);
  }

  return useRequest(service, options);
}

export type UpdateArgs<P = CommonRecord> = [values: P, id?: string | number];

export function useUpdateRequest<R = CommonRecord, P = CommonRecord>(
  serviceConfig: ServiceConfig<R, UpdateArgs<P>>,
  useRequestOptions?: Partial<
    OptionsWithFormat<ResponseStructure<R>, UpdateArgs<P>, R, R>
  >
): BaseResult<R, UpdateArgs<P>> {
  let service: Service<ResponseStructure<R>, UpdateArgs<P>>;
  const options = merge(
    {
      formatResult: (response) => response.data,
    },
    useRequestOptions
  );

  if (isString(serviceConfig)) {
    service = (values, id) =>
      request(`${serviceConfig}${id ? `/${id}` : ''}`, {
        data: values,
        method: 'put',
      });
  } else if (isPlainObject(serviceConfig)) {
    service =
      serviceConfig.requestService ??
      ((values, id) =>
        request(
          `${serviceConfig.requestPath}${id ? `/${id}` : ''}`,
          merge(
            {
              data: values,
              method: 'put',
            },
            serviceConfig.requestOptions
          )
        ));
    merge(options, serviceConfig.useRequestOptions);
  }

  return useRequest(service, options);
}

export type DeleteArgs = [id?: string | number];

export function useDeleteRequest<R = CommonRecord>(
  serviceConfig: ServiceConfig<R, DeleteArgs>,
  useRequestOptions?: Partial<
    OptionsWithFormat<ResponseStructure<R>, DeleteArgs, R, R>
  >
): BaseResult<R, DeleteArgs> {
  let service: Service<ResponseStructure<R>, DeleteArgs>;
  const options = merge(
    {
      formatResult: (response) => response.data,
    },
    useRequestOptions
  );

  if (isString(serviceConfig)) {
    service = (id?) =>
      request(`${serviceConfig}${id ? `/${id}` : ''}`, { method: 'delete' });
  } else if (isPlainObject(serviceConfig)) {
    service =
      serviceConfig.requestService ??
      ((id?) =>
        request(
          `${serviceConfig.requestPath}${id ? `/${id}` : ''}`,
          merge({ method: 'delete' }, serviceConfig.requestOptions)
        ));
    merge(options, serviceConfig.useRequestOptions);
  }

  return useRequest(service, options);
}

export type RetrieveResult<R = CommonRecord> = {
  items: R[];
  total: number;
};
export type RetrieveArgs = [
  page: number,
  pagesize: number,
  filter: CommonRecord,
  order: string
];

export function useRetrieveRequest<R = CommonRecord, U = CommonRecord>(
  serviceConfig: ServiceConfig<RetrieveResult<R>, RetrieveArgs>,
  useRequestOptions?: Partial<
    OptionsWithFormat<ResponseStructure<R>, RetrieveArgs, U, U>
  >
): BaseResult<U, RetrieveArgs>;

export function useRetrieveRequest<R = CommonRecord>(
  serviceConfig: ServiceConfig<RetrieveResult<R>, RetrieveArgs>,
  useRequestOptions?: Partial<
    OptionsWithFormat<
      ResponseStructure<RetrieveResult<R>>,
      RetrieveArgs,
      RetrieveResult<R>,
      RetrieveResult<R>
    >
  >
): BaseResult<RetrieveResult<R>, RetrieveArgs> {
  let service: Service<ResponseStructure<RetrieveResult<R>>, RetrieveArgs>;
  const options = merge(
    {
      formatResult: (response) => response.data,
    },
    useRequestOptions
  );

  if (isString(serviceConfig)) {
    service = (page, pagesize, filter, order) =>
      request(serviceConfig, {
        params: omitBy(
          {
            page,
            pagesize,
            order,
            filter: JSON.stringify(filter),
          },
          (v) => v === null || v === undefined || v === ''
        ),
        method: 'get',
      });
  } else if (isPlainObject(serviceConfig)) {
    service =
      serviceConfig.requestService ??
      ((page, pagesize, filter, order) =>
        request(
          serviceConfig.requestPath,
          merge(
            {
              params: omitBy(
                {
                  page,
                  pagesize,
                  order,
                  filter: JSON.stringify(filter),
                },
                (v) => v === null || v === undefined || v === ''
              ),
              method: 'get',
            },
            serviceConfig.requestOptions
          )
        ));
    merge(options, serviceConfig.useRequestOptions);
  }

  return useRequest(service, options);
}

export type RetrieveOneArgs = [params: CommonRecord];

export function useRetrieveOneRequest<R = CommonRecord, U = CommonRecord>(
  serviceConfig: ServiceConfig<R, RetrieveOneArgs>,
  useRequestOptions?: Partial<
    OptionsWithFormat<ResponseStructure<R>, RetrieveOneArgs, U, U>
  >
): BaseResult<U, RetrieveOneArgs>;

export function useRetrieveOneRequest<R = CommonRecord>(
  serviceConfig: ServiceConfig<R, RetrieveOneArgs>,
  useRequestOptions?: Partial<
    OptionsWithFormat<ResponseStructure<R>, RetrieveOneArgs, R, R>
  >
): BaseResult<R, RetrieveOneArgs> {
  let service: Service<ResponseStructure<R>, RetrieveOneArgs>;

  const options = merge(
    {
      formatResult: (response) => response.data,
    },
    useRequestOptions
  );

  if (isString(serviceConfig)) {
    service = (params) =>
      request(serviceConfig, {
        params,
        method: 'get',
      });
  } else if (isPlainObject(serviceConfig)) {
    service = (params) =>
      request(
        serviceConfig.requestPath,
        merge(
          {
            params,
            method: 'get',
          },
          serviceConfig.requestOptions
        )
      );
    merge(options, serviceConfig.useRequestOptions);
  }

  return useRequest(service, options);
}
