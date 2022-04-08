"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _lodash = require("lodash");

var _proTable = _interopRequireWildcard(require("@ant-design/pro-table"));

var _excluded = ["preserve", "tableProps", "leftTableProps", "rightTableProps", "dataSource", "targetKeys", "onChange", "initialTargetDataSource", "initialTargetKeys"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var defaultTableProps = {
  search: false,
  toolBarRender: false
};

function TableTransfer(_ref) {
  var preserve = _ref.preserve,
      tableProps = _ref.tableProps,
      leftTableProps = _ref.leftTableProps,
      rightTableProps = _ref.rightTableProps,
      dataSource = _ref.dataSource,
      targetKeys = _ref.targetKeys,
      onChange = _ref.onChange,
      initialTargetDataSource = _ref.initialTargetDataSource,
      initialTargetKeys = _ref.initialTargetKeys,
      rest = _objectWithoutProperties(_ref, _excluded);

  var leftProps = (0, _react.useMemo)(function () {
    return (0, _lodash.merge)({}, defaultTableProps, tableProps, leftTableProps);
  }, [tableProps, leftTableProps]);
  var rightProps = (0, _react.useMemo)(function () {
    return (0, _lodash.merge)({}, defaultTableProps, tableProps, rightTableProps);
  }, [tableProps, rightTableProps]);

  var _useState = (0, _react.useState)(dataSource || []),
      _useState2 = _slicedToArray(_useState, 2),
      transferDataSource = _useState2[0],
      setDataSource = _useState2[1];

  var _useState3 = (0, _react.useState)(targetKeys || []),
      _useState4 = _slicedToArray(_useState3, 2),
      transferTargetKeys = _useState4[0],
      setTargetKeys = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      totalDataSource = _useState6[0],
      setTotalDataSource = _useState6[1];

  var onTransferChange = (0, _react.useCallback)(function (nextTargetKeys, direction, moveKeys) {
    setTargetKeys(nextTargetKeys);
    onChange === null || onChange === void 0 ? void 0 : onChange(nextTargetKeys, direction, moveKeys);
  }, [onChange]);
  (0, _react.useEffect)(function () {
    setDataSource(dataSource);
  }, [dataSource]);
  (0, _react.useEffect)(function () {
    setTotalDataSource(function (prev) {
      return (0, _lodash.uniqBy)((0, _lodash.concat)(prev, transferDataSource || []), 'key');
    });
  }, [transferDataSource]);
  (0, _react.useEffect)(function () {
    setTotalDataSource(function (prev) {
      return (0, _lodash.uniqBy)((0, _lodash.concat)(prev, initialTargetDataSource || []), 'key');
    });
  }, [initialTargetDataSource]);
  (0, _react.useEffect)(function () {
    onTransferChange(initialTargetKeys);
  }, [initialTargetKeys, onTransferChange]);
  var onDragSortEnd = (0, _react.useCallback)(function (newDataSource) {
    onTransferChange((0, _lodash.map)(newDataSource, function (_ref2) {
      var key = _ref2.key;
      return key;
    }));
  }, [onTransferChange]);
  var getTableDataSource = (0, _react.useCallback)(function (direction, filteredItems) {
    if (direction === 'left') {
      if (preserve || leftTableProps !== null && leftTableProps !== void 0 && leftTableProps.request) {
        return (0, _lodash.map)(transferDataSource, function (item) {
          return _objectSpread(_objectSpread({}, item), {}, {
            disabled: item.disabled || (0, _lodash.includes)(transferTargetKeys, item.key)
          });
        });
      }

      return filteredItems;
    }

    if (leftTableProps !== null && leftTableProps !== void 0 && leftTableProps.request) {
      return (0, _lodash.map)(transferTargetKeys, function (key) {
        return (0, _lodash.find)(totalDataSource, function (item) {
          return key === item.key;
        });
      });
    }

    return filteredItems;
  }, [leftTableProps === null || leftTableProps === void 0 ? void 0 : leftTableProps.request, preserve, transferDataSource, transferTargetKeys, totalDataSource]);
  var renderChildren = (0, _react.useCallback)(function (_ref3) {
    var direction = _ref3.direction,
        filteredItems = _ref3.filteredItems,
        onItemSelectAll = _ref3.onItemSelectAll,
        onItemSelect = _ref3.onItemSelect,
        listSelectedKeys = _ref3.selectedKeys,
        listDisabled = _ref3.disabled;
    var prop = direction === 'left' ? leftProps : rightProps;
    var rowSelection = {
      getCheckboxProps: function getCheckboxProps(item) {
        return {
          disabled: listDisabled || item.disabled
        };
      },
      onSelectAll: function onSelectAll(selected, selectedRows) {
        var treeSelectedKeys = selectedRows.filter(function (item) {
          return !item.disabled;
        }).map(function (_ref4) {
          var key = _ref4.key;
          return key;
        });
        var diffKeys = selected ? (0, _lodash.difference)(treeSelectedKeys, listSelectedKeys) : (0, _lodash.difference)(listSelectedKeys, treeSelectedKeys);
        onItemSelectAll(diffKeys, selected);
      },
      onSelect: function onSelect(_ref5, selected) {
        var key = _ref5.key;
        onItemSelect(key, selected);
      },
      selectedRowKeys: listSelectedKeys
    };
    var defaultProps = {
      rowSelection: rowSelection,
      style: {
        pointerEvents: listDisabled ? 'none' : null
      },
      dataSource: getTableDataSource(direction, filteredItems),
      onRow: function onRow(_ref6) {
        var key = _ref6.key,
            itemDisabled = _ref6.disabled;
        return {
          onClick: function onClick() {
            if (itemDisabled || listDisabled) return;
            onItemSelect(key, !listSelectedKeys.includes(key));
          }
        };
      }
    };

    if (direction === 'right' && prop.dragSortKey) {
      return /*#__PURE__*/_react["default"].createElement(_proTable.DragSortTable, _extends({}, prop, defaultProps, {
        onDragSortEnd: onDragSortEnd
      }));
    }

    if (direction === 'left') {
      defaultProps.onDataSourceChange = function (newDataSource) {
        return setDataSource(newDataSource);
      };
    }

    return /*#__PURE__*/_react["default"].createElement(_proTable["default"], _extends({}, prop, defaultProps));
  }, [getTableDataSource, leftProps, onDragSortEnd, rightProps]);
  return /*#__PURE__*/_react["default"].createElement(_antd.Transfer, _extends({}, rest, {
    dataSource: transferDataSource,
    targetKeys: transferTargetKeys,
    onChange: onTransferChange
  }), renderChildren);
}

TableTransfer.defaultProps = {
  leftTableProps: null,
  rightTableProps: null,
  tableProps: null,
  preserve: null,
  initialTargetDataSource: null,
  initialTargetKeys: null
};
var _default = TableTransfer;
exports["default"] = _default;