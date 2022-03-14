import React, { PropsWithChildren, useCallback, useState } from 'react';
import { Modal, ModalProps } from 'antd';

export type TriggerModalProps = PropsWithChildren<ModalProps> & {
  trigger: JSX.Element;
};

const TriggerModal: React.FC<TriggerModalProps> = function (props) {
  const { trigger, onOk, onCancel, ...modalProps } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onMergedOk = useCallback(
    async (e) => {
      await onOk?.(e);
      setIsModalVisible(false);
    },
    [onOk]
  );

  const onMergedCancel = useCallback(
    async (e) => {
      await onCancel?.(e);
      setIsModalVisible(false);
    },
    [onCancel]
  );

  return (
    <>
      <Modal
        {...modalProps}
        visible={isModalVisible}
        onOk={onMergedOk}
        onCancel={onMergedCancel}
      />
      {trigger &&
        React.cloneElement(trigger, {
          ...trigger.props,
          onClick: async (e: any) => {
            setIsModalVisible(true);
            trigger.props?.onClick?.(e);
          },
        })}
    </>
  );
};

export default React.memo(TriggerModal);
