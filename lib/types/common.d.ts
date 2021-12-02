export declare type RouteParams = Record<string, string>;
export declare type CommonRecord = Record<string, any>;
export declare type XMSValueType = 'file' | 'link' | 'boolean';
export declare type LinkConfig = (record: CommonRecord) => string;
export declare type User = CommonRecord & {
    permissions?: CommonRecord;
    nickname?: string;
    phone?: string;
    avatar?: string;
    sso_token?: string;
};
