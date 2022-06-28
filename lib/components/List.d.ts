/// <reference types="react" />
import { ProListProps } from '@ant-design/pro-list';
import { ParamsType } from '@ant-design/pro-provider';
import { CommonRecord } from '../types/common';
import { TableProps } from './Table';
import { XMSListMetas } from '../types';
export declare type ListProps<T = CommonRecord, U = ParamsType> = Omit<ProListProps<T, U>, 'metas' | 'toolBarRender' | 'params'> & Pick<TableProps, 'requestConfig' | 'rowKey' | 'params' | 'toolBarRender'> & {
    metas: XMSListMetas;
};
declare function List<T = CommonRecord, U = ParamsType>({ rowKey, requestConfig, metas, toolBarRender, search, params, form, formRef: propsFormRef, actionRef: propsActionRef, ...rest }: ListProps<T, U>): JSX.Element;
export default List;
