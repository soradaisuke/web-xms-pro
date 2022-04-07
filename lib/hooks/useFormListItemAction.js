"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useFormListItemAction;

var _List = require("@ant-design/pro-form/es/components/List");

var _lodash = require("lodash");

var _react = require("react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function useFormListItemAction(form) {
  var context = (0, _react.useContext)(_List.FormListContext);
  var setCurrentRowData = (0, _react.useCallback)(function (data) {
    form === null || form === void 0 ? void 0 : form.setFieldsValue((0, _lodash.set)((form === null || form === void 0 ? void 0 : form.getFieldsValue()) || {}, context.listName, _objectSpread(_objectSpread({}, (form === null || form === void 0 ? void 0 : form.getFieldValue(context.listName)) || {}), data || {})));
  }, [context.listName, form]);
  var getCurrentRowData = (0, _react.useCallback)(function () {
    return form === null || form === void 0 ? void 0 : form.getFieldValue(context.listName);
  }, [context.listName, form]);
  return {
    setCurrentRowData: setCurrentRowData,
    getCurrentRowData: getCurrentRowData
  };
}