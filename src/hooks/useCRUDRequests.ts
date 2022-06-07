import {
  Options,
  Service,
  Plugin,
  Result,
} from 'ahooks/lib/useRequest/src/types';
import { isPlainObject, isString, merge, omitBy } from 'lodash';
import { RequestOptionsInit } from 'umi-request';
import { CommonRecord, RouteParams, User } from '../types/common';
import { request, ResponseStructure, useRequest } from '../utils/request';

export type ServiceConfigObject<
  TData = CommonRecord,
  TParams extends any[] = any[]
> = {
  requestPath?: string;
  requestOptions?: RequestOptionsInit;
  requestService?: Service<ResponseStructure<TData>, TParams>;
  useRequestOptions?: Options<ResponseStructure<TData>, TParams>;
  useRequestPlugins?: Plugin<ResponseStructure<TData>, TParams>[];
};

export type ServiceConfig<
  TData = CommonRecord,
  TParams extends any[] = any[]
> = string | ServiceConfigObject<TData, TParams>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestConfig<S extends ServiceConfig> =
  | S
  | ((matchParams: RouteParams, user: User) => S);

type CreateArgs = [values: CommonRecord];

type CreateService<
  TData = CommonRecord,
  TParams extends CreateArgs = CreateArgs
> = Service<ResponseStructure<TData>, TParams>;

export type CreateServiceConfig<
  TParams extends CreateArgs = CreateArgs,
  TData = CommonRecord
> = ServiceConfig<TData, TParams>;

export function useCreateRequest<
  TParams extends CreateArgs = CreateArgs,
  TData = CommonRecord
>(
  serviceConfig: CreateServiceConfig<TParams, TData>,
  options?: Options<ResponseStructure<TData>, TParams>,
  plugins?: Plugin<ResponseStructure<TData>, TParams>[]
): Result<ResponseStructure<TData>, TParams> {
  let service: CreateService<TData, TParams>;
  const opts = merge({}, options);
  const plugs = merge({}, plugins);

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
    merge(opts, serviceConfig.useRequestOptions);
    merge(plugs, serviceConfig.useRequestPlugins);
  }

  return useRequest(service, opts, plugs);
}

type UpdateArgs = [values: CommonRecord, id?: string | number];

type UpdateService<
  TData = CommonRecord,
  TParams extends UpdateArgs = UpdateArgs
> = Service<ResponseStructure<TData>, TParams>;

export type UpdateServiceConfig<
  TParams extends UpdateArgs = UpdateArgs,
  TData = CommonRecord
> = ServiceConfig<TData, TParams>;

export function useUpdateRequest<
  TParams extends UpdateArgs = UpdateArgs,
  TData = CommonRecord
>(
  serviceConfig: UpdateServiceConfig<TParams, TData>,
  options?: Options<ResponseStructure<TData>, TParams>,
  plugins?: Plugin<ResponseStructure<TData>, TParams>[]
): Result<ResponseStructure<TData>, TParams> {
  let service: UpdateService<TData, TParams>;
  const opts = merge({}, options);
  const plugs = merge({}, plugins);

  if (isString(serviceConfig)) {
    service = (values, id?) =>
      request(`${serviceConfig}${id ? `/${id}` : ''}`, {
        data: values,
        method: 'put',
      });
  } else if (isPlainObject(serviceConfig)) {
    service =
      serviceConfig.requestService ??
      ((values, id?) =>
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
    merge(opts, serviceConfig.useRequestOptions);
    merge(plugs, serviceConfig.useRequestPlugins);
  }

  return useRequest(service, opts, plugs);
}

type DeleteArgs = [id?: string | number];

type DeleteService<
  TData = CommonRecord,
  TParams extends DeleteArgs = DeleteArgs
> = Service<ResponseStructure<TData>, TParams>;

export type DeleteServiceConfig<
  TParams extends DeleteArgs = DeleteArgs,
  TData = CommonRecord
> = ServiceConfig<TData, TParams>;

export function useDeleteRequest<
  TParams extends DeleteArgs = DeleteArgs,
  TData = CommonRecord
>(
  serviceConfig: DeleteServiceConfig<TParams, TData>,
  options?: Options<ResponseStructure<TData>, TParams>,
  plugins?: Plugin<ResponseStructure<TData>, TParams>[]
): Result<ResponseStructure<TData>, TParams> {
  let service: DeleteService<TData, TParams>;
  const opts = merge({}, options);
  const plugs = merge({}, plugins);

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
    merge(opts, serviceConfig.useRequestOptions);
    merge(plugs, serviceConfig.useRequestPlugins);
  }

  return useRequest(service, opts, plugs);
}

type RetrieveResult<TData = CommonRecord> = {
  items: TData[];
  total: number;
};

type RetrieveArgs = [
  page: number,
  pagesize: number,
  filter: CommonRecord,
  order: string
];

type RetrieveService<
  TData = CommonRecord,
  TParams extends RetrieveArgs = RetrieveArgs
> = Service<ResponseStructure<RetrieveResult<TData>>, TParams>;

export type RetrieveServiceConfig<
  TData = CommonRecord,
  TParams extends RetrieveArgs = RetrieveArgs
> = ServiceConfig<RetrieveResult<TData>, TParams>;

export function useRetrieveRequest<
  TData = CommonRecord,
  TParams extends RetrieveArgs = RetrieveArgs
>(
  serviceConfig: RetrieveServiceConfig<TData, TParams>,
  options?: Options<ResponseStructure<RetrieveResult<TData>>, TParams>,
  plugins?: Plugin<ResponseStructure<RetrieveResult<TData>>, TParams>[]
): Result<ResponseStructure<RetrieveResult<TData>>, TParams> {
  let service: RetrieveService<TData, TParams>;
  const opts = merge({}, options);
  const plugs = merge({}, plugins);

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
    merge(opts, serviceConfig.useRequestOptions);
    merge(plugs, serviceConfig.useRequestPlugins);
  }

  return useRequest(service, opts, plugs);
}

type RetrieveOneArgs = [params: Record<string, string | number>];

type RetrieveOneService<
  TData = CommonRecord,
  TParams extends RetrieveOneArgs = RetrieveOneArgs
> = Service<ResponseStructure<TData>, TParams>;

export type RetrieveOneServiceConfig<
  TData = CommonRecord,
  TParams extends RetrieveOneArgs = RetrieveOneArgs
> = ServiceConfig<TData, TParams>;

export function useRetrieveOneRequest<
  TData = CommonRecord,
  TParams extends RetrieveOneArgs = RetrieveOneArgs
>(
  serviceConfig: RetrieveOneServiceConfig<TData, TParams>,
  options?: Options<ResponseStructure<TData>, TParams>,
  plugins?: Plugin<ResponseStructure<TData>, TParams>[]
): Result<ResponseStructure<TData>, TParams> {
  let service: RetrieveOneService<TData, TParams>;
  const opts = merge({}, options);
  const plugs = merge({}, plugins);

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
    merge(opts, serviceConfig.useRequestOptions);
    merge(plugs, serviceConfig.useRequestPlugins);
  }

  return useRequest(service, opts, plugs);
}
