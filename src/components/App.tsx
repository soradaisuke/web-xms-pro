import { ProSettings, SettingDrawer } from '@ant-design/pro-layout';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { merge } from 'lodash';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout, { LayoutProps } from './Layout';
import Provider, { Models } from './Provider';
import 'moment/locale/zh-cn';

export type AppProps = {
  /** @name 全局配置 */
  settings: ProSettings;
  /** @name pro-layout配置 */
  layoutProps: LayoutProps;
  /** @name 全局models */
  models?: Models;
};

function App({ layoutProps, settings: propSettings, models }: AppProps) {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>(
    merge(
      {
        title: '蜻蜓FM',
        menu: {
          autoClose: false,
        },
        fixSiderbar: true,
      },
      propSettings,
    ),
  );

  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Provider models={models}>
          <Layout {...layoutProps} {...settings} />
        </Provider>
        <SettingDrawer
          getContainer={() => document.getElementById('xms-pro-layout')}
          settings={settings}
          onSettingChange={(changeSetting) => {
            setSetting(changeSetting);
          }}
          disableUrlParams
        />
      </Router>
    </ConfigProvider>
  );
}

App.defaultProps = {
  models: [],
};

export default App;
