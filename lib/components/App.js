"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _zh_CN = _interopRequireDefault(require("antd/lib/locale-provider/zh_CN"));

var _reactRouterDom = require("react-router-dom");

var _proLayout = require("@ant-design/pro-layout");

var _lodash = require("lodash");

var _proProvider = _interopRequireDefault(require("@ant-design/pro-provider"));

var _Layout = _interopRequireDefault(require("./Layout"));

var _Provider = _interopRequireDefault(require("./Provider"));

var _UploadImage = _interopRequireDefault(require("./UploadImage"));

var _UploadFile = _interopRequireDefault(require("./UploadFile"));

require("moment/locale/zh-cn");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var App = function App(props) {
  var values = (0, _react.useContext)(_proProvider["default"]);
  var layoutProps = props.layoutProps,
      propSettings = props.settings,
      models = props.models;

  var _useState = (0, _react.useState)((0, _lodash.merge)({
    title: '蜻蜓FM',
    menu: {
      autoClose: false
    },
    fixSiderbar: true
  }, propSettings)),
      _useState2 = _slicedToArray(_useState, 2),
      settings = _useState2[0],
      setSetting = _useState2[1];

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
  return /*#__PURE__*/_react["default"].createElement(_antd.ConfigProvider, {
    locale: _zh_CN["default"]
  }, /*#__PURE__*/_react["default"].createElement(_proProvider["default"].Provider, {
    value: value
  }, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react["default"].createElement(_Provider["default"], {
    models: models
  }, /*#__PURE__*/_react["default"].createElement(_Layout["default"], _extends({}, layoutProps, settings))), /*#__PURE__*/_react["default"].createElement(_proLayout.SettingDrawer, {
    getContainer: function getContainer() {
      return document.getElementById('xms-pro-layout');
    },
    settings: settings,
    onSettingChange: function onSettingChange(changeSetting) {
      setSetting(changeSetting);
    },
    disableUrlParams: true
  }))));
};

var _default = App;
exports["default"] = _default;