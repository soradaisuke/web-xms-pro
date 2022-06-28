import React from 'react';
import { ButtonProps, UploadProps } from 'antd';
import { ImgCropProps } from 'antd-img-crop';
declare type UploadImageProps = Omit<UploadProps<string>, 'onChange'> & {
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
declare function UploadImage({ max, icon, title, buttonProps, disabled, value, onChange, limitWidth, limitHeight, imgCropProps, ...restProps }: UploadImageProps): JSX.Element;
declare namespace UploadImage {
    var defaultProps: {
        icon: JSX.Element;
        title: string;
        max: number;
        value: any;
        onChange: any;
        imgCropProps: any;
        buttonProps: any;
        disabled: boolean;
        limitWidth: any;
        limitHeight: any;
    };
}
export default UploadImage;
