import { ProSchemaValueEnumMap } from '@ant-design/pro-utils';
import { forEach } from 'lodash';
import { ReactNode } from 'react';

export default function generateValueEnum(options: {
  value: number | string;
  text: ReactNode;
  status?: 'Success' | 'Error' | 'Processing' | 'Warning' | 'Default';
}[]): ProSchemaValueEnumMap {
  const map = new Map();
  forEach(options, ({ value, text, status }) => {
    map.set(value, { text, status });
  });
  return map;
}
