"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorShowType = void 0;
exports["default"] = showError;

require("antd/es/notification/style");

var _notification2 = _interopRequireDefault(require("antd/lib/notification"));

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ErrorShowType;
exports.ErrorShowType = ErrorShowType;

(function (ErrorShowType) {
  ErrorShowType[ErrorShowType["SILENT"] = 0] = "SILENT";
  ErrorShowType[ErrorShowType["WARN_MESSAGE"] = 1] = "WARN_MESSAGE";
  ErrorShowType[ErrorShowType["ERROR_MESSAGE"] = 2] = "ERROR_MESSAGE";
  ErrorShowType[ErrorShowType["NOTIFICATION"] = 4] = "NOTIFICATION";
})(ErrorShowType || (exports.ErrorShowType = ErrorShowType = {}));

function showError(error, showType) {
  var _error$message;

  switch (error.showType || showType) {
    case ErrorShowType.SILENT:
      break;

    case ErrorShowType.WARN_MESSAGE:
      _message2["default"].warn(error.message);

      break;

    case ErrorShowType.ERROR_MESSAGE:
      _message2["default"].error(error.message);

      break;

    case ErrorShowType.NOTIFICATION:
      _notification2["default"].open({
        description: error.message,
        message: error.code || error.name,
        // eslint-disable-next-line no-nested-ternary
        duration: (0, _isNumber2["default"])(error.duration) ? error.duration : ((_error$message = error.message) === null || _error$message === void 0 ? void 0 : _error$message.length) > 50 ? 0 : 4.5
      });

      break;

    default:
      _message2["default"].error(error.message || '未知错误');

      break;
  }
}