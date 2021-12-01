"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _proLayout = require("@ant-design/pro-layout");

var _lodash = require("lodash");

var _reactRouterDom = require("react-router-dom");

var _useRequest2 = _interopRequireDefault(require("@ahooksjs/use-request"));

var _Table = _interopRequireDefault(require("./Table"));

var _Descriptions = _interopRequireDefault(require("./Descriptions"));

var _useSyncTabKeyToUrl2 = _interopRequireDefault(require("../hooks/useSyncTabKeyToUrl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function renderContent(props, key) {
  if (!props) {
    return null;
  }

  var tableProps = props.tableProps,
      decriptionsProps = props.decriptionsProps,
      children = props.children;

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

var Page = function Page(props) {
  var _tabList$;

  var _props$tabList = props.tabList,
      tabList = _props$tabList === void 0 ? [] : _props$tabList,
      title = props.title;

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
              if (!(0, _lodash.isFunction)(title)) {
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

  var _useRequest = (0, _useRequest2["default"])(getTitle),
      data = _useRequest.data;

  return /*#__PURE__*/_react["default"].createElement(_proLayout.PageContainer, _extends({}, props, {
    title: data,
    tabActiveKey: tabActiveKey,
    onTabChange: onTabChange
  }), renderContent(props) || renderContent((0, _lodash.find)(tabList, function (tab) {
    return tab.key === tabActiveKey;
  }), tabActiveKey));
};

var _default = Page;
exports["default"] = _default;