import { PageContainer, PageContainerProps } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { Button, Result, TabPaneProps } from 'antd';
import { isFunction, map } from 'lodash';
import React, { ReactNode, useCallback, useMemo } from 'react';
import { Params, useParams } from 'react-router-dom';
import useSyncTabKeyToUrl from '../hooks/useSyncTabKeyToUrl';
import Descriptions, { DescriptionsProps } from './Descriptions';
import List, { ListProps } from './List';
import Table, { TableProps } from './Table';
import './Page.less';

export type ContentConfig = {
  tableProps?: TableProps;
  decriptionsProps?: DescriptionsProps;
  listProps?: ListProps;
};

export type PageProps =
  & Omit<PageContainerProps, 'tabList' | 'title'>
  & ContentConfig
  & {
    children?: ReactNode;
    tabList?: (TabPaneProps & ContentConfig & { key: string })[];
    error?: Error;
    reload?: () => void;
    title?:
      | PageContainerProps['title']
      | ((
        params: Params,
      ) =>
        | PageContainerProps['title']
        | Promise<PageContainerProps['title']>);
  };

function Page({ tabList: propTabList, title, ...rest }: PageProps) {
  const { tabActiveKey, onTabChange } = useSyncTabKeyToUrl(
    'tab_key',
    propTabList?.[0]?.key,
  );
  const matchParams = useParams();

  const getTitle = useMemo<() => Promise<PageContainerProps['title']>>(
    () =>
      async () => {
        if (isFunction(title)) {
          return title(matchParams);
        }
        return title;
      },
    [matchParams, title],
  );

  const { data } = useRequest(getTitle);

  const renderContent = useCallback<(props: PageProps, key?: string) => ReactNode>((props, key) => {
    if (!props) {
      return null;
    }

    const { tableProps, decriptionsProps, listProps, children, error, reload } = props;

    if (error) {
      return (
        <Result
          status="error"
          title={error.message}
          extra={reload
            ? [
              <Button type="primary" key="retry" onClick={() => reload()}>
                重试
              </Button>,
            ]
            : []}
        />
      );
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

    if (listProps) {
      return <List key={key} {...listProps} />;
    }

    return null;
  }, []);

  const tabList = useMemo(() => {
    if (propTabList?.length > 0) {
      return map(propTabList, (tab) => ({
        ...tab,
        children: renderContent(tab, tab.key),
      }));
    }
    return null;
  }, [propTabList, renderContent]);

  const content = useMemo(() => renderContent(rest), [renderContent, rest]);

  return (
    <PageContainer
      {...rest}
      tabList={tabList}
      title={data}
      tabActiveKey={tabActiveKey}
      onTabChange={onTabChange}
    >
      {content}
    </PageContainer>
  );
}

Page.defaultProps = {
  tableProps: null,
  decriptionsProps: null,
  listProps: null,
  children: null,
  tabList: [],
  error: null,
  reload: null,
  title: null,
};

export default Page;
