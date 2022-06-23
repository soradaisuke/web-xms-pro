"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _useRequest2 = _interopRequireDefault(require("ahooks/lib/useRequest"));

var _generateUri2 = _interopRequireDefault(require("@qt/web-common/lib/generateUri"));

var _isProduction2 = _interopRequireDefault(require("@qt/env/lib/isProduction"));

var _react = require("react");

var _jsCookie = _interopRequireDefault(require("js-cookie"));

var _request = require("../utils/request");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ENTRY_HOST = "//entry".concat(_isProduction2["default"] ? '' : '.staging', ".qingtingfm.com");
var TOKEN_KEY = _isProduction2["default"] ? 'prod_sso_token' : 'stg_sso_token';
var USER_KEY = _isProduction2["default"] ? 'prod_sso_user_id' : 'stg_sso_user_id';

var signin = function signin() {
  var loginUrl = (0, _generateUri2["default"])("".concat(ENTRY_HOST, "/v1/sso/login.html"), {
    return_url: window.location.href
  });
  window.location.replace(loginUrl.href);
};

var useAuthModel = function useAuthModel(authPath) {
  return function () {
    var _useState = (0, _react.useState)(null),
        _useState2 = _slicedToArray(_useState, 2),
        user = _useState2[0],
        setUser = _useState2[1];

    var signout = (0, _react.useCallback)(function () {
      _jsCookie["default"].remove(TOKEN_KEY, {
        domain: '.qingtingfm.com'
      });

      _jsCookie["default"].remove(USER_KEY, {
        domain: '.qingtingfm.com'
      });

      _jsCookie["default"].remove('sso_token', {
        domain: '.qingtingfm.com'
      });

      _jsCookie["default"].remove('sso_user_id', {
        domain: '.qingtingfm.com'
      });

      window.location.replace(window.location.origin);
    }, []);
    var auth = (0, _useRequest2["default"])(function () {
      return _request.request.get(authPath);
    }, {
      manual: true,
      onSuccess: function onSuccess(result) {
        setUser(result);
      }
    });
    return {
      user: user,
      signin: signin,
      signout: signout,
      auth: auth
    };
  };
};

var _default = useAuthModel;
exports["default"] = _default;