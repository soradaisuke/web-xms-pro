import { ProColumns } from '@ant-design/pro-table';
import { CommonRecord, LinkConfig, XMSValueType } from './common';
import { TableDeleteButtonRender, TableOnlineOfflineButtonRender, TableUpdateButtonRender } from './table';
export declare type XMSDescriptionsColumns = Omit<ProColumns<CommonRecord>, 'valueType' | 'render'> & {
    /** @name 从数据获取跳转地址 */
    link?: LinkConfig;
    valueType?: ProColumns['valueType'] | XMSValueType;
    render?: (config: {
        user: CommonRecord;
        update: (values: CommonRecord) => Promise<boolean>;
        defaultUpdateButtonRender: TableUpdateButtonRender;
        defaultDeleteButtonRender: TableDeleteButtonRender;
        defaultOnlineOfflineButtonRender: TableOnlineOfflineButtonRender;
    }, ...base: Parameters<ProColumns<CommonRecord>['render']>) => ReturnType<ProColumns<CommonRecord>['render']>;
};
