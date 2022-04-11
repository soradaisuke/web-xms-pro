import React, { PropsWithChildren, useContext, useMemo } from 'react';
import { Input, Select, Switch } from 'antd';
import ProProvider from '@ant-design/pro-provider';
import UploadImage from './UploadImage';
import UploadFile from './UploadFile';

function XmsProProvider({ children }: PropsWithChildren<any>) {
  const values = useContext(ProProvider);

  const value = useMemo(
    () => ({
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
          render: (text) => (
            <Switch
              checkedChildren="是"
              unCheckedChildren="否"
              checked={text}
            />
          ),
          renderFormItem: (_, renderProps) => (
            <Select
              allowClear
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
    }),
    [values]
  );

  return <ProProvider.Provider value={value}>{children}</ProProvider.Provider>;
}

export default XmsProProvider;
