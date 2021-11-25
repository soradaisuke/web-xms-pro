import React, { useContext, useMemo, useState } from 'react';
import { ConfigProvider, Input, Select, Switch } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProSettings, SettingDrawer } from '@ant-design/pro-layout';
import { merge } from 'lodash';
import ProProvider from '@ant-design/pro-provider';
import Layout, { LayoutProps } from './Layout';
import Provider, { Models } from './Provider';
import UploadImage from './UploadImage';
import UploadFile from './UploadFile';
import 'moment/locale/zh-cn';

export type AppProps = {
  /** @name 全局配置 */
  settings: ProSettings;
  /** @name pro-layout配置 */
  layoutProps: LayoutProps;
  /** @name 全局models */
  models?: Models;
};

const App: React.FC<AppProps> = function(props) {
  const values = useContext(ProProvider);

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

  const value = useMemo(() => ({
    ...values,
    valueTypeMap: {
      image: {
        renderFormItem: (_, renderProps) => (
          <UploadImage {...renderProps?.fieldProps} />
        ),
      },
      file: {
        renderFormItem: (_, renderProps) => (
          <UploadFile {...renderProps?.fieldProps} />
        ),
      },
      link: {
        render: (text, renderProps) => (
          <a href={text} target="_blank" rel="noreferrer">
            <div
              style={{
                wordBreak: 'break-all',
                width: renderProps?.fieldProps?.width ?? 200,
              }}
            >
              {text}
            </div>
          </a>
        ),
        renderFormItem: (_, renderProps) => (
          <Input placeholder="请输入链接" {...renderProps?.fieldProps} />
        ),
      },
      boolean: {
        render: (text) => <Switch checked={text} />,
        renderFormItem: (_, renderProps) => (
          <Select
            options={[
              {
                label: '是',
                value: true,
              },
              {
                label: '否',
                value: false,
              },
            ]}
            {...renderProps?.fieldProps}
          />
        ),
      },
    },
  }), [values]);

  return (
    <ConfigProvider locale={zhCN}>
      <ProProvider.Provider value={value}>
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
      </ProProvider.Provider>
    </ConfigProvider>
  );
}

export default App;
