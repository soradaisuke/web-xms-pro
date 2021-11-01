import React from 'react';
import ReactDOM from 'react-dom';
import { extendRequestConfig, RequestConfig } from './utils/request';
import App, { AppProps } from './components/App';
import { Models } from './components/Provider';
import useAuthModel from './models/useAuthModel';

export type AppConfig = AppProps & {
  /** @name 网络请求相关配置 */
  requestConfig: RequestConfig;
};

export default function app(config: AppConfig): void {
  const { requestConfig } = config;

  extendRequestConfig(requestConfig);

  const { authPath } = requestConfig;

  const models: Models = {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    user: useAuthModel(authPath),
  };

  ReactDOM.render(
    <App {...config} models={models} />,
    document.getElementById('root')
  );
}
