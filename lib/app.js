"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = app;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _request = require("./utils/request");

var _App = _interopRequireDefault(require("./components/App"));

var _useAuthModel = _interopRequireDefault(require("./models/useAuthModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function app(config) {
  var requestConfig = config.requestConfig;
  (0, _request.extendRequestConfig)(requestConfig);
  var authPath = requestConfig.authPath;
  var models = {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    user: (0, _useAuthModel["default"])(authPath)
  };

  _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(_App["default"], _extends({}, config, {
    models: models
  })), document.getElementById('root'));
}