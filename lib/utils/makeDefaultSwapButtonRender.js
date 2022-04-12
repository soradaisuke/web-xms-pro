"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeDefaultSwapButtonRender;

require("antd/es/tooltip/style");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

var _icons = require("@ant-design/icons");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function makeDefaultSwapButtonRender(defaultUpdateButtonRender) {
  var render = function render() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return defaultUpdateButtonRender(_objectSpread({
      key: 'swap',
      columns: [{
        dataIndex: 'pos',
        title: '序号',
        valueType: 'digit',
        formItemProps: {
          rules: [{
            required: true
          }]
        }
      }],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      trigger: /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
        title: "\u8C03\u5E8F"
      }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
        icon: /*#__PURE__*/_react["default"].createElement(_icons.SwapOutlined, {
          rotate: 90
        }),
        shape: "circle",
        type: "primary"
      }))
    }, config || {}));
  };

  return render;
}