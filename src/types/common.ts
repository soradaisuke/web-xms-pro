/**
 * 递归设置类型T内的所有属性为可选
 */
export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

/**
 * 通用object对象
 */
export type CommonRecord = {
  [key in string]: any;
};

/**
 * 用户信息
 * @group User
 */
export type User = CommonRecord & {
  /**
   * 拥有的权限
   */
  permissions?: CommonRecord;
  /**
   * 姓名
   */
  nickname?: string;
  /**
   * 电话
   */
  phone?: string;
  /**
   * 头像
   */
  avatar?: string;
  /**
   * sso token
   */
  // eslint-disable-next-line camelcase
  sso_token?: string;
};

/**
 * XMS额外支持的[valueType](https://procomponents.ant.design/components/schema/#valuetype-%E5%88%97%E8%A1%A8)
 * @group Pro Components
 */
export type XMSValueType = 'file' | 'link' | 'boolean';

/**
 * 默认的后端分页请求数据格式
 *
 * @typeParam TData - 单一数据的类型
 * @group Request
 */
export type ListResp<TData = CommonRecord> = {
  /**
   * 分页数据
   */
  items: TData[];
  /**
   * 总数
   */
  total: number;
};

/**
 * 默认的后端分页请求参数格式
 * @group Request
 */
export type ListReqParams = {
  /**
   * 页数
   *
   * @defaultValue 1
   */
  page?: number;
  /**
   * 分页大小
   *
   * @defaultValue 20
   */
  pagesize?: number;
  /**
   * 排序
   * @example `id asc`
   */
  order?: string;
  /**
   * 筛选
   * @example `{ id: 1 }`
   */
  filter?: Record<string, string | number | boolean>;
};
