import { ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';
import { includes } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { CommonRecord } from '../types/common';
import '../styles/link.less';

export default function makeLinkRender(
  link: (record: CommonRecord) => string,
): ProColumns['render'] {
  const render = (dom, record) => {
    const url = link(record);

    if (!url) {
      return dom;
    }

    if (includes(url, '//')) {
      return (
        <Button
          href={url}
          target="_blank"
          type="link"
          style={{ padding: '0px', width: '100%' }}
        >
          {dom}
        </Button>
      );
    }
    return <Link to={url}>{dom}</Link>;
  };
  return render;
}
