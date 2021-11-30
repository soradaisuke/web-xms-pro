"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _proLayout = _interopRequireDefault(require("@ant-design/pro-layout"));

var _reactRouterDom = require("react-router-dom");

var _lodash = require("lodash");

var _Account = _interopRequireDefault(require("./Account"));

var _Page = _interopRequireDefault(require("./Page"));

var _UserContext = _interopRequireDefault(require("../contexts/UserContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function hasPermission(needPermissions, // eslint-disable-next-line @typescript-eslint/no-explicit-any
userPermissions) {
  if (!needPermissions) {
    return true;
  }

  if (!userPermissions) {
    return false;
  }

  var permissions = (0, _lodash.isString)(needPermissions) ? [needPermissions] : needPermissions;

  if ((0, _lodash.isFunction)(permissions) && !permissions(userPermissions) || (0, _lodash.isArray)(permissions) && !(0, _lodash.find)(permissions, function (p) {
    return (0, _lodash.get)(userPermissions, p);
  })) {
    return false;
  }

  return true;
}

function validRoute(route, userPermissions) {
  if (!hasPermission(route.permissions, userPermissions)) {
    return null;
  }

  return _objectSpread(_objectSpread({}, route), {}, {
    routes: (0, _lodash.filter)(route.routes, function (r) {
      return !!validRoute(r, userPermissions);
    })
  });
}

function renderRoutes(props) {
  var routes = props.routes,
      path = props.path,
      _props$pageContainerP = props.pageContainerProps,
      pageContainerProps = _props$pageContainerP === void 0 ? {} : _props$pageContainerP;
  var children = [];

  if (path && pageContainerProps) {
    children.push( /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
      key: path,
      path: path,
      element: /*#__PURE__*/_react["default"].createElement(_Page["default"], _extends({
        key: path
      }, pageContainerProps))
    }));
  }

  return (0, _lodash.concat)(children, (0, _lodash.map)(routes, function (r) {
    return renderRoutes(r);
  }));
}

var Layout = function Layout(props) {
  var route = props.route,
      title = props.title;
  var location = (0, _reactRouterDom.useLocation)();

  var _useContext = (0, _react.useContext)(_UserContext["default"]),
      user = _useContext.user;

  var newRoute = (0, _react.useMemo)(function () {
    return validRoute(route, user === null || user === void 0 ? void 0 : user.permissions);
  }, [route, user]);
  var menuHeaderRender = (0, _react.useCallback)(function (logo) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, logo, /*#__PURE__*/_react["default"].createElement("span", {
      style: {
        color: 'white',
        marginLeft: 5
      }
    }, "\u873B\u8713FM"));
  }, []);
  var menuItemRender = (0, _react.useCallback)(function (item, dom) {
    return /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
      to: item.path
    }, dom);
  }, []);
  var waterMarkProps = (0, _react.useMemo)(function () {
    return {
      content: "\u873B\u8713FM".concat(user ? " ".concat(user.nickname, " ").concat(user.phone) : '')
    };
  }, [user]);
  var headerContentRender = (0, _react.useCallback)(function () {
    return /*#__PURE__*/_react["default"].createElement("span", {
      style: {
        fontWeight: 600,
        fontSize: '25px'
      }
    }, title);
  }, [title]);
  var rightContentRender = (0, _react.useCallback)(function () {
    return /*#__PURE__*/_react["default"].createElement(_Account["default"], null);
  }, []);
  return /*#__PURE__*/_react["default"].createElement("div", {
    id: "xms-pro-layout",
    style: {
      height: '100vh'
    }
  }, /*#__PURE__*/_react["default"].createElement(_proLayout["default"], _extends({
    logo: "https://sss.qtfm.cn/favicon.ico",
    menuHeaderRender: menuHeaderRender
  }, props, {
    route: newRoute,
    location: location,
    menuItemRender: menuItemRender,
    waterMarkProps: waterMarkProps,
    headerContentRender: headerContentRender,
    rightContentRender: rightContentRender
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Routes, null, renderRoutes(newRoute))));
};

var _default = Layout;
exports["default"] = _default;