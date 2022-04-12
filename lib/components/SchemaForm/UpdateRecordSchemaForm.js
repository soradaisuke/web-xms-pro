"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/tooltip/style");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _react = _interopRequireWildcard(require("react"));

var _icons = require("@ant-design/icons");

var _reactRouterDom = require("react-router-dom");

var _RecordSchemaForm = _interopRequireDefault(require("./RecordSchemaForm"));

var _useTableCRUDRequests = require("../../hooks/useTableCRUDRequests");

var _getRowKey = _interopRequireDefault(require("../../utils/getRowKey"));

var _useUser = _interopRequireDefault(require("../../hooks/useUser"));

var _excluded = ["normalizeInitialValues", "normalizeSubmitValues", "requestConfig", "containerAction", "record", "rowKey"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function UpdateRecordSchemaForm(_ref) {
  var normalizeInitialValues = _ref.normalizeInitialValues,
      normalizeSubmitValues = _ref.normalizeSubmitValues,
      requestConfig = _ref.requestConfig,
      containerAction = _ref.containerAction,
      record = _ref.record,
      rowKey = _ref.rowKey,
      rest = _objectWithoutProperties(_ref, _excluded);

  var matchParams = (0, _reactRouterDom.useParams)();
  var user = (0, _useUser["default"])();
  var service = (0, _react.useMemo)(function () {
    return (0, _isFunction2["default"])(requestConfig) ? requestConfig(matchParams, user) : requestConfig;
  }, [matchParams, requestConfig, user]);
  var req = (0, _useTableCRUDRequests.useTableUpdateRequest)(service, containerAction);
  var onFinish = (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(values) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = req;
              _context.next = 3;
              return normalizeSubmitValues(values, matchParams, record);

            case 3:
              _context.t1 = _context.sent;
              _context.t2 = (0, _get2["default"])(record, (0, _getRowKey["default"])(rowKey, record));
              return _context.abrupt("return", (0, _context.t0)(_context.t1, _context.t2));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), [req, normalizeSubmitValues, matchParams, record, rowKey]);
  return /*#__PURE__*/_react["default"].createElement(_RecordSchemaForm["default"] // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  , _extends({
    trigger: /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
      title: "\u7F16\u8F91"
    }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
      icon: /*#__PURE__*/_react["default"].createElement(_icons.EditOutlined, null),
      shape: "circle",
      type: "primary"
    })),
    layoutType: "ModalForm",
    initialValues: normalizeInitialValues(record, matchParams),
    onFinish: onFinish,
    record: record
  }, rest));
}

UpdateRecordSchemaForm.defaultProps = {
  normalizeSubmitValues: function normalizeSubmitValues(v) {
    return v;
  },
  normalizeInitialValues: function normalizeInitialValues(v) {
    return v;
  },
  requestConfig: null
};
var _default = UpdateRecordSchemaForm;
exports["default"] = _default;