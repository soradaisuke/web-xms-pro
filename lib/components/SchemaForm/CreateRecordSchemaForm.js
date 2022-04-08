"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _icons = require("@ant-design/icons");

var _reactRouterDom = require("react-router-dom");

var _lodash = require("lodash");

var _RecordSchemaForm = _interopRequireDefault(require("./RecordSchemaForm"));

var _useTableCRUDRequests = require("../../hooks/useTableCRUDRequests");

var _useUser = _interopRequireDefault(require("../../hooks/useUser"));

var _excluded = ["normalizeSubmitValues", "requestConfig", "containerAction"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function CreateRecordSchemaForm(_ref) {
  var normalizeSubmitValues = _ref.normalizeSubmitValues,
      requestConfig = _ref.requestConfig,
      containerAction = _ref.containerAction,
      rest = _objectWithoutProperties(_ref, _excluded);

  var matchParams = (0, _reactRouterDom.useParams)();
  var user = (0, _useUser["default"])();
  var service = (0, _react.useMemo)(function () {
    return (0, _lodash.isFunction)(requestConfig) ? requestConfig(matchParams, user) : requestConfig;
  }, [matchParams, requestConfig, user]);
  var req = (0, _useTableCRUDRequests.useTableCreateRequest)(service, containerAction);
  var onFinish = (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(values) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = req;
              _context.next = 3;
              return normalizeSubmitValues(values, matchParams);

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

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), [matchParams, normalizeSubmitValues, req]);
  return /*#__PURE__*/_react["default"].createElement(_RecordSchemaForm["default"] // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  , _extends({
    trigger: /*#__PURE__*/_react["default"].createElement(_antd.Button, {
      icon: /*#__PURE__*/_react["default"].createElement(_icons.PlusOutlined, null),
      type: "primary"
    }, "\u65B0\u5EFA"),
    layoutType: "ModalForm",
    onFinish: onFinish
  }, rest));
}

CreateRecordSchemaForm.defaultProps = {
  normalizeSubmitValues: function normalizeSubmitValues(v) {
    return v;
  },
  requestConfig: null
};
var _default = CreateRecordSchemaForm;
exports["default"] = _default;