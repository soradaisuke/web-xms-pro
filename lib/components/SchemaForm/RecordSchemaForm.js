"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _react = _interopRequireWildcard(require("react"));

var _proForm = require("@ant-design/pro-form");

var _excluded = ["layoutType", "columns", "record"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function makeMergedRender(renderFormItem, record) {
  if (!renderFormItem) {
    return null;
  }

  return function (schema, config, form) {
    return renderFormItem(schema, _objectSpread(_objectSpread({}, config), {}, {
      record: record
    }), form);
  };
}

function RecordSchemaForm(_ref) {
  var layoutType = _ref.layoutType,
      columns = _ref.columns,
      record = _ref.record,
      rest = _objectWithoutProperties(_ref, _excluded);

  var formRef = (0, _react.useRef)();
  var onVisibleChange = (0, _react.useCallback)(function (visible) {
    if (visible) {
      var _formRef$current;

      (_formRef$current = formRef.current) === null || _formRef$current === void 0 ? void 0 : _formRef$current.resetFields();
    }
  }, []);
  var componentProps = (0, _react.useMemo)(function () {
    if (layoutType === 'ModalForm') {
      var _modalProps;

      return {
        onVisibleChange: onVisibleChange,
        modalProps: _objectSpread(_objectSpread({}, (_modalProps = rest.modalProps) !== null && _modalProps !== void 0 ? _modalProps : {}), {}, {
          destroyOnClose: true
        })
      };
    }

    if (layoutType === 'DrawerForm') {
      var _drawerProps;

      return {
        onVisibleChange: onVisibleChange,
        drawerProps: _objectSpread(_objectSpread({}, (_drawerProps = rest.drawerProps) !== null && _drawerProps !== void 0 ? _drawerProps : {}), {}, {
          destroyOnClose: true
        })
      };
    }

    return {};
  }, [layoutType, onVisibleChange, rest]);
  var newColumns = (0, _react.useMemo)(function () {
    function transformColumn(col) {
      var valueType = col.valueType,
          initialValue = col.initialValue,
          renderFormItem = col.renderFormItem,
          cols = col.columns;

      var newCol = _objectSpread({}, col);

      if (renderFormItem) {
        newCol.renderFormItem = makeMergedRender(renderFormItem, record);
      }

      if (cols) {
        if ((0, _isFunction2["default"])(cols)) {
          newCol.columns = function (values) {
            return (0, _map2["default"])(cols(values), function (c) {
              return transformColumn(c);
            });
          };
        } else {
          newCol.columns = (0, _map2["default"])(newCol.columns, function (c) {
            return transformColumn(c);
          });
        }
      }

      if (valueType === 'switch') {
        newCol.initialValue = initialValue || false;
      }

      if (record) {
        newCol = (0, _omit2["default"])(newCol, 'initialValue');
      }

      return newCol;
    }

    return (0, _map2["default"])(columns, function (col) {
      return transformColumn(col);
    });
  }, [columns, record]);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    _react["default"].createElement(_proForm.BetaSchemaForm, _extends({}, rest, componentProps, {
      layoutType: layoutType,
      columns: newColumns,
      formRef: formRef,
      omitNil: false
    }))
  );
}

RecordSchemaForm.defaultProps = {
  record: null
};
var _default = RecordSchemaForm;
exports["default"] = _default;