import { Drawer, DrawerProps } from 'antd';
import React, { useCallback, useState } from 'react';

export type TriggerDrawerProps = DrawerProps & {
  trigger: JSX.Element;
};

function TriggerDrawer({ trigger, onClose, ...rest }: TriggerDrawerProps) {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const onMergedClose = useCallback(
    (e) => {
      onClose?.(e);
      setIsDrawerVisible(false);
    },
    [onClose],
  );

  return (
    <>
      <Drawer {...rest} visible={isDrawerVisible} onClose={onMergedClose} />
      {trigger
        && React.cloneElement(trigger, {
          ...trigger.props,
          onClick: async (e: any) => {
            setIsDrawerVisible(true);
            trigger.props?.onClick?.(e);
          },
        })}
    </>
  );
}

export default TriggerDrawer;
