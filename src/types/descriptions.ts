import { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import { CommonRecord, LinkConfig, User, XMSValueType } from './common';
import {
  TableDeleteButtonRender,
  TableOnlineOfflineButtonRender,
  TableSwapButtonRender,
  TableUpdateButtonRender,
} from './table';

export type XMSDescriptionsColumns = Omit<
  ProDescriptionsItemProps<CommonRecord>,
  'valueType' | 'render'
> & {
  /** @name 从数据获取跳转地址 */
  link?: LinkConfig;
  valueType?: ProDescriptionsItemProps['valueType'] | XMSValueType;
  render?: (
    config: {
      user: User;
      update: (values: CommonRecord) => Promise<boolean>;
      defaultUpdateButtonRender: TableUpdateButtonRender;
      defaultDeleteButtonRender: TableDeleteButtonRender;
      defaultOnlineOfflineButtonRender: TableOnlineOfflineButtonRender;
      defaultSwapButtonRender: TableSwapButtonRender;
    },
    ...base: Parameters<ProDescriptionsItemProps<CommonRecord>['render']>
  ) => ReturnType<ProDescriptionsItemProps<CommonRecord>['render']>;
};
