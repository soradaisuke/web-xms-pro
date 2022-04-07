export declare type RouteParams = {
    [key in string]: string;
};
export declare type CommonRecord = {
    [key in string]: any;
};
export declare type XMSValueType = 'file' | 'link' | 'boolean';
export declare type LinkConfig = (record: CommonRecord) => string;
export declare type User = CommonRecord & {
    permissions?: CommonRecord;
    nickname?: string;
    phone?: string;
    avatar?: string;
    sso_token?: string;
};
export declare type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};
