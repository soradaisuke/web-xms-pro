"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useUser;

var _react = require("react");

var _UserContext = _interopRequireDefault(require("../contexts/UserContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function useUser() {
  var _useContext = (0, _react.useContext)(_UserContext["default"]),
      user = _useContext.user;

  return user;
}