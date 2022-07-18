import { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import { CommonRecord, User, XMSValueType } from './common';
import type {
  TableDeleteButtonRender,
  TableOnlineOfflineButtonRender,
  TableSwapButtonRender,
  TableUpdateButtonRender,
} from './table';

/**
 * 扩展自[Pro Schema](https://procomponents.ant.design/components/schema)
 * @group Pro Components
 * @category Pro Descriptions
 */
export type XMSDescriptionsColumns =
  & Omit<
    ProDescriptionsItemProps<CommonRecord>,
    'valueType' | 'render'
  >
  & {
    link?: (record: CommonRecord) => string;
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
