"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _proProvider = _interopRequireDefault(require("@ant-design/pro-provider"));

var _UploadImage = _interopRequireDefault(require("./UploadImage"));

var _UploadFile = _interopRequireDefault(require("./UploadFile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var XmsProProvider = function XmsProProvider(props) {
  var values = (0, _react.useContext)(_proProvider["default"]);
  var children = props.children;
  var value = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread({}, values), {}, {
      valueTypeMap: {
        image: {
          renderFormItem: function renderFormItem(_, renderProps) {
            return /*#__PURE__*/_react["default"].createElement(_UploadImage["default"], renderProps === null || renderProps === void 0 ? void 0 : renderProps.fieldProps);
          }
        },
        file: {
          renderFormItem: function renderFormItem(_, renderProps) {
            return /*#__PURE__*/_react["default"].createElement(_UploadFile["default"], renderProps === null || renderProps === void 0 ? void 0 : renderProps.fieldProps);
          }
        },
        link: {
          render: function render(text, renderProps) {
            var _renderProps$fieldPro, _renderProps$fieldPro2;

            return /*#__PURE__*/_react["default"].createElement("a", {
              href: text,
              target: "_blank",
              rel: "noreferrer"
            }, /*#__PURE__*/_react["default"].createElement("div", {
              style: {
                wordBreak: 'break-all',
                width: (_renderProps$fieldPro = renderProps === null || renderProps === void 0 ? void 0 : (_renderProps$fieldPro2 = renderProps.fieldProps) === null || _renderProps$fieldPro2 === void 0 ? void 0 : _renderProps$fieldPro2.width) !== null && _renderProps$fieldPro !== void 0 ? _renderProps$fieldPro : 200
              }
            }, text));
          },
          renderFormItem: function renderFormItem(_, renderProps) {
            return /*#__PURE__*/_react["default"].createElement(_antd.Input, _extends({
              placeholder: "\u8BF7\u8F93\u5165\u94FE\u63A5"
            }, renderProps === null || renderProps === void 0 ? void 0 : renderProps.fieldProps));
          }
        },
        "boolean": {
          render: function render(text) {
            return /*#__PURE__*/_react["default"].createElement(_antd.Switch, {
              checked: text
            });
          },
          renderFormItem: function renderFormItem(_, renderProps) {
            return /*#__PURE__*/_react["default"].createElement(_antd.Select, _extends({
              options: [{
                label: '是',
                value: true
              }, {
                label: '否',
                value: false
              }]
            }, renderProps === null || renderProps === void 0 ? void 0 : renderProps.fieldProps));
          }
        }
      }
    });
  }, [values]);
  return /*#__PURE__*/_react["default"].createElement(_proProvider["default"].Provider, {
    value: value
  }, children);
};

var _default = XmsProProvider;
exports["default"] = _default;