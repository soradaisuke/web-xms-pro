import { message, notification } from 'antd';
import { isNumber } from 'lodash';

/**
 * 错误展示类型
 * @enum
 * @group Error
 */
export enum ErrorShowType {
  /**
   * 不展示
   */
  SILENT = 0,
  /**
   * 使用[message.warn()](https://ant.design/components/message-cn/)
   */
  WARN_MESSAGE = 1,
  /**
   * 使用[message.error()](https://ant.design/components/message-cn/)
   */
  ERROR_MESSAGE = 2,
  /**
   * 使用[notification](https://ant.design/components/notification-cn/)
   */
  NOTIFICATION = 3,
}

/**
 * 扩展错误类型
 * @group Error
 */
export interface XmsError extends Error {
  /**
   * 错误码
   */
  code?: number;
  /**
   * 展示类型
   * @defaultValue {@link ErrorShowType.ERROR_MESSAGE}
   */
  showType?: ErrorShowType;
  /**
   * 使用{@link ErrorShowType.NOTIFICATION}时的时长
   *
   * @defaultValue 4.5
   */
  duration?: number;
}

/**
 * 根据错误数据自动展示错误消息，默认使用[message.error()](https://ant.design/components/message-cn/)
 *
 * 当使用notification时，消息长度如果大于50个字符，则不自动关闭，否则显示时长默认为4.5s
 *
 * @param error 错误数据
 * @param showType 错误展示类型，优先使用error.showType
 * @group Error
 */
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
