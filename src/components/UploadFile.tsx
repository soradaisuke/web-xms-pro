import React, { useCallback, useMemo, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, UploadProps } from 'antd';
import {
  uploadToAliyun,
  uploadToUpyun,
  generateDeviceId,
} from '@qt/web-common';
import { UploadFile as AntdUploadFile } from 'antd/lib/upload/interface';
import useUser from '../hooks/useUser';

type UploadFileProps = UploadProps & {
  value?: string;
  onChange?: (url: string) => void;
  platform?: 'upyun' | 'aliyun';
};

function UploadFile({ value, onChange, platform, ...rest }: UploadFileProps) {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<AntdUploadFile[]>(
    value ? [{ uid: value, name: value, url: value }] : []
  );
  const user = useUser();

  const customRequest = useCallback<UploadFileProps['customRequest']>(
    async (info) => {
      try {
        setLoading(true);
        const url = (await (platform === 'upyun'
          ? uploadToUpyun
          : uploadToAliyun)(info.file as File, {
          ssoToken: user?.sso_token,
          deviceId: generateDeviceId(),
          removeEXIF: false,
        })) as string;
        onChange(url);
        setFileList([{ uid: url, name: url, url }]);
        setLoading(false);
      } catch (e) {
        message.error(e.message || e || '上传失败');
        setLoading(false);
      }
    },
    [platform, user?.sso_token, onChange]
  );

  const onRemove = useCallback(() => {
    setFileList([]);
    onChange(null);
  }, [onChange]);

  const uploadButton = useMemo(
    () => (
      <Button loading={loading} icon={<UploadOutlined />}>
        上传
      </Button>
    ),
    [loading]
  );

  return (
    <Upload
      customRequest={customRequest}
      {...rest}
      fileList={fileList}
      onRemove={onRemove}
    >
      {fileList && fileList.length ? null : uploadButton}
    </Upload>
  );
}

UploadFile.defaultProps = {
  value: null,
  onChange: null,
  platform: 'aliyun',
};

export default UploadFile;
