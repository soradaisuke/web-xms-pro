import { ProSchemaValueEnumType } from '@ant-design/pro-provider';
import { ProSchemaValueEnumMap } from '@ant-design/pro-utils';
import { forEach } from 'lodash';

export default function generateValueEnum(options: (Omit<ProSchemaValueEnumType, 'status'> & {
  value: number | string | boolean;
  status?: 'Success' | 'Error' | 'Processing' | 'Warning' | 'Default';
})[]): ProSchemaValueEnumMap {
  const map = new Map();
  forEach(options, ({ value, ...option }) => {
    map.set(value, option);
  });
  return map;
}
