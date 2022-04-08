import React, { PropsWithChildren } from 'react';
import { ModalProps } from 'antd';
export declare type TriggerModalProps = PropsWithChildren<ModalProps> & {
    trigger: JSX.Element;
};
declare function TriggerModal({ trigger, onOk, onCancel, ...rest }: TriggerModalProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof TriggerModal>;
export default _default;
