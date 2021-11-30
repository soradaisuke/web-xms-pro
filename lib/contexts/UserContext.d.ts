import { BaseResult } from '@ahooksjs/use-request/lib/types';
import React from 'react';
import { CommonRecord } from '../types/common';
declare const UserContext: React.Context<{
    user: CommonRecord;
    auth: BaseResult<any, []>;
    signin: () => void;
    signout: () => void;
}>;
export default UserContext;
