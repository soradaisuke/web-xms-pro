"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UserContext = /*#__PURE__*/_react["default"].createContext({
  user: {},
  auth: null,
  signin: null,
  signout: null
});

var _default = UserContext;
exports["default"] = _default;