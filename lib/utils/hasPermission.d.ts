import { CommonRecord } from '../types';
declare type Permission = string;
declare type OrPermissions = Permission[];
declare type AndPermissions = Permission[][];
export declare type PermissionConfig = Permission | OrPermissions | AndPermissions;
export default function hasPermission(permissionConfig: PermissionConfig, userPermissions: CommonRecord): boolean;
export {};
