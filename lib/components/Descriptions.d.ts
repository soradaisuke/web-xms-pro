import React from 'react';
import { ProDescriptionsProps } from '@ant-design/pro-descriptions';
import { ParamsType } from '@ant-design/pro-provider';
import { RequestConfig, RetrieveOneServiceConfig } from '../hooks/useCRUDRequests';
import { CommonRecord } from '../types/common';
import { XMSDescriptionsColumns } from '../types/descriptions';
export declare type DescriptionsProps<T = CommonRecord, U = ParamsType> = Omit<ProDescriptionsProps<T, U>, 'columns'> & {
    /** @name 数据请求配置 */
    requestConfig?: RequestConfig<RetrieveOneServiceConfig>;
    /** @name columns配置 */
    columns: XMSDescriptionsColumns[];
};
declare const Descriptions: React.FC<DescriptionsProps>;
export default Descriptions;
