import {
  BaseResult,
  OptionsWithFormat,
  Service,
} from '@ahooksjs/use-request/lib/types';
import { isPlainObject, isString, merge, omitBy } from 'lodash';
import { RequestOptionsInit } from 'umi-request';
import { CommonRecord, RouteParams, User } from '../types/common';
import { request, ResponseStructure, useRequest } from '../utils/request';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ServiceConfigObject<
  R extends ResponseStructure = ResponseStructure,
  P extends any[] = any[],
  U = any
> = {
  requestPath?: string;
  requestOptions?: RequestOptionsInit;
  requestService?: Service<R, P>;
  useRequestOptions?: Partial<OptionsWithFormat<R, P, U, U>>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ServiceConfig<
  R extends ResponseStructure = ResponseStructure,
  P extends any[] = any[],
  U = any
> = string | ServiceConfigObject<R, P, U>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestConfig<S extends ServiceConfig> =
  | S
  | ((matchParams: RouteParams, user: User) => S);

export type CreateArgs = [values: CommonRecord];
export type CreateService = Service<ResponseStructure, CreateArgs>;
export type CreateRequest = BaseResult<any, CreateArgs>;
export type CreateServiceConfig = ServiceConfig<
  ResponseStructure,
  CreateArgs,
  any
>;
export function useCreateRequest(
  serviceConfig: CreateServiceConfig,
  useRequestOptions?: Extract<
    CreateServiceConfig,
    ServiceConfigObject
  >['useRequestOptions']
): CreateRequest {
  let service: CreateService;
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

export type UpdateArgs = [values: CommonRecord, id?: string | number];
export type UpdateService = Service<ResponseStructure, UpdateArgs>;
export type UpdateRequest = BaseResult<any, UpdateArgs>;
export type UpdateServiceConfig = ServiceConfig<
  ResponseStructure,
  UpdateArgs,
  any
>;
export function useUpdateRequest(
  serviceConfig: UpdateServiceConfig,
  useRequestOptions?: Extract<
    UpdateServiceConfig,
    ServiceConfigObject
  >['useRequestOptions']
): UpdateRequest {
  let service: UpdateService;
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
export type DeleteService = Service<ResponseStructure, DeleteArgs>;
export type DeleteRequest = BaseResult<any, DeleteArgs>;
export type DeleteServiceConfig = ServiceConfig<
  ResponseStructure,
  DeleteArgs,
  any
>;
export function useDeleteRequest(
  serviceConfig: DeleteServiceConfig,
  useRequestOptions?: Extract<
    DeleteServiceConfig,
    ServiceConfigObject
  >['useRequestOptions']
): DeleteRequest {
  let service: DeleteService;
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

export type RetrieveResult = {
  items: CommonRecord[];
  total: number;
};
export type RetrieveArgs = [
  page: number,
  pagesize: number,
  filter: CommonRecord,
  order: string
];
export type RetrieveService = Service<
  ResponseStructure<RetrieveResult>,
  RetrieveArgs
>;
export type RetrieveRequest<R = any> = BaseResult<R, RetrieveArgs>;
export type RetrieveServiceConfig<R = any> = ServiceConfig<
  ResponseStructure<RetrieveResult>,
  RetrieveArgs,
  R
>;

export function useRetrieveRequest<R = any>(
  serviceConfig: RetrieveServiceConfig<R>,
  useRequestOptions?: Extract<
    RetrieveServiceConfig<R>,
    ServiceConfigObject
  >['useRequestOptions']
): RetrieveRequest {
  let service: RetrieveService;
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

export type RetrieveOneArgs = [params: Record<string, string | number>];
export type RetrieveOneService = Service<
  ResponseStructure<CommonRecord>,
  RetrieveOneArgs
>;
export type RetrieveOneRequest<R = any> = BaseResult<R, RetrieveOneArgs>;
export type RetrieveOneServiceConfig<R = any> = ServiceConfig<
  ResponseStructure<CommonRecord>,
  RetrieveOneArgs,
  R
>;
export function useRetrieveOneRequest<R = any>(
  serviceConfig: RetrieveOneServiceConfig<R>,
  useRequestOptions?: Extract<
    RetrieveOneServiceConfig<R>,
    ServiceConfigObject
  >['useRequestOptions']
): RetrieveOneRequest {
  let service: RetrieveOneService;
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
