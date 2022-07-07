import React, { useEffect, useMemo, useState } from 'react';
import { generateUri } from '@qt/web-common';
import { isProduction } from '@qt/env';
import Cookie from 'js-cookie';
import { useRequest } from 'ahooks';
import { isPlainObject, isString } from 'lodash';
import { request } from 'utils/request';
import UserContext from 'contexts/UserContext';
import { User } from 'types/common';
import { ServiceConfig } from 'hooks/useCRUDRequests';

export type UserProviderProps = {
  children: React.ReactNode;
  requestConfig?: ServiceConfig;
  user?: User;
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

function UserProvider({
  children,
  requestConfig,
  user: propUser,
}: UserProviderProps) {
  const [user, setUser] = useState<User>(propUser);

  useEffect(() => {
    setUser(propUser);
  }, [propUser]);

  const service = useMemo(() => {
    if (isString(requestConfig)) {
      return () => request.get(requestConfig);
    }
    if (isPlainObject(requestConfig)) {
      if ('requestService' in requestConfig) {
        return requestConfig.requestService;
      }
      if ('requestPath' in requestConfig) {
        return () =>
          request.get(requestConfig.requestPath, requestConfig.requestOptions);
      }
    }
    return null;
  }, [requestConfig]);

  const auth = useRequest(service, {
    manual: true,
    onSuccess: (result) => {
      setUser(result);
    },
  });

  const value = useMemo(
    () => ({
      user,
      signin,
      signout,
      auth,
    }),
    [auth, user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

UserProvider.defaultProps = {
  requestConfig: null,
  user: null,
};

export default UserProvider;
