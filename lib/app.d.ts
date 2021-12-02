import { RequestOptions } from './utils/request';
import { AppProps } from './components/App';
export declare type AppConfig = AppProps & {
    /** @name 网络请求相关配置 */
    requestConfig: RequestOptions;
};
export default function app(config: AppConfig): void;
