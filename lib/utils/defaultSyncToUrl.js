"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = defaultSyncToUrl;

var _toNumber2 = _interopRequireDefault(require("lodash/toNumber"));

var _mapValues2 = _interopRequireDefault(require("lodash/mapValues"));

var _isNumeric = _interopRequireDefault(require("./isNumeric"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function defaultSyncToUrl(values, type) {
  if (type === 'get') {
    return (0, _mapValues2["default"])(values, function (v) {
      if (v === 'true') {
        return true;
      }

      if (v === 'false') {
        return false;
      }

      if ((0, _isNumeric["default"])(v)) {
        return (0, _toNumber2["default"])(v);
      }

      return v;
    });
  }

  return values;
}