"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTableCreateRequest = useTableCreateRequest;
exports.useTableDeleteRequest = useTableDeleteRequest;
exports.useTableRetrieveRequest = useTableRetrieveRequest;
exports.useTableUpdateRequest = useTableUpdateRequest;

var _antd = require("antd");

var _lodash = require("lodash");

var _react = require("react");

var _useCRUDRequests = require("./useCRUDRequests");

var _excluded = ["current", "pageSize"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function useTableCreateRequest(serviceConfig, action) {
  var createReq = (0, _useCRUDRequests.useCreateRequest)(serviceConfig, {
    manual: true
  });
  return (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(values, a) {
      var _ref2;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return createReq.run(values);

            case 3:
              _antd.message.success('提交成功');

              (_ref2 = a || action) === null || _ref2 === void 0 ? void 0 : _ref2.reload();
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

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(), [action, createReq]);
}

function useTableUpdateRequest(serviceConfig, action) {
  var updateReq = (0, _useCRUDRequests.useUpdateRequest)(serviceConfig, {
    manual: true
  });
  return (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(values, id, a) {
      var _ref4;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return updateReq.run(values, id);

            case 3:
              _antd.message.success('提交成功');

              (_ref4 = a || action) === null || _ref4 === void 0 ? void 0 : _ref4.reload();
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

    return function (_x3, _x4, _x5) {
      return _ref3.apply(this, arguments);
    };
  }(), [action, updateReq]);
}

function useTableDeleteRequest(serviceConfig, action) {
  var deleteReq = (0, _useCRUDRequests.useDeleteRequest)(serviceConfig, {
    manual: true
  });
  return (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, a) {
      var _ref6;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return deleteReq.run(id);

            case 3:
              _antd.message.success('提交成功');

              (_ref6 = a || action) === null || _ref6 === void 0 ? void 0 : _ref6.reload();
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

    return function (_x6, _x7) {
      return _ref5.apply(this, arguments);
    };
  }(), [action, deleteReq]);
}

function useTableRetrieveRequest(serviceConfig) {
  var req = (0, _useCRUDRequests.useRetrieveRequest)(serviceConfig, {
    manual: true,
    formatResult: function formatResult(res) {
      return {
        data: res.data.items,
        total: res.data.total,
        success: true
      };
    }
  });
  return (0, _react.useCallback)(function (params, sort) {
    var current = params.current,
        pageSize = params.pageSize,
        filter = _objectWithoutProperties(params, _excluded);

    var order = (0, _lodash.join)((0, _lodash.map)((0, _lodash.toPairs)(sort), function (s) {
      return "".concat(s[0], " ").concat((0, _lodash.replace)(s[1], 'end', ''));
    }), ',');
    return req.run(current, pageSize, filter, order);
  }, [req]);
}