/// <reference types="react" />
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
declare function UploadImage({ value, onChange, imgCropProps, beforeUpload, width, height, ...rest }: UploadImageProps): JSX.Element;
declare namespace UploadImage {
    var defaultProps: {
        value: any;
        onChange: any;
        imgCropProps: any;
        width: any;
        height: any;
    };
}
export default UploadImage;
