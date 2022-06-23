import { find, get, isArray, isString } from 'lodash';
import { CommonRecord } from '../types';

type Permission = string;
type OrPermissions = Permission[];
type AndPermissions = Permission[][];

export type PermissionConfig = Permission | OrPermissions | AndPermissions;

export default function hasPermission(
  permissionConfig: PermissionConfig,
  userPermissions: CommonRecord
): boolean {
  if (isString(permissionConfig)) {
    return permissionConfig ? !!get(userPermissions, permissionConfig) : true;
  }

  if (isArray(permissionConfig)) {
    if (permissionConfig.length === 0) {
      return true;
    }
    if (isArray(permissionConfig[0])) {
      if (permissionConfig[0].length === 0) {
        return true;
      }

      return !find(permissionConfig[0], (p) => !get(userPermissions, p));
    }
    return !!find(permissionConfig as OrPermissions, (p) =>
      get(userPermissions, p)
    );
  }

  return true;
}
