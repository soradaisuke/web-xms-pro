import { CloudDownloadOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import { get } from 'lodash';
import React, { useCallback } from 'react';
import { CommonRecord, RouteParams } from '../types/common';
import { TableOnlineOfflineButtonRender } from '../types/table';

export default function makeDefaultOnlineOfflineButtonRender(
  record: CommonRecord,
  matchParams: RouteParams,
  update: (values: CommonRecord) => Promise<boolean>
): TableOnlineOfflineButtonRender {
  const useRender: TableOnlineOfflineButtonRender = (config = {}) => {
    const {
      onlineStatus = 1,
      offlineStatus = 0,
      onlineText = '上线',
      offlineText = '下线',
      statusKey = 'status',
      normalizeSubmitValues = (v) => v,
    } = config;

    const status = get(record, statusKey);

    const onConfirm = useCallback(
      async () =>
        update(
          await normalizeSubmitValues(
            {
              [statusKey]:
                status === onlineStatus ? offlineStatus : onlineStatus,
            },
            matchParams,
            record
          )
        ),
      [normalizeSubmitValues, statusKey, status, onlineStatus, offlineStatus]
    );

    return (
      <Popconfirm
        key="status"
        title={`确定${status === onlineStatus ? offlineText : onlineText}？`}
        onConfirm={onConfirm}
        okText="确定"
        cancelText="取消"
      >
        <Tooltip title={status === onlineStatus ? offlineText : onlineText}>
          <Button
            danger={status === onlineStatus}
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
  };

  return useRender;
}
