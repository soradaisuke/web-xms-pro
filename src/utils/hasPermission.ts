import { find, get, isArray, isPlainObject, isString, keys } from 'lodash';
import { CommonRecord } from '../types';

/**
 * 所需权限配置
 *
 * string为单一权限
 *
 * string[]为满足任意权限
 *
 * Record<string, any>为满足所有权限
 */
export type PermissionConfig = string | string[] | Record<string, any>;

/**
 * 检查用户权限是否满足条件
 * @param permissionConfig 所需权限配置
 * @param userPermissions 用户权限
 * @returns 是否满足条件
 */
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
    return !!find(permissionConfig, (p) => get(userPermissions, p));
  }

  if (isPlainObject(permissionConfig)) {
    const permissions = keys(permissionConfig);
    if (permissions.length === 0) {
      return true;
    }

    return !find(permissions, (p) => !get(userPermissions, p));
  }

  return true;
}
