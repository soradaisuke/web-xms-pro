import { useRequest } from 'ahooks';
import {
  Options,
  Service,
  Plugin,
  Result,
} from 'ahooks/lib/useRequest/src/types';
import { isPlainObject, isString, merge, omitBy } from 'lodash';
import { Params } from 'react-router-dom';
import { RequestOptionsInit } from 'umi-request';
import { CommonRecord, ListResp, User } from 'types/common';
import { request } from 'utils/request';

export type ServiceConfigObject<
  TData = CommonRecord,
  TParams extends any[] = any[]
> =
  | {
      requestService: Service<TData, TParams>;
    }
  | {
      requestPath: string;
      requestOptions?: RequestOptionsInit;
    };

export type ServiceConfig<
  TData = CommonRecord,
  TParams extends any[] = any[]
> = string | ServiceConfigObject<TData, TParams>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestConfig<S> = S | ((matchParams: Params, user: User) => S);

type CreateArgs = [values: CommonRecord];

type CreateService<
  TData = CommonRecord,
  TParams extends CreateArgs = CreateArgs
> = Service<TData, TParams>;

export type CreateServiceConfig<
  TParams extends CreateArgs = CreateArgs,
  TData = CommonRecord
> = ServiceConfig<TData, TParams>;

export function useCreateRequest<
  TParams extends CreateArgs = CreateArgs,
  TData = CommonRecord
>(
  serviceConfig: CreateServiceConfig<TParams, TData>,
  options?: Options<TData, TParams>,
  plugins?: Plugin<TData, TParams>[]
): Result<TData, TParams> {
  let service: CreateService<TData, TParams>;

  if (isString(serviceConfig)) {
    service = (values) =>
      request(serviceConfig, {
        data: values,
        method: 'post',
      });
  } else if (isPlainObject(serviceConfig)) {
    if ('requestService' in serviceConfig) {
      service = serviceConfig.requestService;
    } else if ('requestPath' in serviceConfig) {
      service = (values) =>
        request<TData>(
          serviceConfig.requestPath,
          merge(
            {
              data: values,
              method: 'post',
            },
            serviceConfig.requestOptions
          )
        );
    }
  }

  return useRequest(service, options, plugins);
}

type UpdateArgs = [values: CommonRecord, id?: string | number];

type UpdateService<
  TData = CommonRecord,
  TParams extends UpdateArgs = UpdateArgs
> = Service<TData, TParams>;

export type UpdateServiceConfig<
  TParams extends UpdateArgs = UpdateArgs,
  TData = CommonRecord
> = ServiceConfig<TData, TParams>;

export function useUpdateRequest<
  TParams extends UpdateArgs = UpdateArgs,
  TData = CommonRecord
>(
  serviceConfig: UpdateServiceConfig<TParams, TData>,
  options?: Options<TData, TParams>,
  plugins?: Plugin<TData, TParams>[]
): Result<TData, TParams> {
  let service: UpdateService<TData, TParams>;

  if (isString(serviceConfig)) {
    service = (values, id?) =>
      request(`${serviceConfig}${id ? `/${id}` : ''}`, {
        data: values,
        method: 'put',
      });
  } else if (isPlainObject(serviceConfig)) {
    if ('requestService' in serviceConfig) {
      service = serviceConfig.requestService;
    } else if ('requestPath' in serviceConfig) {
      service = (values, id?) =>
        request(
          `${serviceConfig.requestPath}${id ? `/${id}` : ''}`,
          merge(
            {
              data: values,
              method: 'put',
            },
            serviceConfig.requestOptions
          )
        );
    }
  }

  return useRequest(service, options, plugins);
}

type DeleteArgs = [id?: string | number];

type DeleteService<
  TData = CommonRecord,
  TParams extends DeleteArgs = DeleteArgs
> = Service<TData, TParams>;

export type DeleteServiceConfig<
  TParams extends DeleteArgs = DeleteArgs,
  TData = CommonRecord
> = ServiceConfig<TData, TParams>;

export function useDeleteRequest<
  TParams extends DeleteArgs = DeleteArgs,
  TData = CommonRecord
>(
  serviceConfig: DeleteServiceConfig<TParams, TData>,
  options?: Options<TData, TParams>,
  plugins?: Plugin<TData, TParams>[]
): Result<TData, TParams> {
  let service: DeleteService<TData, TParams>;

  if (isString(serviceConfig)) {
    service = (id?) =>
      request(`${serviceConfig}${id ? `/${id}` : ''}`, { method: 'delete' });
  } else if (isPlainObject(serviceConfig)) {
    if ('requestService' in serviceConfig) {
      service = serviceConfig.requestService;
    } else if ('requestPath' in serviceConfig) {
      service = (id?) =>
        request(
          `${serviceConfig.requestPath}${id ? `/${id}` : ''}`,
          merge({ method: 'delete' }, serviceConfig.requestOptions)
        );
    }
  }

  return useRequest(service, options, plugins);
}

export type RetrieveArgs = [
  page: number,
  pagesize: number,
  filter: CommonRecord,
  order: string
];

type RetrieveService<
  TData = CommonRecord,
  TParams extends RetrieveArgs = RetrieveArgs
> = Service<ListResp<TData>, TParams>;

export type RetrieveServiceConfig<
  TData = CommonRecord,
  TParams extends RetrieveArgs = RetrieveArgs
> = ServiceConfig<ListResp<TData>, TParams>;

const omit = (object) =>
  omitBy(
    object,
    (v) => v === null || v === undefined || v === '' || Number.isNaN(v)
  );

export function useRetrieveRequest<
  TData = CommonRecord,
  TParams extends RetrieveArgs = RetrieveArgs
>(
  serviceConfig: RetrieveServiceConfig<TData, TParams>,
  options?: Options<ListResp<TData>, TParams>,
  plugins?: Plugin<ListResp<TData>, TParams>[]
): Result<ListResp<TData>, TParams> {
  let service: RetrieveService<TData, TParams>;

  if (isString(serviceConfig)) {
    service = (page, pagesize, filter, order) =>
      request(serviceConfig, {
        params: omit({
          page,
          pagesize,
          order,
          filter: JSON.stringify(omit(filter)),
        }),
        method: 'get',
      });
  } else if (isPlainObject(serviceConfig)) {
    if ('requestService' in serviceConfig) {
      service = serviceConfig.requestService;
    } else if ('requestPath' in serviceConfig) {
      service = (page, pagesize, filter, order) =>
        request(
          serviceConfig.requestPath,
          merge(
            {
              params: omit({
                page,
                pagesize,
                order,
                filter: JSON.stringify(omit(filter)),
              }),
              method: 'get',
            },
            serviceConfig.requestOptions
          )
        );
    }
  }

  return useRequest(service, options, plugins);
}

type RetrieveOneArgs = [params: CommonRecord];

type RetrieveOneService<
  TData = CommonRecord,
  TParams extends RetrieveOneArgs = RetrieveOneArgs
> = Service<TData, TParams>;

export type RetrieveOneServiceConfig<
  TData = CommonRecord,
  TParams extends RetrieveOneArgs = RetrieveOneArgs
> = ServiceConfig<TData, TParams>;

export function useRetrieveOneRequest<
  TData = CommonRecord,
  TParams extends RetrieveOneArgs = RetrieveOneArgs
>(
  serviceConfig: RetrieveOneServiceConfig<TData, TParams>,
  options?: Options<TData, TParams>,
  plugins?: Plugin<TData, TParams>[]
): Result<TData, TParams> {
  let service: RetrieveOneService<TData, TParams>;

  if (isString(serviceConfig)) {
    service = (params) =>
      request(serviceConfig, {
        params,
        method: 'get',
      });
  } else if (isPlainObject(serviceConfig)) {
    if ('requestService' in serviceConfig) {
      service = serviceConfig.requestService;
    } else if ('requestPath' in serviceConfig) {
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
    }
  }

  return useRequest(service, options, plugins);
}
