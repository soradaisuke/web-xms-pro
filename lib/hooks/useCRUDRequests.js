"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCreateRequest = useCreateRequest;
exports.useDeleteRequest = useDeleteRequest;
exports.useRetrieveOneRequest = useRetrieveOneRequest;
exports.useRetrieveRequest = useRetrieveRequest;
exports.useUpdateRequest = useUpdateRequest;

var _lodash = require("lodash");

var _request = require("../utils/request");

var _excluded = ["current", "pageSize"],
    _excluded2 = ["current", "pageSize"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function useCreateRequest(service) {
  var ser = service;

  if ((0, _lodash.isString)(service)) {
    ser = function ser(values) {
      return (0, _request.request)(service, {
        data: values,
        method: 'post'
      });
    };
  } else if ((0, _lodash.isPlainObject)(service)) {
    ser = function ser(values) {
      return (0, _request.request)(service.requestPath, (0, _lodash.merge)({
        data: values,
        method: 'post'
      }, service.requestOptions));
    };
  }

  return (0, _request.useRequest)(ser, (0, _lodash.merge)( // eslint-disable-next-line @typescript-eslint/no-explicit-any
  service.useRequestOptions, {
    manual: true
  }));
}

function useRetrieveRequest(service) {
  var ser = service;

  if ((0, _lodash.isString)(service)) {
    ser = function ser(params, sort) {
      var current = params.current,
          pageSize = params.pageSize,
          filter = _objectWithoutProperties(params, _excluded);

      var order = (0, _lodash.join)((0, _lodash.map)((0, _lodash.toPairs)(sort), function (s) {
        return "".concat(s[0], " ").concat((0, _lodash.replace)(s[1], 'end', ''));
      }), ',');
      return (0, _request.request)(service, {
        params: {
          page: current,
          pagesize: pageSize,
          filter: JSON.stringify(filter),
          order: order
        },
        method: 'get'
      });
    };
  } else if ((0, _lodash.isPlainObject)(service)) {
    ser = function ser(params, sort) {
      var current = params.current,
          pageSize = params.pageSize,
          filter = _objectWithoutProperties(params, _excluded2);

      var order = (0, _lodash.join)((0, _lodash.map)((0, _lodash.toPairs)(sort), function (s) {
        return "".concat(s[0], " ").concat((0, _lodash.replace)(s[1], 'end', ''));
      }), ',');
      return (0, _request.request)(service.requestPath, (0, _lodash.merge)({
        params: {
          page: current,
          pagesize: pageSize,
          filter: JSON.stringify(filter),
          order: order
        },
        method: 'get'
      }, service.requestOptions));
    };
  }

  return (0, _request.useRequest)(ser, (0, _lodash.merge)({
    formatResult: function formatResult(response) {
      return {
        data: response.data.items,
        success: true,
        total: response.data.total
      };
    }
  }, // eslint-disable-next-line @typescript-eslint/no-explicit-any
  service.useRequestOptions, {
    manual: true
  }));
}

function useRetrieveOneRequest(service) {
  var ser = service;

  if ((0, _lodash.isString)(service)) {
    ser = function ser(params) {
      return (0, _request.request)(service, {
        params: params,
        method: 'get'
      });
    };
  } else if ((0, _lodash.isPlainObject)(service)) {
    ser = function ser(params) {
      return (0, _request.request)(service.requestPath, (0, _lodash.merge)({
        params: params,
        method: 'get'
      }, service.requestOptions));
    };
  }

  return (0, _request.useRequest)(ser, (0, _lodash.merge)({
    formatResult: function formatResult(response) {
      return {
        data: response.data,
        success: true
      };
    }
  }, // eslint-disable-next-line @typescript-eslint/no-explicit-any
  service.useRequestOptions, {
    manual: true
  }));
}

function useUpdateRequest(service) {
  var ser = service;

  if ((0, _lodash.isString)(service)) {
    ser = function ser(values, id) {
      return (0, _request.request)("".concat(service).concat(id ? "/".concat(id) : ''), {
        data: values,
        method: 'put'
      });
    };
  } else if ((0, _lodash.isPlainObject)(service)) {
    ser = function ser(values, id) {
      return (0, _request.request)("".concat(service.requestPath).concat(id ? "/".concat(id) : ''), (0, _lodash.merge)({
        data: values,
        method: 'put'
      }, service.requestOptions));
    };
  }

  return (0, _request.useRequest)(ser, (0, _lodash.merge)( // eslint-disable-next-line @typescript-eslint/no-explicit-any
  service.useRequestOptions, {
    manual: true
  }));
}

function useDeleteRequest(service) {
  var ser = service;

  if ((0, _lodash.isString)(service)) {
    ser = function ser(id) {
      return (0, _request.request)("".concat(service).concat(id ? "/".concat(id) : ''), {
        method: 'delete'
      });
    };
  } else if ((0, _lodash.isPlainObject)(service)) {
    ser = function ser(id) {
      return (0, _request.request)("".concat(service.requestPath).concat(id ? "/".concat(id) : ''), (0, _lodash.merge)({
        method: 'delete'
      }, service.requestOptions));
    };
  }

  return (0, _request.useRequest)(ser, (0, _lodash.merge)( // eslint-disable-next-line @typescript-eslint/no-explicit-any
  service.useRequestOptions, {
    manual: true
  }));
}