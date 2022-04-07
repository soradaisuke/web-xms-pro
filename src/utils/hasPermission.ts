import { find, get, isString } from 'lodash';
import { CommonRecord } from '../types';

export default function hasPermission(
  needPermissions: string | string[],
  userPermissions: CommonRecord
): boolean {
  if (!needPermissions || needPermissions.length === 0) {
    return true;
  }

  if (!userPermissions) {
    return false;
  }

  const permissions = isString(needPermissions)
    ? [needPermissions]
    : needPermissions;

  return !!find(permissions, (p) => get(userPermissions, p));
}
