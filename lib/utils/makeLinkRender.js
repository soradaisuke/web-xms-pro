"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeLinkRender;

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

require("../styles/link.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function makeLinkRender(link) {
  var render = function render(dom, record) {
    var url = link(record);

    if (!url) {
      return dom;
    }

    if ((0, _includes2["default"])(url, '//')) {
      return /*#__PURE__*/_react["default"].createElement(_button["default"], {
        href: url,
        target: "_blank",
        type: "link",
        style: {
          padding: '0px',
          width: '100%'
        }
      }, dom);
    }

    return /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
      to: url
    }, dom);
  };

  return render;
}