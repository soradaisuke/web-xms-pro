import { ProColumns } from "@ant-design/pro-table";
import { Button } from "antd";
import { startsWith } from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import { LinkConfig } from "../types/common";

export default function makeLinkRender(link: LinkConfig ): ProColumns['render'] {
  return function(dom, record) {
    const url = link(record);
    if (startsWith(url, 'http') || startsWith(url, '//')) {
      return (
        <Button href={url} target="_blank" type="link">
          {dom}
        </Button>
      );
    }
    return <Link to={link(record)}>{dom}</Link>;
  }
};