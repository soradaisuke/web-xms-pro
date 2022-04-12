"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = hasPermission;

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _find2 = _interopRequireDefault(require("lodash/find"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function hasPermission(needPermissions, userPermissions) {
  if (!needPermissions || needPermissions.length === 0) {
    return true;
  }

  if (!userPermissions) {
    return false;
  }

  var permissions = (0, _isString2["default"])(needPermissions) ? [needPermissions] : needPermissions;
  return !!(0, _find2["default"])(permissions, function (p) {
    return (0, _get2["default"])(userPermissions, p);
  });
}