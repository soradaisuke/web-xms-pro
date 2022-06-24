"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = app;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _request = require("./utils/request");

var _App = _interopRequireDefault(require("./components/App"));

var _UserProvider = _interopRequireDefault(require("./components/UserProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function app(config) {
  var requestConfig = config.requestConfig,
      authRequestConfig = config.authRequestConfig;
  (0, _request.extendRequestConfig)(requestConfig);
  var models = {};

  _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(_UserProvider["default"], {
    requestConfig: authRequestConfig
  }, /*#__PURE__*/_react["default"].createElement(_App["default"], _extends({}, config, {
    models: models
  }))), document.getElementById('root'));
}