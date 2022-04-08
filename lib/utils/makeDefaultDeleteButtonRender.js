"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeDefaultDeleteButtonRender;

var _icons = require("@ant-design/icons");

var _antd = require("antd");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function makeDefaultDeleteButtonRender(del) {
  var render = function render() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _config$popConfirmPro = config.popConfirmProps,
        popConfirmProps = _config$popConfirmPro === void 0 ? {} : _config$popConfirmPro;
    return /*#__PURE__*/_react["default"].createElement(_antd.Popconfirm, _extends({
      key: "delete",
      title: "\u786E\u5B9A\u5220\u9664\uFF1F",
      onConfirm: del,
      okText: "\u786E\u5B9A",
      cancelText: "\u53D6\u6D88"
    }, popConfirmProps), /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
      title: "\u5220\u9664"
    }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
      danger: true,
      icon: /*#__PURE__*/_react["default"].createElement(_icons.DeleteOutlined, null),
      shape: "circle",
      type: "primary"
    })));
  };

  return render;
}