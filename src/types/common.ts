export type RouteParams = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in string]: string;
};
export type CommonRecord = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in string]: any;
};
export type XMSValueType = 'file' | 'link' | 'boolean';
export type LinkConfig = (record: CommonRecord) => string;
export type User = CommonRecord & {
  permissions?: CommonRecord;
  nickname?: string;
  phone?: string;
  avatar?: string;
  // eslint-disable-next-line camelcase
  sso_token?: string;
};
