import React, { useCallback, useContext, useMemo } from 'react';
import ProLayout, { BasicLayoutProps } from '@ant-design/pro-layout';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Route as AntRoute } from '@ant-design/pro-layout/lib/typings';
import {
  concat,
  filter,
  find,
  get,
  isArray,
  isFunction,
  isString,
  map,
} from 'lodash';
import Account from './Account';
import Page, { PageProps } from './Page';
import UserContext from '../contexts/UserContext';
import { CommonRecord } from '../types/common';

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
  route?: Route;
};

function hasPermission(
  needPermissions:
    | string
    | string[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | ((userPermissions: CommonRecord) => boolean),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userPermissions: CommonRecord
): boolean {
  if (!needPermissions) {
    return true;
  }

  if (!userPermissions) {
    return false;
  }

  const permissions = isString(needPermissions)
    ? [needPermissions]
    : needPermissions;

  if (
    (isFunction(permissions) && !permissions(userPermissions)) ||
    (isArray(permissions) && !find(permissions, (p) => get(userPermissions, p)))
  ) {
    return false;
  }

  return true;
}

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

const Layout: React.FC<LayoutProps> = function(props) {
  const { route, title } = props;
  const location = useLocation();
  const { user } = useContext(UserContext);
  const newRoute = useMemo(
    () => validRoute(route, user?.permissions),
    [route, user]
  );

  const menuHeaderRender = useCallback((logo) => (
    <>
      {logo}
      <span style={{ color: 'white', marginLeft: 5 }}>蜻蜓FM</span>
    </>
  ), []);
  const menuItemRender = useCallback((item, dom) => <Link to={item.path}>{dom}</Link>, []);
  const waterMarkProps = useMemo(() => ({
    content: `蜻蜓FM${user ? ` ${user.nickname} ${user.phone}` : ''}`,
  }), [user]);
  const headerContentRender = useCallback(() => (
    <span style={{ fontWeight: 600, fontSize: '25px' }}>{title}</span>
  ), [title]);
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
        {...props}
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
