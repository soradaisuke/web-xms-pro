import { CloudDownloadOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tooltip } from "antd";
import { get } from "lodash";
import React from "react";
import { CommonRecord } from "../types/common";
import { TableOnlineOfflineButtonRender } from "../types/table";

export default function makeDefaultOnlineOfflineButtonRender(record: CommonRecord, update: (values: CommonRecord) => Promise<boolean>): TableOnlineOfflineButtonRender {
  return function(config = {}) {
    const {
      onlineStatus = 1,
      offlineStatus = 0,
      onlineText = '上线',
      offlineText = '下线',
      statusKey = 'status',
    } = config;
    const status = get(record, statusKey);

    return (
      <Popconfirm
        title={`确定${
          status === onlineStatus ? offlineText : onlineText
        }？`}
        onConfirm={() =>
          update({
            [statusKey]:
              status === onlineStatus ? offlineStatus : onlineStatus,
          })
        }
        okText="确定"
        cancelText="取消"
      >
        <Tooltip title={status === onlineStatus ? offlineText : onlineText}>
          <Button
            danger={status === onlineStatus}
            style={{ marginRight: 10 }}
            icon={
              status === onlineStatus ? (
                <CloudDownloadOutlined />
              ) : (
                <CloudUploadOutlined />
              )
            }
            shape="circle"
            type="primary"
          />
        </Tooltip>
      </Popconfirm>
    );
  }
}