import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tooltip } from "antd";
import React from "react";
import { TableDeleteButtonRender } from "../types/table";

export default function makeDefaultDeleteButtonRender(del: () => Promise<boolean>): TableDeleteButtonRender {
  return function(config = {}) {
    const { popConfirmProps = {} } = config;
    return (
      <Popconfirm
        title="确定删除？"
        onConfirm={del}
        okText="确定"
        cancelText="取消"
        {...popConfirmProps}
      >
        <Tooltip title="删除">
          <Button
            danger
            style={{ marginRight: 10 }}
            icon={<DeleteOutlined />}
            shape="circle"
            type="primary"
          />
        </Tooltip>
      </Popconfirm>
    );
  };
}