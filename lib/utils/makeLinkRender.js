"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeLinkRender;

var _antd = require("antd");

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function makeLinkRender(link) {
  return function (dom, record) {
    var url = link(record);

    if ((0, _lodash.startsWith)(url, 'http') || (0, _lodash.startsWith)(url, '//')) {
      return /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        href: url,
        target: "_blank",
        type: "link"
      }, dom);
    }

    return /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
      to: link(record)
    }, dom);
  };
}

;