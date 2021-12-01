import { SwapOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React from "react";
import { TableSwapButtonRender, TableUpdateButtonRender } from "../types/table";

export default function makeDefaultSwapButtonRender(defaultUpdateButtonRender: TableUpdateButtonRender): TableSwapButtonRender {
  return function(config = {}) {
    return defaultUpdateButtonRender({
      key: 'swap',
      columns: [
        {
          dataIndex: 'pos',
          title: '序号',
          valueType: 'digit',
          formItemProps: {
            rules: [
              {
                required: true,
              },
            ],
          },
        },
      ],
      trigger: (
        <Tooltip title="调序">
          <Button
            icon={<SwapOutlined rotate={90} />}
            shape="circle"
            type="primary"
          />
        </Tooltip>
      ),
      ...(config || {}),
    });
  };
}