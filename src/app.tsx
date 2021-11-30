import React from 'react';
import ReactDOM from 'react-dom';
import { extendRequestConfig, RequestConfig } from './utils/request';
import App, { AppProps } from './components/App';
import UserProvider from './components/UserProvider';

export type AppConfig = AppProps & {
  /** @name 网络请求相关配置 */
  requestConfig: RequestConfig;
};

export default function app(config: AppConfig): void {
  const { requestConfig } = config;

  extendRequestConfig(requestConfig);

  const models = {};

  ReactDOM.render(
    <UserProvider authPath={requestConfig.authPath}>
      <App {...config} models={models} />
    </UserProvider>,
    document.getElementById('root')
  );
}
