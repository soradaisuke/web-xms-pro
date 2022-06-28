import React from 'react';
import { ButtonProps, UploadProps } from 'antd';
declare type UploadFileProps = Omit<UploadProps<string>, 'onChange'> & {
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
};
declare function UploadFile({ max, icon, title, buttonProps, disabled, value, onChange, ...restProps }: UploadFileProps): JSX.Element;
declare namespace UploadFile {
    var defaultProps: {
        icon: JSX.Element;
        title: string;
        max: number;
        value: any;
        onChange: any;
        buttonProps: any;
        disabled: boolean;
    };
}
export default UploadFile;
