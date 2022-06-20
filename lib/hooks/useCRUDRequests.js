"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCreateRequest = useCreateRequest;
exports.useDeleteRequest = useDeleteRequest;
exports.useRetrieveOneRequest = useRetrieveOneRequest;
exports.useRetrieveRequest = useRetrieveRequest;
exports.useUpdateRequest = useUpdateRequest;

var _omitBy2 = _interopRequireDefault(require("lodash/omitBy"));

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _request = require("../utils/request");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function useCreateRequest(serviceConfig, options, plugins) {
  var service;

  if ((0, _isString2["default"])(serviceConfig)) {
    service = function service(values) {
      return (0, _request.request)(serviceConfig, {
        data: values,
        method: 'post'
      });
    };
  } else if ((0, _isPlainObject2["default"])(serviceConfig)) {
    if ('requestService' in serviceConfig) {
      service = serviceConfig.requestService;
    } else if ('requestPath' in serviceConfig) {
      service = function service(values) {
        return (0, _request.request)(serviceConfig.requestPath, (0, _merge2["default"])({
          data: values,
          method: 'post'
        }, serviceConfig.requestOptions));
      };
    }
  }

  return (0, _request.useRequest)(service, options, plugins);
}

function useUpdateRequest(serviceConfig, options, plugins) {
  var service;

  if ((0, _isString2["default"])(serviceConfig)) {
    service = function service(values, id) {
      return (0, _request.request)("".concat(serviceConfig).concat(id ? "/".concat(id) : ''), {
        data: values,
        method: 'put'
      });
    };
  } else if ((0, _isPlainObject2["default"])(serviceConfig)) {
    if ('requestService' in serviceConfig) {
      service = serviceConfig.requestService;
    } else if ('requestPath' in serviceConfig) {
      service = function service(values, id) {
        return (0, _request.request)("".concat(serviceConfig.requestPath).concat(id ? "/".concat(id) : ''), (0, _merge2["default"])({
          data: values,
          method: 'put'
        }, serviceConfig.requestOptions));
      };
    }
  }

  return (0, _request.useRequest)(service, options, plugins);
}

function useDeleteRequest(serviceConfig, options, plugins) {
  var service;

  if ((0, _isString2["default"])(serviceConfig)) {
    service = function service(id) {
      return (0, _request.request)("".concat(serviceConfig).concat(id ? "/".concat(id) : ''), {
        method: 'delete'
      });
    };
  } else if ((0, _isPlainObject2["default"])(serviceConfig)) {
    if ('requestService' in serviceConfig) {
      service = serviceConfig.requestService;
    } else if ('requestPath' in serviceConfig) {
      service = function service(id) {
        return (0, _request.request)("".concat(serviceConfig.requestPath).concat(id ? "/".concat(id) : ''), (0, _merge2["default"])({
          method: 'delete'
        }, serviceConfig.requestOptions));
      };
    }
  }

  return (0, _request.useRequest)(service, options, plugins);
}

var omit = function omit(object) {
  return (0, _omitBy2["default"])(object, function (v) {
    return v === null || v === undefined || v === '' || Number.isNaN(v);
  });
};

function useRetrieveRequest(serviceConfig, options, plugins) {
  var service;

  if ((0, _isString2["default"])(serviceConfig)) {
    service = function service(page, pagesize, filter, order) {
      return (0, _request.request)(serviceConfig, {
        params: omit({
          page: page,
          pagesize: pagesize,
          order: order,
          filter: JSON.stringify(omit(filter))
        }),
        method: 'get'
      });
    };
  } else if ((0, _isPlainObject2["default"])(serviceConfig)) {
    if ('requestService' in serviceConfig) {
      service = serviceConfig.requestService;
    } else if ('requestPath' in serviceConfig) {
      service = function service(page, pagesize, filter, order) {
        return (0, _request.request)(serviceConfig.requestPath, (0, _merge2["default"])({
          params: omit({
            page: page,
            pagesize: pagesize,
            order: order,
            filter: JSON.stringify(omit(filter))
          }),
          method: 'get'
        }, serviceConfig.requestOptions));
      };
    }
  }

  return (0, _request.useRequest)(service, options, plugins);
}

function useRetrieveOneRequest(serviceConfig, options, plugins) {
  var service;

  if ((0, _isString2["default"])(serviceConfig)) {
    service = function service(params) {
      return (0, _request.request)(serviceConfig, {
        params: params,
        method: 'get'
      });
    };
  } else if ((0, _isPlainObject2["default"])(serviceConfig)) {
    if ('requestService' in serviceConfig) {
      service = serviceConfig.requestService;
    } else if ('requestPath' in serviceConfig) {
      service = function service(params) {
        return (0, _request.request)(serviceConfig.requestPath, (0, _merge2["default"])({
          params: params,
          method: 'get'
        }, serviceConfig.requestOptions));
      };
    }
  }

  return (0, _request.useRequest)(service, options, plugins);
}