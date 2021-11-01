"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _proForm = require("@ant-design/pro-form");

var _lodash = require("lodash");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var RecordSchemaForm = function RecordSchemaForm(props) {
  var layoutType = props.layoutType,
      _props$modalProps = props.modalProps,
      modalProps = _props$modalProps === void 0 ? {} : _props$modalProps,
      columns = props.columns,
      record = props.record;
  var formRef = (0, _react.useRef)();
  var otherProps = (0, _react.useMemo)(function () {
    if (layoutType === 'ModalForm') {
      return {
        modalProps: _objectSpread(_objectSpread({}, modalProps), {}, {
          destroyOnClose: true
        })
      };
    }

    return {};
  }, [layoutType, modalProps]);
  var onVisibleChange = (0, _react.useCallback)(function (visible) {
    if (visible) {
      var _formRef$current;

      (_formRef$current = formRef.current) === null || _formRef$current === void 0 ? void 0 : _formRef$current.resetFields();
    }
  }, []);
  var newColumns = (0, _react.useMemo)(function () {
    function transformColumn(col) {
      var valueType = col.valueType,
          initialValue = col.initialValue,
          renderFormItem = col.renderFormItem,
          formItemProps = col.formItemProps,
          fieldProps = col.fieldProps,
          cols = col.columns;

      var newCol = _objectSpread({}, col);

      if (renderFormItem) {
        newCol.renderFormItem = makeMergedRender(renderFormItem, record);
      }

      if (cols) {
        if ((0, _lodash.isFunction)(cols)) {
          newCol.columns = function (values) {
            return (0, _lodash.map)(cols(values), function (c) {
              return transformColumn(c);
            });
          };
        } else {
          newCol.columns = (0, _lodash.map)(newCol.columns, function (c) {
            return transformColumn(c);
          });
        }
      }

      if (valueType === 'switch') {
        newCol.initialValue = initialValue || false;
      }

      if (valueType === 'formList') {
        newCol.fieldProps = (0, _lodash.merge)({}, formItemProps, fieldProps);
      }

      if (record) {
        newCol = (0, _lodash.omit)(newCol, 'initialValue');
      }

      return newCol;
    }

    return (0, _lodash.map)(columns, function (col) {
      return transformColumn(col);
    });
  }, [columns, record]);
  return /*#__PURE__*/_react["default"].createElement(_proForm.BetaSchemaForm, _extends({}, props, otherProps, {
    columns: newColumns,
    formRef: formRef,
    onVisibleChange: onVisibleChange
  }));
};

var _default = RecordSchemaForm;
exports["default"] = _default;