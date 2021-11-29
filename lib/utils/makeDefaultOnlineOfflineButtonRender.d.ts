import { CommonRecord } from "../types/common";
import { TableOnlineOfflineButtonRender } from "../types/table";
export default function makeDefaultOnlineOfflineButtonRender(record: CommonRecord, update: (values: CommonRecord) => Promise<boolean>): TableOnlineOfflineButtonRender;
