export type RouteParams = Record<string, string>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CommonRecord = Record<string, any>;
export type XMSValueType = 'file' | 'link' | 'boolean';
export type LinkConfig = (record: CommonRecord) => string;
export type User = CommonRecord & {
  permissions?: CommonRecord;
  nickname?: string;
  phone?: string;
  avatar?: string;
  // eslint-disable-next-line camelcase
  sso_token?: string;
}

