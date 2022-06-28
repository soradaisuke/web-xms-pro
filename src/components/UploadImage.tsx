import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, ButtonProps, message, Upload, UploadProps } from 'antd';
import { filter, isArray, isString, map } from 'lodash';
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop, { ImgCropProps } from 'antd-img-crop';
import { generateDeviceId, uploadToUpyun } from '@qt/web-common';
import getImageSizeByFile from '../utils/getImageSizeByFile';
import { useUser } from '../hooks';

type UploadImageProps = Omit<UploadProps<string>, 'onChange'> & {
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
   *
   */
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  /** @name 图片固定宽度 */
  limitWidth?: number;
  /** @name 图片固定高度 */
  limitHeight?: number;
  /** @name antd-img-crop配置 */
  imgCropProps?: ImgCropProps;
};

function UploadImage({
  max,
  icon,
  title,
  buttonProps,
  disabled,
  value,
  onChange,
  limitWidth,
  limitHeight,
  imgCropProps,
  ...restProps
}: UploadImageProps) {
  const [fileList, setFileList] = useState<UploadImageProps['fileList']>([]);
  const user = useUser();

  useEffect(() => {
    if (isString(value)) {
      setFileList([{ uid: value, name: value, url: value }]);
    } else if (isArray(value)) {
      setFileList(
        map(value, (v) => ({ uid: v, name: v, url: v, response: v }))
      );
    } else {
      setFileList([]);
    }
  }, [value]);

  const showUploadButton = useMemo(
    () => max === undefined || !fileList || fileList?.length < max,
    [max, fileList]
  );

  const isPictureCard = useMemo(
    () => restProps.listType === 'picture-card',
    [restProps.listType]
  );

  const customRequest = useCallback<UploadProps<string>['customRequest']>(
    async (info) => {
      try {
        const url = (await uploadToUpyun(info.file as File, {
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
    [user?.sso_token]
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
    [max, onChange]
  );

  const beforeUpload = useCallback<UploadImageProps['beforeUpload']>(
    async (file, files) => {
      if (limitHeight || limitWidth) {
        const size = await getImageSizeByFile(file);
        if (limitWidth > 0 && size.width !== limitWidth) {
          message.error(`图片宽度应为${limitWidth}，实际为${size.width}`);
          return false;
        }
        if (limitHeight > 0 && size.height !== limitHeight) {
          message.error(`图片高度应为${limitHeight}，实际为${size.height}`);
          return false;
        }
      }
      return restProps.beforeUpload?.(file, files) ?? true;
    },
    [limitHeight, limitWidth, restProps]
  );

  const onRemove = useCallback<UploadImageProps['onRemove']>(
    (file) => {
      if (max === 1) {
        onChange?.(undefined);
      } else {
        onChange?.(filter(value || [], (v) => v !== file.response));
      }
      restProps.onRemove?.(file);
    },
    [max, onChange, restProps, value]
  );

  const upload = useMemo(
    () => (
      <Upload
        {...restProps}
        customRequest={customRequest}
        onChange={onFilesChange}
        beforeUpload={beforeUpload}
        fileList={fileList}
        onRemove={onRemove}
        listType={restProps.listType || 'picture-card'}
        accept={restProps.accept || 'image/jpeg, image/png'}
      >
        {showUploadButton &&
          (isPictureCard ? (
            <span>
              {icon} {title}
            </span>
          ) : (
            <Button disabled={disabled} {...buttonProps}>
              {icon}
              {title}
            </Button>
          ))}
      </Upload>
    ),
    [
      beforeUpload,
      buttonProps,
      customRequest,
      disabled,
      fileList,
      icon,
      isPictureCard,
      onFilesChange,
      onRemove,
      restProps,
      showUploadButton,
      title,
    ]
  );

  if (imgCropProps) {
    return <ImgCrop {...imgCropProps}>{upload}</ImgCrop>;
  }

  return upload;
}

UploadImage.defaultProps = {
  icon: <UploadOutlined />,
  title: '单击上传',
  max: 5,
  value: null,
  onChange: null,
  imgCropProps: null,
  buttonProps: null,
  disabled: false,
  limitWidth: null,
  limitHeight: null,
};

export default UploadImage;
