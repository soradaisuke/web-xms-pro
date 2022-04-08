import { PropsWithChildren } from 'react';
import { TransferProps } from 'antd';
import { DragTableProps } from '@ant-design/pro-table';
import { ParamsType } from '@ant-design/pro-provider';
import { TransferItem } from 'antd/lib/transfer';
export declare type TableTransferItem = Omit<TransferItem, 'key'> & Required<Pick<TransferItem, 'key'>>;
export declare type TableTransferProps<T extends TableTransferItem = TableTransferItem, U = ParamsType> = Omit<TransferProps<T>, 'dataSource'> & Partial<Pick<TransferProps<T>, 'dataSource'>> & {
    leftTableProps?: DragTableProps<T, U>;
    rightTableProps?: DragTableProps<T, U>;
    tableProps?: DragTableProps<T, U>;
    preserve?: boolean;
    initialTargetDataSource?: TransferProps<T>['dataSource'];
    initialTargetKeys?: TransferProps<T>['targetKeys'];
};
declare function TableTransfer<T extends TableTransferItem = TableTransferItem, U = ParamsType>({ preserve, tableProps, leftTableProps, rightTableProps, dataSource, targetKeys, onChange, initialTargetDataSource, initialTargetKeys, ...rest }: PropsWithChildren<TableTransferProps<T, U>>): JSX.Element;
declare namespace TableTransfer {
    var defaultProps: {
        leftTableProps: any;
        rightTableProps: any;
        tableProps: any;
        preserve: any;
        initialTargetDataSource: any;
        initialTargetKeys: any;
    };
}
export default TableTransfer;
