"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeDefaultOnlineOfflineButtonRender;

require("antd/lib/popconfirm/style");

var _popconfirm = _interopRequireDefault(require("antd/lib/popconfirm"));

require("antd/lib/tooltip/style");

var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _CloudUploadOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/CloudUploadOutlined"));

var _CloudDownloadOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/CloudDownloadOutlined"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function makeDefaultOnlineOfflineButtonRender(record, matchParams, update) {
  var render = function render() {
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
        statusKey = _config$statusKey === void 0 ? 'status' : _config$statusKey,
        _config$normalizeSubm = config.normalizeSubmitValues,
        normalizeSubmitValues = _config$normalizeSubm === void 0 ? function (v) {
      return v;
    } : _config$normalizeSubm;
    var status = (0, _get2["default"])(record, statusKey);

    var onConfirm = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = update;
                _context.next = 3;
                return normalizeSubmitValues(_defineProperty({}, statusKey, status === onlineStatus ? offlineStatus : onlineStatus), matchParams, record);

              case 3:
                _context.t1 = _context.sent;
                return _context.abrupt("return", (0, _context.t0)(_context.t1));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function onConfirm() {
        return _ref.apply(this, arguments);
      };
    }();

    return /*#__PURE__*/_react["default"].createElement(_popconfirm["default"], {
      key: "status",
      title: "\u786E\u5B9A".concat(status === onlineStatus ? offlineText : onlineText, "\uFF1F"),
      onConfirm: onConfirm,
      okText: "\u786E\u5B9A",
      cancelText: "\u53D6\u6D88"
    }, /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
      title: status === onlineStatus ? offlineText : onlineText
    }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
      danger: status === onlineStatus,
      icon: status === onlineStatus ? /*#__PURE__*/_react["default"].createElement(_CloudDownloadOutlined2["default"], null) : /*#__PURE__*/_react["default"].createElement(_CloudUploadOutlined2["default"], null),
      shape: "circle",
      type: "primary"
    })));
  };

  return render;
}