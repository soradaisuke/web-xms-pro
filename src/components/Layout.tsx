import React, { useCallback, useMemo } from 'react';
import ProLayout, { BasicLayoutProps } from '@ant-design/pro-layout';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Route as AntRoute } from '@ant-design/pro-layout/lib/typings';
import { concat, filter, map } from 'lodash';
import Account from './Account';
import Page, { PageProps } from './Page';
import { CommonRecord } from '../types/common';
import useUser from '../hooks/useUser';
import { hasPermission } from '../utils';

export type Route = Omit<AntRoute, 'routes'> & {
  /** @name 路由所需用户权限 */
  permissions?: string[] | string;
  /** @name 子路由 */
  routes?: Route[];
  /** @name 页面组件配置 */
  pageContainerProps?: PageProps;
};

export type LayoutProps = Omit<BasicLayoutProps, 'route'> & {
  /** @name 路由配置 */
  route: Route;
};

function validRoute(route: Route, userPermissions: CommonRecord): Route {
  if (!hasPermission(route.permissions, userPermissions)) {
    return null;
  }

  return {
    ...route,
    routes: filter<Route>(
      route.routes,
      (r) => !!validRoute(r, userPermissions)
    ),
  };
}

function renderRoutes(props: Route) {
  if (!props) {
    return null;
  }

  const { routes, path, pageContainerProps = {} } = props;
  const children = [];

  if (path && pageContainerProps) {
    children.push(
      <Route
        key={path}
        path={path}
        element={<Page key={path} {...pageContainerProps} />}
      />
    );
  }

  return concat(
    children,
    map(routes, (r) => renderRoutes(r))
  );
}

function Layout({ route, title, ...rest }: LayoutProps) {
  const location = useLocation();
  const user = useUser();
  const newRoute = useMemo(
    () => (user ? validRoute(route, user.permissions) : null),
    [route, user]
  );

  const menuHeaderRender = useCallback(
    (logo) => (
      <>
        {logo}
        <span style={{ color: 'white', marginLeft: 5 }}>蜻蜓FM</span>
      </>
    ),
    []
  );
  const menuItemRender = useCallback(
    (item, dom) => <Link to={item.path}>{dom}</Link>,
    []
  );
  const waterMarkProps = useMemo(
    () => ({
      content: `蜻蜓FM${user ? ` ${user.nickname} ${user.phone}` : ''}`,
    }),
    [user]
  );
  const headerContentRender = useCallback(
    () => <span style={{ fontWeight: 600, fontSize: '25px' }}>{title}</span>,
    [title]
  );
  const rightContentRender = useCallback(() => <Account />, []);

  return (
    <div
      id="xms-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        logo="https://sss.qtfm.cn/favicon.ico"
        menuHeaderRender={menuHeaderRender}
        {...rest}
        route={newRoute}
        location={location}
        menuItemRender={menuItemRender}
        waterMarkProps={waterMarkProps}
        headerContentRender={headerContentRender}
        rightContentRender={rightContentRender}
      >
        <Routes>{renderRoutes(newRoute)}</Routes>
      </ProLayout>
    </div>
  );
}

export default Layout;
