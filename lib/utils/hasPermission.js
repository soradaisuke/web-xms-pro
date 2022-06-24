"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = hasPermission;

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _find2 = _interopRequireDefault(require("lodash/find"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function hasPermission(permissionConfig, userPermissions) {
  if ((0, _isString2["default"])(permissionConfig)) {
    return permissionConfig ? !!(0, _get2["default"])(userPermissions, permissionConfig) : true;
  }

  if ((0, _isArray2["default"])(permissionConfig)) {
    if (permissionConfig.length === 0) {
      return true;
    }

    if ((0, _isArray2["default"])(permissionConfig[0])) {
      if (permissionConfig[0].length === 0) {
        return true;
      }

      return !(0, _find2["default"])(permissionConfig[0], function (p) {
        return !(0, _get2["default"])(userPermissions, p);
      });
    }

    return !!(0, _find2["default"])(permissionConfig, function (p) {
      return (0, _get2["default"])(userPermissions, p);
    });
  }

  return true;
}