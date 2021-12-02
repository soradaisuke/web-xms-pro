import { BaseResult } from '@ahooksjs/use-request/lib/types';
import React from 'react';
import { User } from '../types/common';
declare const UserContext: React.Context<{
    user: User;
    auth: BaseResult<any, []>;
    signin: () => void;
    signout: () => void;
}>;
export default UserContext;
