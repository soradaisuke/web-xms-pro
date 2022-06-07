import { Result } from 'ahooks/lib/useRequest/src/types';
import React from 'react';
import { User } from '../types/common';
import { ResponseStructure } from '../utils/request';
declare const UserContext: React.Context<{
    user: User;
    auth: Result<ResponseStructure, []>;
    signin: () => void;
    signout: () => void;
}>;
export default UserContext;
