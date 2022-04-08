import React, { ReactNode, useMemo } from 'react';
import { PageContainer, PageContainerProps } from '@ant-design/pro-layout';
import { find, isFunction } from 'lodash';
import { Result, TabPaneProps } from 'antd';
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
    error?: Error;
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

  const { tableProps, decriptionsProps, children, error } = props;

  if (error) {
    return <Result status="error" title={error.message} />;
  }

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

function Page({ tabList, title, ...rest }: PageProps) {
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
      {...rest}
      title={data}
      tabActiveKey={tabActiveKey}
      onTabChange={onTabChange}
    >
      {renderContent(rest) ||
        renderContent(
          find(tabList, (tab) => tab.key === tabActiveKey),
          tabActiveKey
        )}
    </PageContainer>
  );
}

Page.defaultProps = {
  tableProps: null,
  decriptionsProps: null,
  children: null,
  tabList: [],
  error: null,
  title: null,
};

export default Page;
