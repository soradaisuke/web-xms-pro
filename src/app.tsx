import React from 'react';
import ReactDOM from 'react-dom';
import App, { AppProps } from './components/App';
import UserProvider from './components/UserProvider';
import { ServiceConfig } from './hooks/useCRUDRequests';
import { extendRequestConfig, RequestConfig } from './utils/request';

export type AppConfig = AppProps & {
  /**
   * 网络请求相关配置
   */
  requestConfig: RequestConfig;
  /**
   * 用户鉴权配置
   */
  authRequestConfig?: ServiceConfig;
};

export default function app(config: AppConfig): void {
  const { requestConfig, authRequestConfig } = config;

  extendRequestConfig(requestConfig);

  const models = {};

  ReactDOM.render(
    <UserProvider requestConfig={authRequestConfig}>
      <App {...config} models={models} />
    </UserProvider>,
    document.getElementById('root'),
  );
}
