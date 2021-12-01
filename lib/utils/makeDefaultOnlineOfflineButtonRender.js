"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeDefaultOnlineOfflineButtonRender;

var _icons = require("@ant-design/icons");

var _antd = require("antd");

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function makeDefaultOnlineOfflineButtonRender(record, update) {
  return function () {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _config$onlineStatus = config.onlineStatus,
        onlineStatus = _config$onlineStatus === void 0 ? 1 : _config$onlineStatus,
        _config$offlineStatus = config.offlineStatus,
        offlineStatus = _config$offlineStatus === void 0 ? 0 : _config$offlineStatus,
        _config$onlineText = config.onlineText,
        onlineText = _config$onlineText === void 0 ? '上线' : _config$onlineText,
        _config$offlineText = config.offlineText,
        offlineText = _config$offlineText === void 0 ? '下线' : _config$offlineText,
        _config$statusKey = config.statusKey,
        statusKey = _config$statusKey === void 0 ? 'status' : _config$statusKey;
    var status = (0, _lodash.get)(record, statusKey);
    return /*#__PURE__*/_react["default"].createElement(_antd.Popconfirm, {
      key: "status",
      title: "\u786E\u5B9A".concat(status === onlineStatus ? offlineText : onlineText, "\uFF1F"),
      onConfirm: function onConfirm() {
        return update(_defineProperty({}, statusKey, status === onlineStatus ? offlineStatus : onlineStatus));
      },
      okText: "\u786E\u5B9A",
      cancelText: "\u53D6\u6D88"
    }, /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
      title: status === onlineStatus ? offlineText : onlineText
    }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
      danger: status === onlineStatus,
      icon: status === onlineStatus ? /*#__PURE__*/_react["default"].createElement(_icons.CloudDownloadOutlined, null) : /*#__PURE__*/_react["default"].createElement(_icons.CloudUploadOutlined, null),
      shape: "circle",
      type: "primary"
    })));
  };
}