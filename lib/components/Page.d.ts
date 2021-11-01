import React, { ReactNode } from 'react';
import { PageContainerProps } from '@ant-design/pro-layout';
import { TabPaneProps } from 'antd';
import { TableProps } from './Table';
import { DescriptionsProps } from './Descriptions';
import { RouteParams } from '../types/common';
export declare type ContentConfig = {
    /** @name pro-table配置 */
    tableProps?: TableProps;
    /** @name pro-decriptions配置 */
    decriptionsProps?: DescriptionsProps;
};
export declare type PageProps = Omit<PageContainerProps, 'tabList' | 'title'> & ContentConfig & {
    children?: ReactNode;
    tabList?: (TabPaneProps & ContentConfig & {
        key: string;
    })[];
    title?: PageContainerProps['title'] | ((params: RouteParams) => PageContainerProps['title'] | Promise<PageContainerProps['title']>);
};
declare const Page: React.FC<PageProps>;
export default Page;
