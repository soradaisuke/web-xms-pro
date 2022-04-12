"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getRowKey;

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getRowKey(rowKey, record) {
  if ((0, _isFunction2["default"])(rowKey)) {
    return rowKey(record);
  }

  return rowKey;
}