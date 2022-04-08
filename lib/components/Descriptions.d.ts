/// <reference types="react" />
import { ProDescriptionsProps } from '@ant-design/pro-descriptions';
import { ParamsType } from '@ant-design/pro-provider';
import { RequestConfig } from '../hooks/useCRUDRequests';
import { CommonRecord } from '../types/common';
import { XMSDescriptionsColumns } from '../types/descriptions';
import { DescriptionsRetrieveServiceConfig } from '../hooks/useDescriptionCRUDRequests';
export declare type DescriptionsProps<T = CommonRecord, U = ParamsType> = Omit<ProDescriptionsProps<T, U>, 'columns'> & {
    /** @name 数据请求配置 */
    requestConfig?: RequestConfig<DescriptionsRetrieveServiceConfig>;
    /** @name columns配置 */
    columns: XMSDescriptionsColumns[];
};
declare function Descriptions({ requestConfig, columns, ...rest }: DescriptionsProps): JSX.Element;
declare namespace Descriptions {
    var defaultProps: {
        requestConfig: any;
    };
}
export default Descriptions;
