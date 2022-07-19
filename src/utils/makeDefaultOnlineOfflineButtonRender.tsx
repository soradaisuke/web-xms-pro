import { CloudDownloadOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import { get } from 'lodash';
import React from 'react';
import { Params } from 'react-router-dom';
import { CommonRecord } from '../types/common';
import { TableOnlineOfflineButtonRender } from '../types/table';

export default function makeDefaultOnlineOfflineButtonRender(
  record: CommonRecord,
  matchParams: Params,
  update: (values: CommonRecord) => Promise<boolean>,
): TableOnlineOfflineButtonRender {
  const render: TableOnlineOfflineButtonRender = (config = {}) => {
    const {
      onlineStatus = 1,
      offlineStatus = 0,
      onlineText = '上线',
      offlineText = '下线',
      statusKey = 'status',
      onlinePopConfirmProps = {},
      offlinePopConfirmProps = {},
      normalizeSubmitValues = (v) => v,
    } = config;

    const status = get(record, statusKey);

    const onConfirm = async () =>
      update(
        await normalizeSubmitValues(
          {
            [statusKey]: status === onlineStatus ? offlineStatus : onlineStatus,
          },
          matchParams,
          record,
        ),
      );

    return (
      <Popconfirm
        key="status"
        title={`确定${status === onlineStatus ? offlineText : onlineText}？`}
        okText="确定"
        cancelText="取消"
        {...(status === onlineStatus ? offlinePopConfirmProps : onlinePopConfirmProps)}
        onConfirm={onConfirm}
      >
        <Tooltip title={status === onlineStatus ? offlineText : onlineText}>
          <Button
            danger={status === onlineStatus}
            icon={status === onlineStatus ? <CloudDownloadOutlined /> : <CloudUploadOutlined />}
            shape="circle"
            type="primary"
          />
        </Tooltip>
      </Popconfirm>
    );
  };

  return render;
}
