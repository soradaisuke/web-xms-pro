export declare enum ErrorShowType {
    SILENT = 0,
    WARN_MESSAGE = 1,
    ERROR_MESSAGE = 2,
    NOTIFICATION = 4
}
export interface XmsError extends Error {
    code?: number;
    showType?: ErrorShowType;
    duration?: number;
}
export default function showError(error: XmsError, showType?: ErrorShowType): void;
