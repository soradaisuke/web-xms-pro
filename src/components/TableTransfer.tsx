import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Transfer, TransferProps } from 'antd';
import { concat, difference, find, includes, map, merge, uniqBy } from 'lodash';
import ProTable, {
  DragSortTable,
  ProTableProps,
  DragTableProps,
} from '@ant-design/pro-table';
import { ParamsType } from '@ant-design/pro-provider';
import { TransferItem } from 'antd/lib/transfer';

export type TableTransferItem = Omit<TransferItem, 'key'> &
  Required<Pick<TransferItem, 'key'>>;

export type TableTransferProps<
  T extends TableTransferItem = TableTransferItem,
  U = ParamsType
> = Omit<TransferProps<T>, 'dataSource'> &
  Partial<Pick<TransferProps<T>, 'dataSource'>> & {
    leftTableProps?: DragTableProps<T, U>;
    rightTableProps?: DragTableProps<T, U>;
    tableProps?: DragTableProps<T, U>;
    preserve?: boolean;
    initialTargetDataSource?: TransferProps<T>['dataSource'];
    initialTargetKeys?: TransferProps<T>['targetKeys'];
  };

const defaultTableProps = {
  search: false,
  toolBarRender: false,
};

function TableTransfer<
  T extends TableTransferItem = TableTransferItem,
  U = ParamsType
>({
  preserve,
  tableProps,
  leftTableProps,
  rightTableProps,
  dataSource,
  targetKeys,
  onChange,
  initialTargetDataSource,
  initialTargetKeys,
  ...rest
}: PropsWithChildren<TableTransferProps<T, U>>) {
  const leftProps = useMemo(
    () => merge({}, defaultTableProps, tableProps, leftTableProps),
    [tableProps, leftTableProps]
  );
  const rightProps = useMemo(
    () => merge({}, defaultTableProps, tableProps, rightTableProps),
    [tableProps, rightTableProps]
  );

  const [transferDataSource, setDataSource] = useState(dataSource || []);
  const [transferTargetKeys, setTargetKeys] = useState(targetKeys || []);
  const [totalDataSource, setTotalDataSource] = useState<T[]>([]);

  const onTransferChange = useCallback(
    (nextTargetKeys, direction?, moveKeys?) => {
      setTargetKeys(nextTargetKeys);
      onChange?.(nextTargetKeys, direction, moveKeys);
    },
    [onChange]
  );

  useEffect(() => {
    setDataSource(dataSource);
  }, [dataSource]);

  useEffect(() => {
    setTotalDataSource((prev) =>
      uniqBy(concat(prev, transferDataSource || []), 'key')
    );
  }, [transferDataSource]);

  useEffect(() => {
    setTotalDataSource((prev) =>
      uniqBy(concat(prev, initialTargetDataSource || []), 'key')
    );
  }, [initialTargetDataSource]);

  useEffect(() => {
    onTransferChange(initialTargetKeys);
  }, [initialTargetKeys, onTransferChange]);

  const onDragSortEnd = useCallback(
    (newDataSource) => {
      onTransferChange(map(newDataSource, ({ key }) => key));
    },
    [onTransferChange]
  );

  const getTableDataSource = useCallback(
    (direction, filteredItems) => {
      if (direction === 'left') {
        if (preserve || leftTableProps?.request) {
          return map(transferDataSource, (item) => ({
            ...item,
            disabled: item.disabled || includes(transferTargetKeys, item.key),
          }));
        }
        return filteredItems;
      }
      if (leftTableProps?.request) {
        return map(transferTargetKeys, (key) =>
          find(totalDataSource, (item) => key === item.key)
        );
      }
      return filteredItems;
    },
    [
      leftTableProps?.request,
      preserve,
      transferDataSource,
      transferTargetKeys,
      totalDataSource,
    ]
  );

  const renderChildren = useCallback(
    ({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const prop = direction === 'left' ? leftProps : rightProps;

      const rowSelection: ProTableProps<T, U>['rowSelection'] = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      const defaultProps: ProTableProps<T, U> = {
        rowSelection,
        style: { pointerEvents: listDisabled ? 'none' : null },
        dataSource: getTableDataSource(direction, filteredItems),
        onRow: ({ key, disabled: itemDisabled }) => ({
          onClick: () => {
            if (itemDisabled || listDisabled) return;
            onItemSelect(key, !listSelectedKeys.includes(key));
          },
        }),
      };

      if (direction === 'right' && prop.dragSortKey) {
        return (
          <DragSortTable<T, U>
            {...prop}
            {...defaultProps}
            onDragSortEnd={onDragSortEnd}
          />
        );
      }

      if (direction === 'left') {
        defaultProps.onDataSourceChange = (newDataSource) =>
          setDataSource(newDataSource);
      }

      return <ProTable<T, U> {...prop} {...defaultProps} />;
    },
    [getTableDataSource, leftProps, onDragSortEnd, rightProps]
  );

  return (
    <Transfer<T>
      {...rest}
      dataSource={transferDataSource}
      targetKeys={transferTargetKeys}
      onChange={onTransferChange}
    >
      {renderChildren}
    </Transfer>
  );
}

TableTransfer.defaultProps = {
  leftTableProps: null,
  rightTableProps: null,
  tableProps: null,
  preserve: null,
  initialTargetDataSource: null,
  initialTargetKeys: null,
};

export default TableTransfer;
