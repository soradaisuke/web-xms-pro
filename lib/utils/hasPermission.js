"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = hasPermission;

var _lodash = require("lodash");

function hasPermission(needPermissions, userPermissions) {
  if (!needPermissions || needPermissions.length === 0) {
    return true;
  }

  if (!userPermissions) {
    return false;
  }

  var permissions = (0, _lodash.isString)(needPermissions) ? [needPermissions] : needPermissions;
  return !!(0, _lodash.find)(permissions, function (p) {
    return (0, _lodash.get)(userPermissions, p);
  });
}