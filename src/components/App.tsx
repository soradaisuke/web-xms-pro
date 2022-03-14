import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProSettings, SettingDrawer } from '@ant-design/pro-layout';
import { merge } from 'lodash';
import Layout, { LayoutProps } from './Layout';
import Provider, { Models } from './Provider';
import XmsProProvider from './XmsProProvider';
import 'moment/locale/zh-cn';

export type AppProps = {
  /** @name 全局配置 */
  settings: ProSettings;
  /** @name pro-layout配置 */
  layoutProps: LayoutProps;
  /** @name 全局models */
  models?: Models;
};

const App: React.FC<AppProps> = function (props) {
  const { layoutProps, settings: propSettings, models } = props;

  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>(
    merge(
      {
        title: '蜻蜓FM',
        menu: {
          autoClose: false,
        },
        fixSiderbar: true,
      },
      propSettings
    )
  );

  return (
    <ConfigProvider locale={zhCN}>
      <XmsProProvider>
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
      </XmsProProvider>
    </ConfigProvider>
  );
};

export default App;
