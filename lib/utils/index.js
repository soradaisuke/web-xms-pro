"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "extendRequestConfig", {
  enumerable: true,
  get: function get() {
    return _request.extendRequestConfig;
  }
});
Object.defineProperty(exports, "getImageSizeByFile", {
  enumerable: true,
  get: function get() {
    return _getImageSizeByFile["default"];
  }
});
Object.defineProperty(exports, "hasPermission", {
  enumerable: true,
  get: function get() {
    return _hasPermission["default"];
  }
});
Object.defineProperty(exports, "isNumeric", {
  enumerable: true,
  get: function get() {
    return _isNumeric["default"];
  }
});
Object.defineProperty(exports, "request", {
  enumerable: true,
  get: function get() {
    return _request.request;
  }
});
Object.defineProperty(exports, "useRequest", {
  enumerable: true,
  get: function get() {
    return _request.useRequest;
  }
});

var _getImageSizeByFile = _interopRequireDefault(require("./getImageSizeByFile"));

var _isNumeric = _interopRequireDefault(require("./isNumeric"));

var _hasPermission = _interopRequireDefault(require("./hasPermission"));

var _request = require("./request");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }