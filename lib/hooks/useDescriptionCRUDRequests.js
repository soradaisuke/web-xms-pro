"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDescriptionsDeleteRequest = useDescriptionsDeleteRequest;
exports.useDescriptionsRetrieveRequest = useDescriptionsRetrieveRequest;
exports.useDescriptionsUpdateRequest = useDescriptionsUpdateRequest;

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var _useCRUDRequests = require("./useCRUDRequests");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function useDescriptionsUpdateRequest(serviceConfig, action) {
  var updateReq = (0, _useCRUDRequests.useUpdateRequest)(serviceConfig, {
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
              return updateReq.run(values);

            case 3:
              _message2["default"].success('提交成功');

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
  }(), [action, updateReq]);
}

function useDescriptionsDeleteRequest(serviceConfig) {
  var deleteReq = (0, _useCRUDRequests.useDeleteRequest)(serviceConfig, {
    manual: true
  });
  var navigate = (0, _reactRouterDom.useNavigate)();
  return (0, _react.useCallback)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return deleteReq.run();

          case 3:
            _message2["default"].success('提交成功');

            navigate(-1);
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
  })), [deleteReq, navigate]);
}

function useDescriptionsRetrieveRequest(serviceConfig) {
  var req = (0, _useCRUDRequests.useRetrieveOneRequest)(serviceConfig, {
    manual: true,
    formatResult: function formatResult(res) {
      return {
        data: res.data,
        success: true
      };
    }
  });
  return (0, _react.useCallback)(function (params) {
    return req.run(params);
  }, [req]);
}