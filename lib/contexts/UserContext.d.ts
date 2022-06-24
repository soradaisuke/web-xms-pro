import { Result } from 'ahooks/lib/useRequest/src/types';
import React from 'react';
import { User } from '../types/common';
declare const UserContext: React.Context<{
    user: User;
    auth: Result<any, any[]>;
    signin: () => void;
    signout: () => void;
}>;
export default UserContext;
