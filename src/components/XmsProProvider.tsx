import { proFieldParsingValueEnumToArray } from '@ant-design/pro-field';
import ProProvider, { ConfigContextPropsType } from '@ant-design/pro-provider';
import { Input, Select, Tag } from 'antd';
import React, { PropsWithChildren, useContext, useMemo } from 'react';
import ObjectInputTextArea from './ObjectInputTextArea';
import UploadFile from './UploadFile';
import UploadImage from './UploadImage';

function XmsProProvider({ children }: PropsWithChildren<any>) {
  const values = useContext(ProProvider);

  const value = useMemo<ConfigContextPropsType>(
    () => ({
      ...values,
      valueTypeMap: {
        image: {
          renderFormItem: (_, renderProps) => <UploadImage {...renderProps?.fieldProps} />,
        },
        file: {
          renderFormItem: (_, renderProps) => <UploadFile {...renderProps?.fieldProps} />,
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
          renderFormItem: (_, renderProps) => <Input placeholder="请输入链接" {...renderProps?.fieldProps} />,
        },
        boolean: {
          render: (text, props) => (
            <Tag color={text ? 'green' : 'red'} {...props?.fieldProps}>
              {text ? '是' : '否'}
            </Tag>
          ),
          renderFormItem: (_, props) => (
            <Select
              allowClear
              options={proFieldParsingValueEnumToArray(props.valueEnum)}
              {...props?.fieldProps}
            />
          ),
        },
        object: {
          renderFormItem: (_, props) => (
            <ObjectInputTextArea
              {...props?.fieldProps}
            />
          ),
        },
      },
    }),
    [values],
  );

  return <ProProvider.Provider value={value}>{children}</ProProvider.Provider>;
}

export default XmsProProvider;
