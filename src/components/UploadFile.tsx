import { UploadOutlined } from '@ant-design/icons';
import { generateDeviceId, uploadToAliyun } from '@qt/web-common';
import { Button, ButtonProps, Upload, UploadProps } from 'antd';
import { filter, isArray, isString, map } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useUser from '../hooks/useUser';

export type UploadFileProps = Omit<UploadProps<string>, 'onChange'> & {
  /**
   * @name  上传文件的图标
   * @default UploadOutlined
   *
   * @example 改成笑脸图标  icon={<SmileOutlined/>}
   */
  icon?: React.ReactNode;
  /**
   * @name 按钮文字
   * @default 单击上传
   *
   * @example  title="上传"
   * @example  title={<div>上传</div>}
   */
  title?: React.ReactNode;
  /**
   * @name 最大的文件数量，到达数量之后上传按钮会失效
   *
   * @example max=2
   */
  max?: number;
  /**
   * @name 上传按钮的配置
   *
   * @example 按钮修改为主色 buttonProps={{ type:"primary" }}
   */
  buttonProps?: ButtonProps;

  /**
   * @name 是否禁用按钮
   * @example  disabled={true}
   */
  disabled?: ButtonProps['disabled'];
  /**
   * @name 上传组件的 url
   * @default []
   */
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
};

function UploadFile({
  max,
  icon,
  title,
  buttonProps,
  disabled,
  value,
  onChange,
  ...restProps
}: UploadFileProps) {
  const [fileList, setFileList] = useState<UploadFileProps['fileList']>([]);
  const user = useUser();

  useEffect(() => {
    if (isString(value)) {
      setFileList([{ uid: value, name: value, url: value }]);
    } else if (isArray(value)) {
      setFileList(
        map(value, (v) => ({ uid: v, name: v, url: v, response: v })),
      );
    } else {
      setFileList([]);
    }
  }, [value]);

  const showUploadButton = useMemo(
    () => max === undefined || !fileList || fileList?.length < max,
    [max, fileList],
  );

  const customRequest = useCallback<UploadProps<string>['customRequest']>(
    async (info) => {
      try {
        const url = (await uploadToAliyun(info.file as File, {
          ssoToken: user?.sso_token,
          deviceId: generateDeviceId(),
          onProgress: (e) => {
            info.onProgress(e);
          },
        })) as string;
        info.onSuccess(url);
      } catch (e) {
        info.onError(e);
      }
    },
    [user?.sso_token],
  );

  const onFilesChange = useCallback<UploadProps<string>['onChange']>(
    (info) => {
      setFileList(info.fileList);
      if (info.file.status === 'done') {
        if (max === 1) {
          onChange(info.file.response);
        } else {
          onChange(map(info.fileList, 'response'));
        }
      }
    },
    [max, onChange],
  );

  const onRemove = useCallback<UploadFileProps['onRemove']>(
    (file) => {
      if (max === 1) {
        onChange?.(undefined);
      } else {
        onChange?.(filter(value || [], (v) => v !== file.response));
      }
      restProps.onRemove?.(file);
    },
    [max, onChange, restProps, value],
  );

  return (
    <Upload
      {...restProps}
      customRequest={customRequest}
      onChange={onFilesChange}
      fileList={fileList}
      onRemove={onRemove}
    >
      {showUploadButton && (
        <Button disabled={disabled} {...buttonProps}>
          {icon}
          {title}
        </Button>
      )}
    </Upload>
  );
}

UploadFile.defaultProps = {
  icon: <UploadOutlined />,
  title: '单击上传',
  max: 5,
  value: null,
  onChange: null,
  buttonProps: null,
  disabled: false,
};

export default UploadFile;
