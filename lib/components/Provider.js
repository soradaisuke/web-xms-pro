"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _XmsContext = _interopRequireDefault(require("../contexts/XmsContext"));

var _dispatcher = _interopRequireDefault(require("../helpers/dispatcher"));

var _Executor = _interopRequireDefault(require("./Executor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var dispatcher = new _dispatcher["default"](); // eslint-disable-next-line @typescript-eslint/no-explicit-any

var Provider = function Provider(props) {
  var children = props.children,
      models = props.models;
  return /*#__PURE__*/_react["default"].createElement(_XmsContext["default"].Provider, {
    value: dispatcher
  }, Object.entries(models).map(function (pair) {
    return /*#__PURE__*/_react["default"].createElement(_Executor["default"], {
      key: pair[0],
      namespace: pair[0],
      hook: pair[1] // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ,
      onUpdate: function onUpdate(val) {
        var _pair = _slicedToArray(pair, 1),
            ns = _pair[0];

        dispatcher.data[ns] = val;
        dispatcher.update(ns);
      }
    });
  }), children);
};

var _default = Provider;
exports["default"] = _default;