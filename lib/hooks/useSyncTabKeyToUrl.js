"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useSyncTabKeyToUrl;

var _useParams = require("@umijs/use-params");

var _react = require("react");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useSyncTabKeyToUrl(key, defaultTabKey) {
  var _useUrlSearchParams = (0, _useParams.useUrlSearchParams)(),
      _useUrlSearchParams2 = _slicedToArray(_useUrlSearchParams, 2),
      params = _useUrlSearchParams2[0],
      setParams = _useUrlSearchParams2[1];

  var _useState = (0, _react.useState)(String(params[key] || defaultTabKey)),
      _useState2 = _slicedToArray(_useState, 2),
      tabActiveKey = _useState2[0],
      setTabActiveKey = _useState2[1];

  var onTabChange = (0, _react.useCallback)(function (k) {
    setTabActiveKey(k);
    setParams(_defineProperty({}, key, k));
  }, [key, setParams]);
  return {
    tabActiveKey: tabActiveKey,
    onTabChange: onTabChange
  };
}