import React, { useMemo } from 'react';
import ProDescriptions, {
  ProDescriptionsProps,
} from '@ant-design/pro-descriptions';
import { useParams } from 'react-router-dom';
import { isFunction } from 'lodash';
import { ParamsType } from '@ant-design/pro-provider';
import { ServiceConfig, useRetrieveOneRequest } from '../hooks/useCRUDRequests';
import { CommonRecord, RouteParams } from '../types/common';
import { XMSDescriptionsColumns } from '../types/descriptions';

export type DescriptionsProps<T = CommonRecord, U = ParamsType> = Omit<
  ProDescriptionsProps<T, U>,
  'columns'
> & {
  /** @name 数据请求配置 */
  requestConfig?: ServiceConfig | ((matchParams: RouteParams) => ServiceConfig);
  /** @name columns配置 */
  columns: XMSDescriptionsColumns[];
};

const Descriptions: React.FC<DescriptionsProps> = (props) => {
  const { requestConfig } = props;

  const matchParams = useParams();

  const ser = useMemo(
    () =>
      isFunction(requestConfig) ? requestConfig(matchParams) : requestConfig,
    [matchParams, requestConfig]
  );

  const retrieve = useRetrieveOneRequest(ser);

  return (
    <ProDescriptions
      style={{
        padding: '20px',
        background: 'white',
      }}
      request={retrieve.run}
      {...props}
    />
  );
};

export default Descriptions;
