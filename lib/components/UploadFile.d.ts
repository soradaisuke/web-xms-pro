import React from 'react';
import { UploadProps } from 'antd';
declare type UploadFileProps = UploadProps & {
    value?: string;
    onChange?: (url: string) => void;
    platform?: 'upyun' | 'aliyun';
};
declare const UploadFile: React.FC<UploadFileProps>;
export default UploadFile;
