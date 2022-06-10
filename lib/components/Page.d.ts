import { ReactNode } from 'react';
import { PageContainerProps } from '@ant-design/pro-layout';
import { TabPaneProps } from 'antd';
import { TableProps } from './Table';
import { ListProps } from './List';
import { DescriptionsProps } from './Descriptions';
import { RouteParams } from '../types/common';
import './Page.less';
export declare type ContentConfig = {
    tableProps?: TableProps;
    decriptionsProps?: DescriptionsProps;
    listProps?: ListProps;
};
export declare type PageProps = Omit<PageContainerProps, 'tabList' | 'title'> & ContentConfig & {
    children?: ReactNode;
    tabList?: (TabPaneProps & ContentConfig & {
        key: string;
    })[];
    error?: Error;
    reload?: () => void;
    title?: PageContainerProps['title'] | ((params: RouteParams) => PageContainerProps['title'] | Promise<PageContainerProps['title']>);
};
declare function Page({ tabList, title, ...rest }: PageProps): JSX.Element;
declare namespace Page {
    var defaultProps: {
        tableProps: any;
        decriptionsProps: any;
        listProps: any;
        children: any;
        tabList: any[];
        error: any;
        reload: any;
        title: any;
    };
}
export default Page;
