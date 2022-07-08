import { Modal, ModalProps } from 'antd';
import React, { useCallback, useState } from 'react';

export type TriggerModalProps = ModalProps & {
  trigger: JSX.Element;
};

function TriggerModal({ trigger, onOk, onCancel, ...rest }: TriggerModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onMergedOk = useCallback(
    async (e) => {
      await onOk?.(e);
      setIsModalVisible(false);
    },
    [onOk],
  );

  const onMergedCancel = useCallback(
    async (e) => {
      await onCancel?.(e);
      setIsModalVisible(false);
    },
    [onCancel],
  );

  return (
    <>
      <Modal
        {...rest}
        visible={isModalVisible}
        onOk={onMergedOk}
        onCancel={onMergedCancel}
      />
      {trigger
        && React.cloneElement(trigger, {
          ...trigger.props,
          onClick: async (e: any) => {
            setIsModalVisible(true);
            trigger.props?.onClick?.(e);
          },
        })}
    </>
  );
}

export default TriggerModal;
