"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeDefaultSwapButtonRender;

var _icons = require("@ant-design/icons");

var _antd = require("antd");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function makeDefaultSwapButtonRender(defaultUpdateButtonRender) {
  return function () {
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
      trigger: /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
        title: "\u8C03\u5E8F"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        icon: /*#__PURE__*/_react["default"].createElement(_icons.SwapOutlined, {
          rotate: 90
        }),
        shape: "circle",
        type: "primary"
      }))
    }, config || {}));
  };
}