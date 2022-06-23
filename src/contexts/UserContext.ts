import { Result } from 'ahooks/lib/useRequest/src/types';
import React from 'react';
import { User } from '../types/common';

const UserContext = React.createContext<{
  user: User;
  auth: Result<any, []>;
  signin: () => void;
  signout: () => void;
}>({
  user: null,
  auth: null,
  signin: null,
  signout: null,
});

export default UserContext;
