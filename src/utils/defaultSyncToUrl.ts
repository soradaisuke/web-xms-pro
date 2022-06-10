import { mapValues, toNumber } from 'lodash';
import isNumeric from './isNumeric';

export default function defaultSyncToUrl(values, type) {
  if (type === 'get') {
    return mapValues(values, (v) => {
      if (v === 'true') {
        return true;
      }
      if (v === 'false') {
        return false;
      }
      if (isNumeric(v)) {
        return toNumber(v);
      }
      return v;
    });
  }
  return values;
}
