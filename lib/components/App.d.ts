/// <reference types="react" />
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
declare function App({ layoutProps, settings: propSettings, models }: AppProps): JSX.Element;
declare namespace App {
    var defaultProps: {
        models: any[];
    };
}
export default App;
