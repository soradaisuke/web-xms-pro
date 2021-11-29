"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _proDescriptions = _interopRequireDefault(require("@ant-design/pro-descriptions"));

var _reactRouterDom = require("react-router-dom");

var _lodash = require("lodash");

var _useCRUDRequests = require("../hooks/useCRUDRequests");

var _useDescriptionCRUDRequests = require("../hooks/useDescriptionCRUDRequests");

var _UpdateRecordSchemaForm = _interopRequireDefault(require("./SchemaForm/UpdateRecordSchemaForm"));

var _makeLinkRender = _interopRequireDefault(require("../utils/makeLinkRender"));

var _makeDefaultOnlineOfflineButtonRender = _interopRequireDefault(require("../utils/makeDefaultOnlineOfflineButtonRender"));

var _makeDefaultDeleteButtonRender = _interopRequireDefault(require("../utils/makeDefaultDeleteButtonRender"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function makeMergedRender(render, update, del, requestConfig) {
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
        record: record,
        containerAction: action,
        requestConfig: requestConfig
      }, config));
    };

    return render.apply(void 0, [{
      update: defaultUpdate,
      defaultUpdateButtonRender: defaultUpdateButtonRender,
      defaultDeleteButtonRender: (0, _makeDefaultDeleteButtonRender["default"])(defaultDelete),
      defaultOnlineOfflineButtonRender: (0, _makeDefaultOnlineOfflineButtonRender["default"])(record, defaultUpdate)
    }].concat(args));
  };
}

var Descriptions = function Descriptions(props) {
  var requestConfig = props.requestConfig,
      columns = props.columns;
  var matchParams = (0, _reactRouterDom.useParams)();
  var ser = (0, _react.useMemo)(function () {
    return (0, _lodash.isFunction)(requestConfig) ? requestConfig(matchParams) : requestConfig;
  }, [matchParams, requestConfig]);
  var retrieve = (0, _useCRUDRequests.useRetrieveOneRequest)(ser);
  var update = (0, _useDescriptionCRUDRequests.useDescriptionsUpdateRequest)(ser);
  var del = (0, _useDescriptionCRUDRequests.useDescriptionsDeleteRequest)(ser);
  var newColumns = (0, _react.useMemo)(function () {
    return (0, _lodash.map)(columns, function (col) {
      var link = col.link,
          render = col.render;

      var newCol = _objectSpread(_objectSpread({}, col), {}, {
        render: makeMergedRender(render, update, del, ser)
      });

      if (link && !render) {
        newCol.render = (0, _makeLinkRender["default"])(link);
      }

      return newCol;
    });
  }, [columns, del, ser, update]);
  return /*#__PURE__*/_react["default"].createElement(_proDescriptions["default"], _extends({
    style: {
      padding: '20px',
      background: 'white'
    },
    request: retrieve.run
  }, props, {
    columns: newColumns
  }));
};

var _default = Descriptions;
exports["default"] = _default;