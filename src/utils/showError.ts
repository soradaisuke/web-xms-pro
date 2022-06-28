import { message, notification } from 'antd';
import { isNumber } from 'lodash';

export enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 4,
}

export interface XmsError extends Error {
  code?: number;
  showType?: ErrorShowType;
  duration?: number;
}

export default function showError(error: XmsError, showType?: ErrorShowType) {
  switch (error.showType || showType) {
    case ErrorShowType.SILENT:
      break;
    case ErrorShowType.WARN_MESSAGE:
      message.warn(error.message);
      break;
    case ErrorShowType.ERROR_MESSAGE:
      message.error(error.message);
      break;
    case ErrorShowType.NOTIFICATION:
      notification.open({
        description: error.message,
        message: error.code || error.name,
        // eslint-disable-next-line no-nested-ternary
        duration: isNumber(error.duration)
          ? error.duration
          : error.message?.length > 50
          ? 0
          : 4.5,
      });
      break;
    default:
      message.error(error.message || '未知错误');
      break;
  }
}
