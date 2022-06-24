import { RequestConfig } from './utils/request';
import { AppProps } from './components/App';
import { ServiceConfig } from './hooks/useCRUDRequests';
export declare type AppConfig = AppProps & {
    /** @name 网络请求相关配置 */
    requestConfig: RequestConfig;
    authRequestConfig?: ServiceConfig;
};
export default function app(config: AppConfig): void;
