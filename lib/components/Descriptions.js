"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/result/style");

var _result = _interopRequireDefault(require("antd/lib/result"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _react = _interopRequireWildcard(require("react"));

var _proDescriptions = _interopRequireDefault(require("@ant-design/pro-descriptions"));

var _reactRouterDom = require("react-router-dom");

var _useDescriptionCRUDRequests = require("../hooks/useDescriptionCRUDRequests");

var _UpdateRecordSchemaForm = _interopRequireDefault(require("./SchemaForm/UpdateRecordSchemaForm"));

var _makeLinkRender = _interopRequireDefault(require("../utils/makeLinkRender"));

var _makeDefaultOnlineOfflineButtonRender = _interopRequireDefault(require("../utils/makeDefaultOnlineOfflineButtonRender"));

var _makeDefaultDeleteButtonRender = _interopRequireDefault(require("../utils/makeDefaultDeleteButtonRender"));

var _makeDefaultSwapButtonRender = _interopRequireDefault(require("../utils/makeDefaultSwapButtonRender"));

var _useUser = _interopRequireDefault(require("../hooks/useUser"));

var _excluded = ["requestConfig", "columns"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function makeMergedRender(render, update, del, requestConfig, user, matchParams) {
  if (!render) {
    return null;
  }

  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var record = args[1];
    var action = args[3];

    var defaultUpdate = function defaultUpdate(values) {
      return update(values, action);
    };

    var defaultDelete = del;

    var defaultUpdateButtonRender = function defaultUpdateButtonRender(config) {
      return /*#__PURE__*/_react["default"].createElement(_UpdateRecordSchemaForm["default"], _extends({
        key: "update",
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

function Descriptions(_ref) {
  var requestConfig = _ref.requestConfig,
      columns = _ref.columns,
      rest = _objectWithoutProperties(_ref, _excluded);

  var matchParams = (0, _reactRouterDom.useParams)();
  var user = (0, _useUser["default"])();
  var ref = (0, _react.useRef)();

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      error = _useState2[0],
      setError = _useState2[1];

  var service = (0, _react.useMemo)(function () {
    return (0, _isFunction2["default"])(requestConfig) ? requestConfig(matchParams, user) : requestConfig !== null && requestConfig !== void 0 ? requestConfig : '';
  }, [matchParams, requestConfig, user]);
  var retrieve = (0, _useDescriptionCRUDRequests.useDescriptionsRetrieveRequest)(service);
  var update = (0, _useDescriptionCRUDRequests.useDescriptionsUpdateRequest)(service);
  var del = (0, _useDescriptionCRUDRequests.useDescriptionsDeleteRequest)(service);
  var newColumns = (0, _react.useMemo)(function () {
    return (0, _map2["default"])(columns, function (col) {
      var link = col.link,
          render = col.render,
          valueType = col.valueType;

      var newCol = _objectSpread(_objectSpread({}, col), {}, {
        render: makeMergedRender(render, update, del, service, user, matchParams)
      });

      if (link && !render) {
        newCol.render = (0, _makeLinkRender["default"])(link);
      }

      if (valueType === 'image') {
        newCol.valueType = {
          type: 'image',
          width: 100
        };
      }

      return newCol;
    });
  }, [columns, del, matchParams, service, update, user]);
  var onRequestError = (0, _react.useCallback)(function (e) {
    return setError(e);
  }, []);

  if (error) {
    return /*#__PURE__*/_react["default"].createElement(_result["default"], {
      status: "error",
      title: error.message,
      extra: [/*#__PURE__*/_react["default"].createElement(_button["default"], {
        type: "primary",
        key: "retry",
        onClick: function onClick() {
          var _ref$current;

          return (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.reload();
        }
      }, "\u91CD\u8BD5")]
    });
  }

  return /*#__PURE__*/_react["default"].createElement(_proDescriptions["default"], _extends({
    request: retrieve
  }, rest, {
    actionRef: ref,
    columns: newColumns,
    onRequestError: onRequestError
  }));
}

Descriptions.defaultProps = {
  requestConfig: null
};
var _default = Descriptions;
exports["default"] = _default;