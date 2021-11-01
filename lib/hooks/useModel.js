"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useModel;

var _react = require("react");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _XmsContext = _interopRequireDefault(require("../contexts/XmsContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useModel(namespace, // eslint-disable-next-line @typescript-eslint/no-explicit-any
updater) {
  var dispatcher = (0, _react.useContext)(_XmsContext["default"]);
  var updaterRef = (0, _react.useRef)(updater);
  updaterRef.current = updater;

  var _useState = (0, _react.useState)(function () {
    return updaterRef.current ? updaterRef.current(dispatcher.data[namespace]) : dispatcher.data[namespace];
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var stateRef = (0, _react.useRef)(state);
  stateRef.current = state;
  var isMount = (0, _react.useRef)(false);
  (0, _react.useEffect)(function () {
    isMount.current = true;
    return function () {
      isMount.current = false;
    };
  }, []);
  (0, _react.useEffect)(function () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var handler = function handler(e) {
      if (!isMount.current) {
        // 如果 handler 执行过程中，组件被卸载了，则强制更新全局 data
        setTimeout(function () {
          dispatcher.data[namespace] = e;
          dispatcher.update(namespace);
        });
      } else if (updater && updaterRef.current) {
        var currentState = updaterRef.current(e);
        var previousState = stateRef.current;

        if (!(0, _fastDeepEqual["default"])(currentState, previousState)) {
          setState(currentState);
        }
      } else {
        setState(e);
      }
    };

    try {
      dispatcher.callbacks[namespace].add(handler);
      dispatcher.update(namespace);
    } catch (e) {
      dispatcher.callbacks[namespace] = new Set();
      dispatcher.callbacks[namespace].add(handler);
      dispatcher.update(namespace);
    }

    return function () {
      dispatcher.callbacks[namespace]["delete"](handler);
    };
  }, [namespace, dispatcher, updater]);
  return state;
}