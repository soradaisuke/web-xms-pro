import React, { useMemo, useState } from 'react';
import { generateUri } from '@qt/web-common';
import { isProduction } from '@qt/env';
import Cookie from 'js-cookie';
import { request, useRequest } from '../utils/request';
import UserContext from '../contexts/UserContext';
import { User } from '../types/common';

export type UserProviderProps = {
  children: React.ReactNode;
  authPath: string;
};

const ENTRY_HOST = `//entry${isProduction ? '' : '.staging'}.qingtingfm.com`;
const TOKEN_KEY = isProduction ? 'prod_sso_token' : 'stg_sso_token';
const USER_KEY = isProduction ? 'prod_sso_user_id' : 'stg_sso_user_id';

const signin = () => {
  const loginUrl = generateUri(`${ENTRY_HOST}/v1/sso/login.html`, {
    return_url: window.location.href,
  });
  window.location.replace(loginUrl.href);
};

const signout = () => {
  Cookie.remove(TOKEN_KEY, { domain: '.qingtingfm.com' });
  Cookie.remove(USER_KEY, { domain: '.qingtingfm.com' });
  Cookie.remove('sso_token', { domain: '.qingtingfm.com' });
  Cookie.remove('sso_user_id', { domain: '.qingtingfm.com' });
  window.location.replace(window.location.origin);
};

const UserProvider: React.FC<UserProviderProps> = function(props) {
  const { children, authPath } = props;

  const [user, setUser] = useState<User>({});
  
  const auth = useRequest(() => request.get(authPath), {
    manual: true,
    onSuccess: (result) => {
      setUser(result);
    },
  });

  const value = useMemo(() => ({
    user,
    signin,
    signout,
    auth,
  }), [auth, user]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
