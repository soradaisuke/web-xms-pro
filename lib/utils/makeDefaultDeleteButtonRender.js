"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeDefaultDeleteButtonRender;

require("antd/es/popconfirm/style");

var _popconfirm = _interopRequireDefault(require("antd/lib/popconfirm"));

require("antd/es/tooltip/style");

var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _DeleteOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/DeleteOutlined"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function makeDefaultDeleteButtonRender(del) {
  var render = function render() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _config$popConfirmPro = config.popConfirmProps,
        popConfirmProps = _config$popConfirmPro === void 0 ? {} : _config$popConfirmPro;
    return /*#__PURE__*/_react["default"].createElement(_popconfirm["default"], _extends({
      key: "delete",
      title: "\u786E\u5B9A\u5220\u9664\uFF1F",
      onConfirm: del,
      okText: "\u786E\u5B9A",
      cancelText: "\u53D6\u6D88"
    }, popConfirmProps), /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
      title: "\u5220\u9664"
    }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
      danger: true,
      icon: /*#__PURE__*/_react["default"].createElement(_DeleteOutlined2["default"], null),
      shape: "circle",
      type: "primary"
    })));
  };

  return render;
}