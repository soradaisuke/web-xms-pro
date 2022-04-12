"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/avatar/style");

var _avatar = _interopRequireDefault(require("antd/es/avatar"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

var _react = _interopRequireWildcard(require("react"));

var _icons = require("@ant-design/icons");

var _UserContext = _interopRequireDefault(require("../contexts/UserContext"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Account() {
  var _useContext = (0, _react.useContext)(_UserContext["default"]),
      user = _useContext.user,
      auth = _useContext.auth,
      signin = _useContext.signin,
      signout = _useContext.signout;

  (0, _react.useEffect)(function () {
    auth.run(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (auth.error) {
    return /*#__PURE__*/_react["default"].createElement(_button["default"], {
      onClick: signin,
      icon: /*#__PURE__*/_react["default"].createElement(_icons.LoginOutlined, null)
    });
  }

  if (user) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_avatar["default"], {
      shape: "square",
      size: "small",
      src: user.avatar || 'https://sss.qingting.fm/zhibo/ic-qt-assistant.png',
      icon: /*#__PURE__*/_react["default"].createElement(_icons.UserOutlined, null)
    }), /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        marginLeft: 5,
        marginRight: 5
      }
    }, user.nickname), /*#__PURE__*/_react["default"].createElement(_button["default"], {
      onClick: signout,
      icon: /*#__PURE__*/_react["default"].createElement(_icons.LogoutOutlined, null)
    }));
  }

  return null;
}

var _default = Account;
exports["default"] = _default;