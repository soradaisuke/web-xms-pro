import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import React from 'react';
import { TableDeleteButtonRender } from '../types/table';

export default function makeDefaultDeleteButtonRender(
  del: () => Promise<boolean>,
): TableDeleteButtonRender {
  const render: TableDeleteButtonRender = (config = {}) => {
    const { popConfirmProps = {} } = config;
    return (
      <Popconfirm
        key="delete"
        title="确定删除？"
        onConfirm={del}
        okText="确定"
        cancelText="取消"
        {...popConfirmProps}
      >
        <Tooltip title="删除">
          <Button
            danger
            icon={<DeleteOutlined />}
            shape="circle"
            type="primary"
          />
        </Tooltip>
      </Popconfirm>
    );
  };

  return render;
}
