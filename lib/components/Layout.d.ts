/// <reference types="react" />
import { BasicLayoutProps } from '@ant-design/pro-layout';
import { Route as AntRoute } from '@ant-design/pro-layout/lib/typings';
import { PageProps } from './Page';
import { PermissionConfig } from '../utils/hasPermission';
export declare type Route = Omit<AntRoute, 'routes'> & {
    /** @name 路由所需用户权限 */
    permissions?: PermissionConfig;
    /** @name 子路由 */
    routes?: Route[];
    /** @name 页面组件配置 */
    pageContainerProps?: PageProps;
};
export declare type LayoutProps = Omit<BasicLayoutProps, 'route'> & {
    /** @name 路由配置 */
    route: Route;
};
declare function Layout({ route, title, ...rest }: LayoutProps): JSX.Element;
export default Layout;
