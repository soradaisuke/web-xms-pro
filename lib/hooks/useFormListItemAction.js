"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useFormListItemAction;

var _set2 = _interopRequireDefault(require("lodash/set"));

var _List = require("@ant-design/pro-form/es/components/List");

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function useFormListItemAction(form) {
  var context = (0, _react.useContext)(_List.FormListContext);
  var setCurrentRowData = (0, _react.useCallback)(function (data) {
    form === null || form === void 0 ? void 0 : form.setFieldsValue((0, _set2["default"])((form === null || form === void 0 ? void 0 : form.getFieldsValue()) || {}, context.listName, _objectSpread(_objectSpread({}, (form === null || form === void 0 ? void 0 : form.getFieldValue(context.listName)) || {}), data || {})));
  }, [context.listName, form]);
  var getCurrentRowData = (0, _react.useCallback)(function () {
    return form === null || form === void 0 ? void 0 : form.getFieldValue(context.listName);
  }, [context.listName, form]);
  return {
    setCurrentRowData: setCurrentRowData,
    getCurrentRowData: getCurrentRowData
  };
}