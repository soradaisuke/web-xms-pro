import React from 'react';
import { UploadProps } from 'antd';
import { ImgCropProps } from 'antd-img-crop';
declare type UploadImageProps = UploadProps & {
    value?: string;
    onChange?: (url: string) => void;
    /** @name 图片固定宽度 */
    width?: number;
    /** @name 图片固定高度 */
    height?: number;
    /** @name antd-img-crop配置 */
    imgCropProps?: ImgCropProps;
};
declare const UploadImage: React.FC<UploadImageProps>;
export default UploadImage;
