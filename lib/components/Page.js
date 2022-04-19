"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _useRequest3 = _interopRequireDefault(require("ahooks/lib/useRequest"));

require("antd/es/result/style");

var _result = _interopRequireDefault(require("antd/lib/result"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _react = _interopRequireWildcard(require("react"));

var _proLayout = require("@ant-design/pro-layout");

var _reactRouterDom = require("react-router-dom");

var _Table = _interopRequireDefault(require("./Table"));

var _Descriptions = _interopRequireDefault(require("./Descriptions"));

var _useSyncTabKeyToUrl2 = _interopRequireDefault(require("../hooks/useSyncTabKeyToUrl"));

require("./Page.less");

var _excluded = ["tabList", "title"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function renderContent(props, key) {
  if (!props) {
    return null;
  }

  var tableProps = props.tableProps,
      decriptionsProps = props.decriptionsProps,
      children = props.children,
      error = props.error,
      reload = props.reload;

  if (error) {
    return /*#__PURE__*/_react["default"].createElement(_result["default"], {
      status: "error",
      title: error.message,
      extra: reload ? [/*#__PURE__*/_react["default"].createElement(_button["default"], {
        type: "primary",
        key: "retry",
        onClick: function onClick() {
          return reload();
        }
      }, "\u91CD\u8BD5")] : []
    });
  }

  if (children) {
    return children;
  }

  if (tableProps) {
    return /*#__PURE__*/_react["default"].createElement(_Table["default"], _extends({
      key: key
    }, tableProps));
  }

  if (decriptionsProps) {
    return /*#__PURE__*/_react["default"].createElement(_Descriptions["default"], _extends({
      key: key
    }, decriptionsProps));
  }

  return null;
}

function Page(_ref) {
  var _tabList$;

  var tabList = _ref.tabList,
      title = _ref.title,
      rest = _objectWithoutProperties(_ref, _excluded);

  var _useSyncTabKeyToUrl = (0, _useSyncTabKeyToUrl2["default"])('tab_key', tabList === null || tabList === void 0 ? void 0 : (_tabList$ = tabList[0]) === null || _tabList$ === void 0 ? void 0 : _tabList$.key),
      tabActiveKey = _useSyncTabKeyToUrl.tabActiveKey,
      onTabChange = _useSyncTabKeyToUrl.onTabChange;

  var matchParams = (0, _reactRouterDom.useParams)();
  var getTitle = (0, _react.useMemo)(function () {
    return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(0, _isFunction2["default"])(title)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", title(matchParams));

            case 2:
              return _context.abrupt("return", title);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
  }, [matchParams, title]);

  var _useRequest = (0, _useRequest3["default"])(getTitle),
      data = _useRequest.data;

  return /*#__PURE__*/_react["default"].createElement(_proLayout.PageContainer, _extends({}, rest, {
    title: data,
    tabActiveKey: tabActiveKey,
    onTabChange: onTabChange
  }), renderContent(rest) || renderContent((0, _find2["default"])(tabList, function (tab) {
    return tab.key === tabActiveKey;
  }), tabActiveKey));
}

Page.defaultProps = {
  tableProps: null,
  decriptionsProps: null,
  children: null,
  tabList: [],
  error: null,
  reload: null,
  title: null
};
var _default = Page;
exports["default"] = _default;