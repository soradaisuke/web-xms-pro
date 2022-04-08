/// <reference types="react" />
import { UploadProps } from 'antd';
declare type UploadFileProps = UploadProps & {
    value?: string;
    onChange?: (url: string) => void;
    platform?: 'upyun' | 'aliyun';
};
declare function UploadFile({ value, onChange, platform, ...rest }: UploadFileProps): JSX.Element;
declare namespace UploadFile {
    var defaultProps: {
        value: any;
        onChange: any;
        platform: string;
    };
}
export default UploadFile;
