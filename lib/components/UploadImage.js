"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/upload/style");

var _upload = _interopRequireDefault(require("antd/es/upload"));

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/es/message"));

var _generateDeviceId2 = _interopRequireDefault(require("@qt/web-common/lib/generateDeviceId"));

var _uploadToUpyun2 = _interopRequireDefault(require("@qt/web-common/lib/uploadToUpyun"));

var _react = _interopRequireWildcard(require("react"));

var _icons = require("@ant-design/icons");

var _antdImgCrop = _interopRequireDefault(require("antd-img-crop"));

var _getImageSizeByFile = _interopRequireDefault(require("../utils/getImageSizeByFile"));

var _useUser = _interopRequireDefault(require("../hooks/useUser"));

var _excluded = ["value", "onChange", "imgCropProps", "beforeUpload", "width", "height"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function UploadImage(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      imgCropProps = _ref.imgCropProps,
      beforeUpload = _ref.beforeUpload,
      width = _ref.width,
      height = _ref.height,
      rest = _objectWithoutProperties(_ref, _excluded);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(value ? [{
    uid: value,
    name: value,
    url: value
  }] : []),
      _useState4 = _slicedToArray(_useState3, 2),
      fileList = _useState4[0],
      setFileList = _useState4[1];

  var user = (0, _useUser["default"])();
  var customRequest = (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(info) {
      var _url;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              setLoading(true);
              _context.next = 4;
              return (0, _uploadToUpyun2["default"])(info.file, {
                ssoToken: user === null || user === void 0 ? void 0 : user.sso_token,
                deviceId: (0, _generateDeviceId2["default"])()
              });

            case 4:
              _url = _context.sent;
              onChange(_url);
              setFileList([{
                uid: _url,
                name: _url,
                url: _url
              }]);
              setLoading(false);
              _context.next = 14;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);

              _message2["default"].error(_context.t0.message || _context.t0 || '上传失败');

              setLoading(false);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 10]]);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), [setLoading, setFileList, onChange, user]);
  var mergedBeforeUpload = (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(file, files) {
      var size;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(width || height)) {
                _context2.next = 10;
                break;
              }

              _context2.next = 3;
              return (0, _getImageSizeByFile["default"])(file);

            case 3:
              size = _context2.sent;

              if (!(width > 0 && size.width !== width)) {
                _context2.next = 7;
                break;
              }

              _message2["default"].error("\u56FE\u7247\u5BBD\u5EA6\u5E94\u4E3A".concat(width, "\uFF0C\u5B9E\u9645\u4E3A").concat(size.width));

              return _context2.abrupt("return", false);

            case 7:
              if (!(height > 0 && size.height !== height)) {
                _context2.next = 10;
                break;
              }

              _message2["default"].error("\u56FE\u7247\u9AD8\u5EA6\u5E94\u4E3A".concat(height, "\uFF0C\u5B9E\u9645\u4E3A").concat(size.height));

              return _context2.abrupt("return", false);

            case 10:
              if (!beforeUpload) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", beforeUpload(file, files));

            case 12:
              return _context2.abrupt("return", true);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2, _x3) {
      return _ref3.apply(this, arguments);
    };
  }(), [beforeUpload, height, width]);
  var onRemove = (0, _react.useCallback)(function () {
    setFileList([]);
    onChange(null);
  }, [onChange]);
  var uploadButton = (0, _react.useMemo)(function () {
    return /*#__PURE__*/_react["default"].createElement("div", null, loading ? /*#__PURE__*/_react["default"].createElement(_icons.LoadingOutlined, null) : /*#__PURE__*/_react["default"].createElement(_icons.PlusOutlined, null), /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        marginTop: 8
      }
    }, "\u4E0A\u4F20"));
  }, [loading]);
  var upload = (0, _react.useMemo)(function () {
    return /*#__PURE__*/_react["default"].createElement(_upload["default"], _extends({
      accept: "image/jpeg, image/png",
      customRequest: customRequest
    }, rest, {
      beforeUpload: mergedBeforeUpload,
      fileList: fileList,
      onRemove: onRemove,
      listType: "picture-card"
    }), fileList && fileList.length ? null : uploadButton);
  }, [customRequest, rest, mergedBeforeUpload, fileList, onRemove, uploadButton]);

  if (imgCropProps) {
    return /*#__PURE__*/_react["default"].createElement(_antdImgCrop["default"], imgCropProps, upload);
  }

  return upload;
}

UploadImage.defaultProps = {
  value: null,
  onChange: null,
  imgCropProps: null,
  width: null,
  height: null
};
var _default = UploadImage;
exports["default"] = _default;