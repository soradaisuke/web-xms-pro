"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTableCreateRequest = useTableCreateRequest;
exports.useTableDeleteRequest = useTableDeleteRequest;
exports.useTableRequests = useTableRequests;
exports.useTableRetrieveRequest = useTableRetrieveRequest;
exports.useTableUpdateRequest = useTableUpdateRequest;

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _toPairs2 = _interopRequireDefault(require("lodash/toPairs"));

var _replace2 = _interopRequireDefault(require("lodash/replace"));

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _join2 = _interopRequireDefault(require("lodash/join"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _concat2 = _interopRequireDefault(require("lodash/concat"));

var _react = require("react");

var _useCRUDRequests = require("./useCRUDRequests");

var _excluded = ["current", "pageSize"],
    _excluded2 = ["create", "update", "delete", "retrieve"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function useTableCreateRequest(serviceConfig, action) {
  var _serviceConfig$useReq, _serviceConfig$useReq2;

  var createReq = (0, _useCRUDRequests.useCreateRequest)(serviceConfig, (0, _merge2["default"])({}, (_serviceConfig$useReq = serviceConfig === null || serviceConfig === void 0 ? void 0 : serviceConfig.useRequestOptions) !== null && _serviceConfig$useReq !== void 0 ? _serviceConfig$useReq : {}, {
    manual: true
  }), (0, _concat2["default"])([], (_serviceConfig$useReq2 = serviceConfig === null || serviceConfig === void 0 ? void 0 : serviceConfig.useRequestPlugins) !== null && _serviceConfig$useReq2 !== void 0 ? _serviceConfig$useReq2 : []));
  return (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(values) {
      var _action$current;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return createReq.runAsync(values);

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
  }(), [action, createReq]);
}

function useTableUpdateRequest(serviceConfig, action) {
  var _serviceConfig$useReq3, _serviceConfig$useReq4;

  var updateReq = (0, _useCRUDRequests.useUpdateRequest)(serviceConfig, (0, _merge2["default"])({}, (_serviceConfig$useReq3 = serviceConfig === null || serviceConfig === void 0 ? void 0 : serviceConfig.useRequestOptions) !== null && _serviceConfig$useReq3 !== void 0 ? _serviceConfig$useReq3 : {}, {
    manual: true
  }), (0, _concat2["default"])([], (_serviceConfig$useReq4 = serviceConfig === null || serviceConfig === void 0 ? void 0 : serviceConfig.useRequestPlugins) !== null && _serviceConfig$useReq4 !== void 0 ? _serviceConfig$useReq4 : []));
  return (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(values, id) {
      var _action$current2;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return updateReq.runAsync(values, id);

            case 3:
              _message2["default"].success('提交成功');

              (_action$current2 = action.current) === null || _action$current2 === void 0 ? void 0 : _action$current2.reload();
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
    }));

    return function (_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }(), [action, updateReq]);
}

function useTableDeleteRequest(serviceConfig, action) {
  var _serviceConfig$useReq5, _serviceConfig$useReq6;

  var deleteReq = (0, _useCRUDRequests.useDeleteRequest)(serviceConfig, (0, _merge2["default"])({}, (_serviceConfig$useReq5 = serviceConfig === null || serviceConfig === void 0 ? void 0 : serviceConfig.useRequestOptions) !== null && _serviceConfig$useReq5 !== void 0 ? _serviceConfig$useReq5 : {}, {
    manual: true
  }), (0, _concat2["default"])([], (_serviceConfig$useReq6 = serviceConfig === null || serviceConfig === void 0 ? void 0 : serviceConfig.useRequestPlugins) !== null && _serviceConfig$useReq6 !== void 0 ? _serviceConfig$useReq6 : []));
  return (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
      var _action$current3;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return deleteReq.runAsync(id);

            case 3:
              _message2["default"].success('提交成功');

              (_action$current3 = action.current) === null || _action$current3 === void 0 ? void 0 : _action$current3.reload();
              return _context3.abrupt("return", true);

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", false);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 8]]);
    }));

    return function (_x4) {
      return _ref3.apply(this, arguments);
    };
  }(), [action, deleteReq]);
}

function useTableRetrieveRequest(serviceConfig) {
  var _serviceConfig$useReq7, _serviceConfig$useReq8;

  var req = (0, _useCRUDRequests.useRetrieveRequest)(serviceConfig, (0, _merge2["default"])({}, (_serviceConfig$useReq7 = serviceConfig === null || serviceConfig === void 0 ? void 0 : serviceConfig.useRequestOptions) !== null && _serviceConfig$useReq7 !== void 0 ? _serviceConfig$useReq7 : {}, {
    manual: true
  }), (0, _concat2["default"])([], (_serviceConfig$useReq8 = serviceConfig === null || serviceConfig === void 0 ? void 0 : serviceConfig.useRequestPlugins) !== null && _serviceConfig$useReq8 !== void 0 ? _serviceConfig$useReq8 : []));
  return (0, _react.useCallback)(function (params, sort) {
    var current = params.current,
        pageSize = params.pageSize,
        filter = _objectWithoutProperties(params, _excluded);

    var order = (0, _join2["default"])((0, _map2["default"])((0, _toPairs2["default"])(sort), function (s) {
      return "".concat(s[0], " ").concat((0, _replace2["default"])(s[1], 'end', ''));
    }), ',');
    return req.runAsync(current, pageSize, filter, order).then(function (res) {
      return {
        data: res.data.items,
        total: res.data.total,
        success: true
      };
    });
  }, [req]);
}

function useTableRequests(requestConfig, matchParams, user, action) {
  var config = (0, _react.useMemo)(function () {
    var cfg = (0, _isFunction2["default"])(requestConfig) ? requestConfig(matchParams, user) : requestConfig;

    if (!cfg) {
      return {};
    }

    if ((0, _isString2["default"])(cfg)) {
      return {
        create: cfg,
        update: cfg,
        "delete": cfg,
        retrieve: cfg
      };
    }

    var create = cfg.create,
        update = cfg.update,
        del = cfg["delete"],
        retrieve = cfg.retrieve,
        rest = _objectWithoutProperties(cfg, _excluded2);

    return {
      create: (0, _merge2["default"])({}, rest, create),
      update: (0, _merge2["default"])({}, rest, update),
      "delete": (0, _merge2["default"])({}, rest, del),
      retrieve: (0, _merge2["default"])({}, rest, retrieve)
    };
  }, [matchParams, requestConfig, user]);
  var create = useTableCreateRequest(config.create, action);
  var update = useTableUpdateRequest(config.update, action);
  var del = useTableDeleteRequest(config["delete"], action);
  var retrieve = useTableRetrieveRequest(config.retrieve);
  return {
    create: config.create ? create : null,
    update: config.update ? update : null,
    "delete": config["delete"] ? del : null,
    retrieve: config.retrieve ? retrieve : null
  };
}