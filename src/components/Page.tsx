import React, { ReactNode, useMemo } from 'react';
import { PageContainer, PageContainerProps } from '@ant-design/pro-layout';
import { find, isFunction } from 'lodash';
import { TabPaneProps } from 'antd';
import { useParams } from 'react-router-dom';
import useRequest from '@ahooksjs/use-request';
import Table, { TableProps } from './Table';
import Descriptions, { DescriptionsProps } from './Descriptions';
import { RouteParams } from '../types/common';
import useSyncTabKeyToUrl from '../hooks/useSyncTabKeyToUrl';
import './Page.less';

export type ContentConfig = {
  /** @name pro-table配置 */
  tableProps?: TableProps;
  /** @name pro-decriptions配置 */
  decriptionsProps?: DescriptionsProps;
};

export type PageProps = Omit<PageContainerProps, 'tabList' | 'title'> &
  ContentConfig & {
    children?: ReactNode;
    tabList?: (TabPaneProps & ContentConfig & { key: string })[];
    title?:
      | PageContainerProps['title']
      | ((
          params: RouteParams
        ) =>
          | PageContainerProps['title']
          | Promise<PageContainerProps['title']>);
  };

function renderContent(props: PageProps, key?: string): ReactNode {
  if (!props) {
    return null;
  }

  const { tableProps, decriptionsProps, children } = props;

  if (children) {
    return children;
  }

  if (tableProps) {
    return <Table key={key} {...tableProps} />;
  }

  if (decriptionsProps) {
    return <Descriptions key={key} {...decriptionsProps} />;
  }

  return null;
}

const Page: React.FC<PageProps> = function (props) {
  const { tabList = [], title } = props;
  const { tabActiveKey, onTabChange } = useSyncTabKeyToUrl(
    'tab_key',
    tabList?.[0]?.key
  );
  const matchParams = useParams();

  const getTitle = useMemo<() => Promise<PageContainerProps['title']>>(
    () => async () => {
      if (isFunction(title)) {
        return title(matchParams);
      }
      return title;
    },
    [matchParams, title]
  );

  const { data } = useRequest(getTitle);

  return (
    <PageContainer
      style={{ background: '#fff' }}
      {...props}
      title={data}
      tabActiveKey={tabActiveKey}
      onTabChange={onTabChange}
    >
      {renderContent(props) ||
        renderContent(
          find(tabList, (tab) => tab.key === tabActiveKey),
          tabActiveKey
        )}
    </PageContainer>
  );
};

export default Page;
