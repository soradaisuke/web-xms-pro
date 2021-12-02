"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorShowType = void 0;
Object.defineProperty(exports, "UseRequestProvider", {
  enumerable: true,
  get: function get() {
    return _useRequest.UseRequestProvider;
  }
});
exports.extendRequestConfig = extendRequestConfig;
exports.request = void 0;
exports.useRequest = useRequest;

var _umiRequest = require("umi-request");

var _antd = require("antd");

var _useRequest = _interopRequireWildcard(require("@ahooksjs/use-request"));

var _excluded = ["url"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ErrorShowType;
exports.ErrorShowType = ErrorShowType;

(function (ErrorShowType) {
  ErrorShowType[ErrorShowType["SILENT"] = 0] = "SILENT";
  ErrorShowType[ErrorShowType["WARN_MESSAGE"] = 1] = "WARN_MESSAGE";
  ErrorShowType[ErrorShowType["ERROR_MESSAGE"] = 2] = "ERROR_MESSAGE";
  ErrorShowType[ErrorShowType["NOTIFICATION"] = 4] = "NOTIFICATION";
})(ErrorShowType || (exports.ErrorShowType = ErrorShowType = {}));

var defaultErrorAdapter = function defaultErrorAdapter(resData) {
  var errorInfo = {
    success: resData.errcode === 0,
    errorCode: resData.errcode,
    errorMessage: resData.errmsg
  };
  return errorInfo;
};

function makeErrorHandler(errorAdaptor) {
  return function (error) {
    var _error$request, _error$request$option, _errorInfo4;

    if (error !== null && error !== void 0 && (_error$request = error.request) !== null && _error$request !== void 0 && (_error$request$option = _error$request.options) !== null && _error$request$option !== void 0 && _error$request$option.skipErrorHandler) {
      throw error;
    }

    var errorInfo;

    if (error.name === 'ResponseError' && error.data && error.request) {
      var _errorInfo;

      var _ctx = {
        req: error.request,
        res: error.response
      };
      errorInfo = errorAdaptor(error.data, _ctx); // eslint-disable-next-line no-param-reassign

      error.message = ((_errorInfo = errorInfo) === null || _errorInfo === void 0 ? void 0 : _errorInfo.errorMessage) || error.message; // eslint-disable-next-line no-param-reassign

      error.data = errorInfo.data; // eslint-disable-next-line no-param-reassign

      error.info = errorInfo;
    }

    errorInfo = error.info;

    if (errorInfo) {
      var _errorInfo2, _errorInfo3;

      var errorMessage = (_errorInfo2 = errorInfo) === null || _errorInfo2 === void 0 ? void 0 : _errorInfo2.errorMessage;
      var errorCode = (_errorInfo3 = errorInfo) === null || _errorInfo3 === void 0 ? void 0 : _errorInfo3.errorCode; // const errorPage =
      //   requestConfig.errorConfig?.errorPage || DEFAULT_ERROR_PAGE;

      switch ((_errorInfo4 = errorInfo) === null || _errorInfo4 === void 0 ? void 0 : _errorInfo4.showType) {
        case ErrorShowType.SILENT:
          // do nothing
          break;

        case ErrorShowType.WARN_MESSAGE:
          _antd.message.warn(errorMessage);

          break;

        case ErrorShowType.ERROR_MESSAGE:
          _antd.message.error(errorMessage);

          break;

        case ErrorShowType.NOTIFICATION:
          _antd.notification.open({
            description: errorMessage,
            message: errorCode
          });

          break;

        default:
          _antd.message.error(errorMessage);

          break;
      }
    } else {
      _antd.message.error(error.message || 'Request error, please retry.');
    }

    throw error;
  };
}

var request = (0, _umiRequest.extend)({
  credentials: 'include',
  errorHandler: makeErrorHandler(defaultErrorAdapter)
});
exports.request = request;

function useRequest(service) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _useRequest["default"])(service, _objectSpread({
    formatResult: function formatResult(res) {
      return res === null || res === void 0 ? void 0 : res.data;
    },
    requestMethod: function requestMethod(requestOptions) {
      if (typeof requestOptions === 'string') {
        return request(requestOptions);
      }

      if (_typeof(requestOptions) === 'object') {
        var url = requestOptions.url,
            rest = _objectWithoutProperties(requestOptions, _excluded);

        return request(url, rest);
      }

      throw new Error('request options error');
    }
  }, options));
}

function extendRequestConfig(requestOptions) {
  var _requestOptions$error;

  var errorAdaptor = ((_requestOptions$error = requestOptions.errorConfig) === null || _requestOptions$error === void 0 ? void 0 : _requestOptions$error.adaptor) || defaultErrorAdapter;
  request.extendOptions(_objectSpread({
    errorHandler: makeErrorHandler(errorAdaptor)
  }, requestOptions)); // 中间件统一错误处理
  // 后端返回格式 { success: boolean, data: any }
  // 按照项目具体情况修改该部分逻辑

  request.use( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
      var _req$options;

      var req, res, options, getResponse, resData, errorInfo, _error;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return next();

            case 2:
              req = ctx.req, res = ctx.res;

              if (!((_req$options = req.options) !== null && _req$options !== void 0 && _req$options.skipErrorHandler)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return");

            case 5:
              options = req.options;
              getResponse = options.getResponse;
              resData = getResponse ? res.data : res;
              errorInfo = errorAdaptor(resData, ctx);

              if (!(errorInfo.success === false)) {
                _context.next = 16;
                break;
              }

              // 抛出错误到 errorHandler 中处理
              _error = new Error(errorInfo.errorMessage);
              _error.name = 'BizError';
              _error.data = resData;
              _error.info = errorInfo;
              _error.response = res;
              throw _error;

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()); // Add user custom middlewares

  var customMiddlewares = requestOptions.middlewares || [];
  customMiddlewares.forEach(function (mw) {
    request.use(mw);
  }); // Add user custom interceptors

  var requestInterceptors = requestOptions.requestInterceptors || [];
  var responseInterceptors = requestOptions.responseInterceptors || [];
  requestInterceptors.map(function (ri) {
    return request.interceptors.request.use(ri);
  });
  responseInterceptors.map(function (ri) {
    return request.interceptors.response.use(ri);
  });
}