"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDescriptionsDeleteRequest = useDescriptionsDeleteRequest;
exports.useDescriptionsRequests = useDescriptionsRequests;
exports.useDescriptionsRetrieveRequest = useDescriptionsRetrieveRequest;
exports.useDescriptionsUpdateRequest = useDescriptionsUpdateRequest;

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _concat2 = _interopRequireDefault(require("lodash/concat"));

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var _useCRUDRequests = require("./useCRUDRequests");

var _excluded = ["update", "delete", "retrieve"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function useDescriptionsUpdateRequest(serviceConfig, action) {
  var _serviceConfig$useReq;

  var updateReq = (0, _useCRUDRequests.useUpdateRequest)(serviceConfig, (0, _merge2["default"])({}, serviceConfig.useRequestOptions, {
    manual: true
  }), (0, _concat2["default"])([], (_serviceConfig$useReq = serviceConfig.useRequestPlugins) !== null && _serviceConfig$useReq !== void 0 ? _serviceConfig$useReq : []));
  return (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(values) {
      var _action$current;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return updateReq.runAsync(values);

            case 3:
              _message2["default"].success('提交成功');

              (_action$current = action.current) === null || _action$current === void 0 ? void 0 : _action$current.reload();
              return _context.abrupt("return", true);

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", false);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), [action, updateReq]);
}

function useDescriptionsDeleteRequest(serviceConfig) {
  var _serviceConfig$useReq2;

  var deleteReq = (0, _useCRUDRequests.useDeleteRequest)(serviceConfig, (0, _merge2["default"])({}, serviceConfig.useRequestOptions, {
    manual: true
  }), (0, _concat2["default"])([], (_serviceConfig$useReq2 = serviceConfig.useRequestPlugins) !== null && _serviceConfig$useReq2 !== void 0 ? _serviceConfig$useReq2 : []));
  var navigate = _reactRouterDom.useNavigate === null || _reactRouterDom.useNavigate === void 0 ? void 0 : (0, _reactRouterDom.useNavigate)();
  var history = _reactRouterDom.useHistory === null || _reactRouterDom.useHistory === void 0 ? void 0 : (0, _reactRouterDom.useHistory)();
  return (0, _react.useCallback)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return deleteReq.runAsync();

          case 3:
            _message2["default"].success('提交成功');

            if (navigate) {
              navigate(-1);
            } else if (history) {
              history.goBack();
            }

            return _context2.abrupt("return", true);

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", false);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  })), [deleteReq, history, navigate]);
}

function useDescriptionsRetrieveRequest(serviceConfig) {
  var _serviceConfig$useReq3;

  var req = (0, _useCRUDRequests.useRetrieveOneRequest)(serviceConfig, (0, _merge2["default"])({}, serviceConfig.useRequestOptions, {
    manual: true
  }), (0, _concat2["default"])([], (_serviceConfig$useReq3 = serviceConfig.useRequestPlugins) !== null && _serviceConfig$useReq3 !== void 0 ? _serviceConfig$useReq3 : []));
  return (0, _react.useCallback)(function (params) {
    return req.runAsync(params).then(function (res) {
      return {
        data: res.data,
        success: true
      };
    });
  }, [req]);
}

function useDescriptionsRequests(requestConfig, matchParams, user, action) {
  var config = (0, _react.useMemo)(function () {
    var cfg = (0, _isFunction2["default"])(requestConfig) ? requestConfig(matchParams, user) : requestConfig;

    if (!cfg) {
      return {};
    }

    if ((0, _isString2["default"])(cfg)) {
      return {
        update: cfg,
        "delete": cfg,
        retrieve: cfg
      };
    }

    var update = cfg.update,
        del = cfg["delete"],
        retrieve = cfg.retrieve,
        rest = _objectWithoutProperties(cfg, _excluded);

    return {
      update: (0, _merge2["default"])({}, rest, update),
      "delete": (0, _merge2["default"])({}, rest, del),
      retrieve: (0, _merge2["default"])({}, rest, retrieve)
    };
  }, [matchParams, requestConfig, user]);
  var update = useDescriptionsUpdateRequest(config.update, action);
  var del = useDescriptionsDeleteRequest(config["delete"]);
  var retrieve = useDescriptionsRetrieveRequest(config.retrieve);
  return {
    update: update,
    "delete": del,
    retrieve: retrieve
  };
}