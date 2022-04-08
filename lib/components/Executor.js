"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Executor(_ref) {
  var hook = _ref.hook,
      onUpdate = _ref.onUpdate,
      namespace = _ref.namespace;
  var updateRef = (0, _react.useRef)(onUpdate);
  updateRef.current = onUpdate;
  var initialLoad = (0, _react.useRef)(false); // eslint-disable-next-line @typescript-eslint/no-explicit-any

  var data;

  try {
    data = hook();

    if (process.env.NODE_ENV === 'development' && typeof document !== 'undefined') {
      try {
        var count = Object.keys( // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window.xms_useModel_dev_tool_log || {})[namespace] || {}).length; // eslint-disable-next-line @typescript-eslint/no-explicit-any

        window.xms_useModel_dev_tool = Object.assign( // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.xms_useModel_dev_tool || {}, _defineProperty({}, namespace, data)); // eslint-disable-next-line @typescript-eslint/no-explicit-any

        window.xms_useModel_dev_tool_log = Object.assign( // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.xms_useModel_dev_tool_log || {}, _defineProperty({}, namespace, Object.assign( // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window.xms_useModel_dev_tool_log || {})[namespace] || {}, _defineProperty({}, count, data))));
        window.dispatchEvent(new CustomEvent('xms_useModel_update', {
          detail: {
            namespace: namespace,
            time: Date.now(),
            data: data,
            index: count
          }
        }));
      } catch (e) {// dev tool 记录失败、可能是低版本浏览器，忽略
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("plugin-model: Invoking '".concat(namespace || 'unknown', "' model failed:"), e);
  } // 首次执行时立刻返回初始值


  (0, _react.useMemo)(function () {
    updateRef.current(data);
    initialLoad.current = false;
  }, [data]); // React 16.13 后 update 函数用 useEffect 包裹

  (0, _react.useEffect)(function () {
    if (initialLoad.current) {
      updateRef.current(data);
    } else {
      initialLoad.current = true;
    }
  }); // eslint-disable-next-line react/jsx-no-useless-fragment

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
}

var _default = Executor;
exports["default"] = _default;