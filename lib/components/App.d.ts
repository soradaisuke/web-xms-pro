import React from 'react';
import { ProSettings } from '@ant-design/pro-layout';
import { LayoutProps } from './Layout';
import { Models } from './Provider';
import 'moment/locale/zh-cn';
export declare type AppProps = {
    /** @name 全局配置 */
    settings: ProSettings;
    /** @name pro-layout配置 */
    layoutProps: LayoutProps;
    /** @name 全局models */
    models?: Models;
};
declare const App: React.FC<AppProps>;
export default App;
