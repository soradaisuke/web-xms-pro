import { BaseResult } from '@ahooksjs/use-request/lib/types';
import React from 'react';
import { User } from '../types/common';

const UserContext = React.createContext<{
  user: User,
  auth: BaseResult<any, []>,
  signin: () => void,
  signout: () => void
}>({
  user: {},
  auth: null,
  signin: null,
  signout: null,
});

export default UserContext;
