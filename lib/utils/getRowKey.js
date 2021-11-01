"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getRowKey;

var _lodash = require("lodash");

function getRowKey(rowKey, record) {
  if ((0, _lodash.isFunction)(rowKey)) {
    return rowKey(record);
  }

  return rowKey;
}