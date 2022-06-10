"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeMergedRender;

var _get2 = _interopRequireDefault(require("lodash/get"));

var _react = _interopRequireDefault(require("react"));

var _UpdateRecordSchemaForm = _interopRequireDefault(require("../components/SchemaForm/UpdateRecordSchemaForm"));

var _getRowKey = _interopRequireDefault(require("./getRowKey"));

var _makeDefaultDeleteButtonRender = _interopRequireDefault(require("./makeDefaultDeleteButtonRender"));

var _makeDefaultOnlineOfflineButtonRender = _interopRequireDefault(require("./makeDefaultOnlineOfflineButtonRender"));

var _makeDefaultSwapButtonRender = _interopRequireDefault(require("./makeDefaultSwapButtonRender"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function makeMergedRender(rowKey, render, update, del, user, matchParams) {
  if (!render) {
    return null;
  }

  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
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