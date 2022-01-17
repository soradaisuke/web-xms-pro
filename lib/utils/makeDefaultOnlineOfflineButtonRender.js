"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeDefaultOnlineOfflineButtonRender;

var _icons = require("@ant-design/icons");

var _antd = require("antd");

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function makeDefaultOnlineOfflineButtonRender(record, matchParams, update) {
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
        statusKey = _config$statusKey === void 0 ? 'status' : _config$statusKey,
        _config$normalizeSubm = config.normalizeSubmitValues,
        normalizeSubmitValues = _config$normalizeSubm === void 0 ? function (v) {
      return v;
    } : _config$normalizeSubm;
    var status = (0, _lodash.get)(record, statusKey);
    var onConfirm = (0, _react.useCallback)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
    })), [normalizeSubmitValues, statusKey, status, onlineStatus, offlineStatus]);
    return /*#__PURE__*/_react["default"].createElement(_antd.Popconfirm, {
      key: "status",
      title: "\u786E\u5B9A".concat(status === onlineStatus ? offlineText : onlineText, "\uFF1F"),
      onConfirm: onConfirm,
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