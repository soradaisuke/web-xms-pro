import { BaseResult } from '@ahooksjs/use-request/lib/types';
import React from 'react';
import { CommonRecord } from '../types/common';

const UserContext = React.createContext<{
  user: CommonRecord,
  auth: BaseResult<any, []>,
  signin: () => void,
  signout: () => void
}>({
  user: null,
  auth: null,
  signin: null,
  signout: null,
});

export default UserContext;