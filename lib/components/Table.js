"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _proTable = _interopRequireDefault(require("@ant-design/pro-table"));

var _lodash = require("lodash");

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function useMergedToolBarRender(toolBarRender, requestConfig, form, matchParams, user) {
  return (0, _react.useMemo)(function () {
    return toolBarRender ? function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return toolBarRender.apply(void 0, [{
        defaultCreateButtonRender: function defaultCreateButtonRender(config) {
          return /*#__PURE__*/_react["default"].createElement(_CreateRecordSchemaForm["default"], _extends({
            key: "create",
            requestConfig: requestConfig,
            containerAction: args[0]
          }, config));
        },
        form: form,
        matchParams: matchParams,
        user: user
      }].concat(args));
    } : null;
  }, [toolBarRender, form, matchParams, user, requestConfig]);
}

function makeMergedRender(rowKey, render, update, del, requestConfig, user, matchParams) {
  if (!render) {
    return null;
  }

  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var record = args[1];
    var action = args[3];
    var key = (0, _lodash.get)(record, (0, _getRowKey["default"])(rowKey, record));

    var defaultUpdate = function defaultUpdate(values) {
      return update(values, key, action);
    };

    var defaultDelete = function defaultDelete() {
      return del(key, action);
    };

    var defaultUpdateButtonRender = function defaultUpdateButtonRender(config) {
      return /*#__PURE__*/_react["default"].createElement(_UpdateRecordSchemaForm["default"], _extends({
        key: "update",
        rowKey: rowKey,
        record: record,
        containerAction: action,
        requestConfig: requestConfig
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
    return (0, _lodash.mapValues)(values, function (v) {
      if (v === 'true') {
        return true;
      }

      if (v === 'false') {
        return false;
      }

      if ((0, _isNumeric["default"])(v)) {
        return (0, _lodash.toNumber)(v);
      }

      return v;
    });
  }

  return values;
}

var Table = function Table(props) {
  var rowKey = props.rowKey,
      requestConfig = props.requestConfig,
      columns = props.columns,
      toolBarRender = props.toolBarRender,
      search = props.search,
      params = props.params,
      form = props.form;
  var matchParams = (0, _reactRouterDom.useParams)();
  var user = (0, _useUser["default"])();
  var formRef = (0, _react.useRef)();
  var ser = (0, _react.useMemo)(function () {
    return (0, _lodash.isFunction)(requestConfig) ? requestConfig(matchParams, user) : requestConfig;
  }, [matchParams, requestConfig, user]);
  var retrieve = (0, _useTableCRUDRequests.useTableRetrieveRequest)(ser);
  var update = (0, _useTableCRUDRequests.useTableUpdateRequest)(ser);
  var del = (0, _useTableCRUDRequests.useTableDeleteRequest)(ser);
  var newColumns = (0, _react.useMemo)(function () {
    return (0, _lodash.map)(columns, function (col) {
      var link = col.link,
          render = col.render,
          valueType = col.valueType,
          defaultSortOrder = col.defaultSortOrder,
          sortDirections = col.sortDirections;

      var newCol = _objectSpread(_objectSpread({}, col), {}, {
        render: makeMergedRender(rowKey, render, update, del, ser, user, matchParams)
      });

      if (link && !render) {
        newCol.render = (0, _makeLinkRender["default"])(link);
      }

      if (valueType === 'image' || (0, _lodash.get)(col, ['valueType', 'type']) === 'image') {
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
  }, [columns, del, matchParams, rowKey, ser, update, user]);
  var newSearch = (0, _react.useMemo)(function () {
    if ((0, _lodash.isBoolean)(search)) {
      return search;
    }

    if (!(0, _lodash.find)(newColumns, function (c) {
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
        if ((0, _lodash.isFunction)(form === null || form === void 0 ? void 0 : form.syncToUrl)) {
          return form.syncToUrl(defaultSyncToUrl(values, type), type);
        }

        return defaultSyncToUrl(values, type);
      }
    });
  }, [form]);
  var mergedToolBarRender = useMergedToolBarRender(toolBarRender, ser, formRef.current, matchParams, user);
  return /*#__PURE__*/_react["default"].createElement(_proTable["default"], _extends({
    request: retrieve
  }, props, {
    form: newForm,
    formRef: formRef,
    search: newSearch,
    params: (0, _lodash.isFunction)(params) ? params(matchParams) : params,
    toolBarRender: mergedToolBarRender,
    columns: newColumns
  }));
};

var _default = Table;
exports["default"] = _default;