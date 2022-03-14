import { CommonRecord, RouteParams } from '../types/common';
import { TableOnlineOfflineButtonRender } from '../types/table';
export default function makeDefaultOnlineOfflineButtonRender(record: CommonRecord, matchParams: RouteParams, update: (values: CommonRecord) => Promise<boolean>): TableOnlineOfflineButtonRender;
