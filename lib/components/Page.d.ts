import { ReactNode } from 'react';
import { PageContainerProps } from '@ant-design/pro-layout';
import { TabPaneProps } from 'antd';
import { TableProps } from './Table';
import { DescriptionsProps } from './Descriptions';
import { RouteParams } from '../types/common';
import './Page.less';
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
    error?: Error;
    reload?: () => void;
    title?: PageContainerProps['title'] | ((params: RouteParams) => PageContainerProps['title'] | Promise<PageContainerProps['title']>);
};
declare function Page({ tabList, title, ...rest }: PageProps): JSX.Element;
declare namespace Page {
    var defaultProps: {
        tableProps: any;
        decriptionsProps: any;
        children: any;
        tabList: any[];
        error: any;
        reload: any;
        title: any;
    };
}
export default Page;
