import { ProSchema } from '@ant-design/pro-utils';
import { CommonRecord } from '../types/common';

export default function makeMergedRenderFormItem<T = CommonRecord>(
  renderFormItem: ProSchema['renderFormItem'],
  record: T,
): ProSchema['renderFormItem'] {
  if (!renderFormItem) {
    return null;
  }
  return (schema, config, form) =>
    renderFormItem(
      schema,
      {
        ...config,
        record,
      },
      form,
    );
}
