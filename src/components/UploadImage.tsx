import React, { useCallback, useMemo, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload, UploadProps } from 'antd';
import ImgCrop, { ImgCropProps } from 'antd-img-crop';
import { uploadToUpyun, generateDeviceId } from '@qt/web-common';
import { UploadFile } from 'antd/lib/upload/interface';
import useModel from '../hooks/useModel';
import getImageSizeByFile from '../utils/getImageSizeByFile';

type UploadImageProps = UploadProps & {
  value?: string;
  onChange?: (url: string) => void;
  /** @name 图片固定宽度 */
  width?: number;
  /** @name 图片固定高度 */
  height?: number;
  /** @name antd-img-crop配置 */
  imgCropProps?: ImgCropProps;
};

const UploadImage: React.FC<UploadImageProps> = (props) => {
  const { value, onChange, imgCropProps, beforeUpload, width, height } = props;

  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>(
    value ? [{ uid: value, name: value, url: value }] : []
  );
  const user = useModel('user', (data) => data.user);

  const customRequest = useCallback<UploadImageProps['customRequest']>(
    async (info) => {
      try {
        setLoading(true);
        const url = (await uploadToUpyun(info.file as File, {
          ssoToken: user?.sso_token,
          deviceId: generateDeviceId(),
        })) as string;
        onChange(url);
        setFileList([{ uid: url, name: url, url }]);
        setLoading(false);
      } catch (e) {
        message.error(e.message || e || '上传失败');
        setLoading(false);
      }
    },
    [setLoading, setFileList, onChange, user]
  );

  const mergedBeforeUpload = useCallback<UploadImageProps['beforeUpload']>(
    async (file, files) => {
      if (width || height) {
        const size = await getImageSizeByFile(file);
        if (width > 0 && size.width !== width) {
          message.error(`图片宽度应为${width}，实际为${size.width}`);
          return false;
        }
        if (height > 0 && size.height !== height) {
          message.error(`图片高度应为${height}，实际为${size.height}`);
          return false;
        }
      }
      if (beforeUpload) {
        return beforeUpload(file, files);
      }
      return true;
    },
    [beforeUpload, height, width]
  );

  const onRemove = useCallback(() => {
    setFileList([]);
    onChange(null);
  }, [onChange]);

  const uploadButton = useMemo(
    () => (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>上传</div>
      </div>
    ),
    [loading]
  );

  const upload = useMemo(
    () => (
      <Upload
        accept="image/jpeg, image/png"
        customRequest={customRequest}
        {...props}
        beforeUpload={mergedBeforeUpload}
        fileList={fileList}
        onRemove={onRemove}
        listType="picture-card"
      >
        {fileList && fileList.length ? null : uploadButton}
      </Upload>
    ),
    [customRequest, props, mergedBeforeUpload, fileList, onRemove, uploadButton]
  );

  if (imgCropProps) {
    return <ImgCrop {...imgCropProps}>{upload}</ImgCrop>;
  }

  return upload;
};

UploadImage.defaultProps = {
  value: null,
  onChange: null,
  imgCropProps: null,
  width: null,
  height: null,
};

export default UploadImage;
