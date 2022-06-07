"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mapValues2 = _interopRequireDefault(require("lodash/mapValues"));

var _toNumber2 = _interopRequireDefault(require("lodash/toNumber"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _react = _interopRequireWildcard(require("react"));

var _proTable = _interopRequireDefault(require("@ant-design/pro-table"));

var _reactRouterDom = require("react-router-dom");

var _CreateRecordSchemaForm = _interopRequireDefault(require("./SchemaForm/CreateRecordSchemaForm"));

var _UpdateRecordSchemaForm = _interopRequireDefault(require("./SchemaForm/UpdateRecordSchemaForm"));

var _useTableCRUDRequests = require("../hooks/useTableCRUDRequests");

var _getRowKey = _interopRequireDefault(require("../utils/getRowKey"));

var _makeLinkRender = _interopRequireDefault(require("../utils/makeLinkRender"));

var _makeDefaultOnlineOfflineButtonRender = _interopRequireDefault(require("../utils/makeDefaultOnlineOfflineButtonRender"));

var _makeDefaultDeleteButtonRender = _interopRequireDefault(require("../utils/makeDefaultDeleteButtonRender"));

var _makeDefaultSwapButtonRender = _interopRequireDefault(require("../utils/makeDefaultSwapButtonRender"));

var _useUser = _interopRequireDefault(require("../hooks/useUser"));

var _isNumeric = _interopRequireDefault(require("../utils/isNumeric"));

var _excluded = ["rowKey", "requestConfig", "columns", "toolBarRender", "search", "params", "form"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function useMergedToolBarRender(toolBarRender, create, form, matchParams, user) {
  return (0, _react.useMemo)(function () {
    return toolBarRender ? function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return toolBarRender.apply(void 0, [{
        defaultCreateButtonRender: function defaultCreateButtonRender(config) {
          return /*#__PURE__*/_react["default"].createElement(_CreateRecordSchemaForm["default"], _extends({
            key: "create",
            create: create
          }, config));
        },
        form: form,
        matchParams: matchParams,
        user: user
      }].concat(args));
    } : null;
  }, [toolBarRender, form, matchParams, user, create]);
}

function makeMergedRender(rowKey, render, update, del, user, matchParams) {
  if (!render) {
    return null;
  }

  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var record = args[1];
    var key = (0, _get2["default"])(record, (0, _getRowKey["default"])(rowKey, record));

    var defaultUpdate = function defaultUpdate(values) {
      return update(values, key);
    };

    var defaultDelete = function defaultDelete() {
      return del(key);
    };

    var defaultUpdateButtonRender = function defaultUpdateButtonRender(config) {
      return /*#__PURE__*/_react["default"].createElement(_UpdateRecordSchemaForm["default"], _extends({
        key: "update",
        rowKey: rowKey,
        record: record,
        update: update
      }, config));
    };

    return render.apply(void 0, [{
      user: user,
      update: defaultUpdate,
      defaultUpdateButtonRender: defaultUpdateButtonRender,
      defaultDeleteButtonRender: (0, _makeDefaultDeleteButtonRender["default"])(defaultDelete),
      defaultOnlineOfflineButtonRender: (0, _makeDefaultOnlineOfflineButtonRender["default"])(record, matchParams, defaultUpdate),
      defaultSwapButtonRender: (0, _makeDefaultSwapButtonRender["default"])(defaultUpdateButtonRender)
    }].concat(args));
  };
}

function defaultSyncToUrl(values, type) {
  if (type === 'get') {
    return (0, _mapValues2["default"])(values, function (v) {
      if (v === 'true') {
        return true;
      }

      if (v === 'false') {
        return false;
      }

      if ((0, _isNumeric["default"])(v)) {
        return (0, _toNumber2["default"])(v);
      }

      return v;
    });
  }

  return values;
}

function Table(_ref) {
  var rowKey = _ref.rowKey,
      requestConfig = _ref.requestConfig,
      columns = _ref.columns,
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

  var newColumns = (0, _react.useMemo)(function () {
    return (0, _map2["default"])(columns, function (col) {
      var link = col.link,
          render = col.render,
          valueType = col.valueType,
          defaultSortOrder = col.defaultSortOrder,
          sortDirections = col.sortDirections;

      var newCol = _objectSpread(_objectSpread({}, col), {}, {
        render: makeMergedRender(rowKey, render, update, del, user, matchParams)
      });

      if (link && !render) {
        newCol.render = (0, _makeLinkRender["default"])(link);
      }

      if (valueType === 'image' || (0, _get2["default"])(col, ['valueType', 'type']) === 'image') {
        newCol.hideInSearch = true;
      }

      if (valueType === 'image') {
        newCol.valueType = {
          type: 'image',
          width: 100
        };
      }

      if (sortDirections || defaultSortOrder) {
        newCol.sorter = true;
      }

      return newCol;
    });
  }, [columns, del, matchParams, rowKey, update, user]);
  var newSearch = (0, _react.useMemo)(function () {
    if ((0, _isBoolean2["default"])(search)) {
      return search;
    }

    if (!(0, _find2["default"])(newColumns, function (c) {
      return (c.hideInSearch === false || c.hideInSearch === undefined) && c.valueType !== 'option';
    })) {
      return false;
    }

    return _objectSpread({
      defaultCollapsed: false,
      labelWidth: 'auto'
    }, search || {});
  }, [newColumns, search]);
  var newForm = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread({
      syncToInitialValues: false
    }, form || {}), {}, {
      syncToUrl: function syncToUrl(values, type) {
        if ((0, _isFunction2["default"])(form === null || form === void 0 ? void 0 : form.syncToUrl)) {
          return form.syncToUrl(defaultSyncToUrl(values, type), type);
        }

        return defaultSyncToUrl(values, type);
      }
    });
  }, [form]);
  var mergedToolBarRender = useMergedToolBarRender(toolBarRender, create, formRef.current, matchParams, user);
  return /*#__PURE__*/_react["default"].createElement(_proTable["default"], _extends({
    request: retrieve
  }, rest, {
    rowKey: rowKey,
    form: newForm,
    formRef: formRef,
    search: newSearch,
    params: (0, _isFunction2["default"])(params) ? params(matchParams) : params,
    toolBarRender: mergedToolBarRender,
    columns: newColumns,
    actionRef: actionRef
  }));
}

Table.defaultProps = {
  params: null,
  toolBarRender: null,
  requestConfig: null
};
var _default = Table;
exports["default"] = _default;