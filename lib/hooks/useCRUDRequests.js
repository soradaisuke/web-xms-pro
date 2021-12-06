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

function useCreateRequest(serviceConfig, useRequestOptions) {
  var service;
  var options = (0, _lodash.merge)({
    formatResult: function formatResult(response) {
      return response.data;
    }
  }, useRequestOptions);

  if ((0, _lodash.isString)(serviceConfig)) {
    service = function service(values) {
      return (0, _request.request)(serviceConfig, {
        data: values,
        method: 'post'
      });
    };
  } else if ((0, _lodash.isPlainObject)(serviceConfig)) {
    var _serviceConfig$reques;

    service = (_serviceConfig$reques = serviceConfig.requestService) !== null && _serviceConfig$reques !== void 0 ? _serviceConfig$reques : function (values) {
      return (0, _request.request)(serviceConfig.requestPath, (0, _lodash.merge)({
        data: values,
        method: 'post'
      }, serviceConfig.requestOptions));
    };
    (0, _lodash.merge)(options, serviceConfig.useRequestOptions);
  }

  return (0, _request.useRequest)(service, options);
}

function useUpdateRequest(serviceConfig, useRequestOptions) {
  var service;
  var options = (0, _lodash.merge)({
    formatResult: function formatResult(response) {
      return response.data;
    }
  }, useRequestOptions);

  if ((0, _lodash.isString)(serviceConfig)) {
    service = function service(values, id) {
      return (0, _request.request)("".concat(serviceConfig).concat(id ? "/".concat(id) : ''), {
        data: values,
        method: 'put'
      });
    };
  } else if ((0, _lodash.isPlainObject)(serviceConfig)) {
    var _serviceConfig$reques2;

    service = (_serviceConfig$reques2 = serviceConfig.requestService) !== null && _serviceConfig$reques2 !== void 0 ? _serviceConfig$reques2 : function (values, id) {
      return (0, _request.request)("".concat(serviceConfig.requestPath).concat(id ? "/".concat(id) : ''), (0, _lodash.merge)({
        data: values,
        method: 'put'
      }, serviceConfig.requestOptions));
    };
    (0, _lodash.merge)(options, serviceConfig.useRequestOptions);
  }

  return (0, _request.useRequest)(service, options);
}

function useDeleteRequest(serviceConfig, useRequestOptions) {
  var service;
  var options = (0, _lodash.merge)({
    formatResult: function formatResult(response) {
      return response.data;
    }
  }, useRequestOptions);

  if ((0, _lodash.isString)(serviceConfig)) {
    service = function service(id) {
      return (0, _request.request)("".concat(serviceConfig).concat(id ? "/".concat(id) : ''), {
        method: 'delete'
      });
    };
  } else if ((0, _lodash.isPlainObject)(serviceConfig)) {
    var _serviceConfig$reques3;

    service = (_serviceConfig$reques3 = serviceConfig.requestService) !== null && _serviceConfig$reques3 !== void 0 ? _serviceConfig$reques3 : function (id) {
      return (0, _request.request)("".concat(serviceConfig.requestPath).concat(id ? "/".concat(id) : ''), (0, _lodash.merge)({
        method: 'delete'
      }, serviceConfig.requestOptions));
    };
    (0, _lodash.merge)(options, serviceConfig.useRequestOptions);
  }

  return (0, _request.useRequest)(service, options);
}

function useRetrieveRequest(serviceConfig, useRequestOptions) {
  var service;
  var options = (0, _lodash.merge)({
    formatResult: function formatResult(response) {
      return response.data;
    }
  }, useRequestOptions);

  if ((0, _lodash.isString)(serviceConfig)) {
    service = function service(page, pagesize, filter, order) {
      return (0, _request.request)(serviceConfig, {
        params: {
          page: page,
          pagesize: pagesize,
          order: order,
          filter: JSON.stringify(filter)
        },
        method: 'get'
      });
    };
  } else if ((0, _lodash.isPlainObject)(serviceConfig)) {
    var _serviceConfig$reques4;

    service = (_serviceConfig$reques4 = serviceConfig.requestService) !== null && _serviceConfig$reques4 !== void 0 ? _serviceConfig$reques4 : function (page, pagesize, filter, order) {
      return (0, _request.request)(serviceConfig.requestPath, (0, _lodash.merge)({
        params: {
          page: page,
          pagesize: pagesize,
          order: order,
          filter: JSON.stringify(filter)
        },
        method: 'get'
      }, serviceConfig.requestOptions));
    };
    (0, _lodash.merge)(options, serviceConfig.useRequestOptions);
  }

  return (0, _request.useRequest)(service, options);
}

function useRetrieveOneRequest(serviceConfig, useRequestOptions) {
  var service;
  var options = (0, _lodash.merge)({
    formatResult: function formatResult(response) {
      return response.data;
    }
  }, useRequestOptions);

  if ((0, _lodash.isString)(serviceConfig)) {
    service = function service(params) {
      return (0, _request.request)(serviceConfig, {
        params: params,
        method: 'get'
      });
    };
  } else if ((0, _lodash.isPlainObject)(serviceConfig)) {
    service = function service(params) {
      return (0, _request.request)(serviceConfig.requestPath, (0, _lodash.merge)({
        params: params,
        method: 'get'
      }, serviceConfig.requestOptions));
    };

    (0, _lodash.merge)(options, serviceConfig.useRequestOptions);
  }

  return (0, _request.useRequest)(service, options);
}