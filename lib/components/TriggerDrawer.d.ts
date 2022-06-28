import React from 'react';
import { DrawerProps } from 'antd';
export declare type TriggerDrawerProps = DrawerProps & {
    trigger: JSX.Element;
};
declare function TriggerDrawer({ trigger, onClose, ...rest }: TriggerDrawerProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof TriggerDrawer>;
export default _default;
