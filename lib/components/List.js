"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _values2 = _interopRequireDefault(require("lodash/values"));

var _mapValues2 = _interopRequireDefault(require("lodash/mapValues"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _react = _interopRequireWildcard(require("react"));

var _proList = _interopRequireDefault(require("@ant-design/pro-list"));

var _reactRouterDom = require("react-router-dom");

var _useTableCRUDRequests = require("../hooks/useTableCRUDRequests");

var _makeLinkRender = _interopRequireDefault(require("../utils/makeLinkRender"));

var _useUser = _interopRequireDefault(require("../hooks/useUser"));

var _defaultSyncToUrl = _interopRequireDefault(require("../utils/defaultSyncToUrl"));

var _useMergedToolBarRender = _interopRequireDefault(require("../hooks/useMergedToolBarRender"));

var _makeMergedRender = _interopRequireDefault(require("../utils/makeMergedRender"));

var _excluded = ["rowKey", "requestConfig", "metas", "toolBarRender", "search", "params", "form"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function List(_ref) {
  var rowKey = _ref.rowKey,
      requestConfig = _ref.requestConfig,
      metas = _ref.metas,
      toolBarRender = _ref.toolBarRender,
      search = _ref.search,
      params = _ref.params,
      form = _ref.form,
      rest = _objectWithoutProperties(_ref, _excluded);

  var matchParams = (0, _reactRouterDom.useParams)();
  var user = (0, _useUser["default"])();
  var formRef = (0, _react.useRef)();
  var actionRef = (0, _react.useRef)();

  var _useTableRequests = (0, _useTableCRUDRequests.useTableRequests)(requestConfig, matchParams, user, actionRef),
      create = _useTableRequests.create,
      update = _useTableRequests.update,
      del = _useTableRequests["delete"],
      retrieve = _useTableRequests.retrieve;

  var newMetas = (0, _react.useMemo)(function () {
    return (0, _mapValues2["default"])(metas, function (meta) {
      var link = meta.link,
          render = meta.render,
          valueType = meta.valueType;

      var newMeta = _objectSpread(_objectSpread({}, meta), {}, {
        render: (0, _makeMergedRender["default"])(rowKey, render, update, del, user, matchParams)
      });

      if (link && !render) {
        newMeta.render = (0, _makeLinkRender["default"])(link);
      }

      if (valueType === 'image' || (0, _get2["default"])(meta, ['valueType', 'type']) === 'image') {
        newMeta.search = false;
      }

      if (valueType === 'image') {
        newMeta.valueType = {
          type: 'image',
          width: 100
        };
      }

      return newMeta;
    });
  }, [del, matchParams, metas, rowKey, update, user]);
  var newSearch = (0, _react.useMemo)(function () {
    if ((0, _isBoolean2["default"])(search)) {
      return search;
    }

    if (!(0, _find2["default"])((0, _values2["default"])(newMetas), function (c) {
      return c.search !== false && c.valueType !== 'option';
    })) {
      return false;
    }

    return _objectSpread({
      defaultCollapsed: false,
      labelWidth: 'auto'
    }, search || {});
  }, [newMetas, search]);
  var newForm = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread({
      syncToInitialValues: false
    }, form || {}), {}, {
      syncToUrl: function syncToUrl(data, type) {
        if ((0, _isFunction2["default"])(form === null || form === void 0 ? void 0 : form.syncToUrl)) {
          return form.syncToUrl((0, _defaultSyncToUrl["default"])(data, type), type);
        }

        return (0, _defaultSyncToUrl["default"])(data, type);
      }
    });
  }, [form]);
  var mergedToolBarRender = (0, _useMergedToolBarRender["default"])(toolBarRender, create, formRef.current, matchParams, user);
  return /*#__PURE__*/_react["default"].createElement(_proList["default"], _extends({
    request: retrieve
  }, rest, {
    rowKey: rowKey,
    form: newForm,
    formRef: formRef,
    search: newSearch,
    params: (0, _isFunction2["default"])(params) ? params(matchParams) : params,
    toolBarRender: mergedToolBarRender,
    metas: newMetas,
    actionRef: actionRef
  }));
}

var _default = List;
exports["default"] = _default;