/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useState } from 'react';
import { generateUri } from '@qt/web-common';
import { isProduction } from '@qt/env';
import Cookie from 'js-cookie';
import { request, useRequest } from '../utils/request';
import { Hook } from '../components/Provider';

const ENTRY_HOST = `//entry${isProduction ? '' : '.staging'}.qingtingfm.com`;
const TOKEN_KEY = isProduction ? 'prod_sso_token' : 'stg_sso_token';
const USER_KEY = isProduction ? 'prod_sso_user_id' : 'stg_sso_user_id';

const signin = () => {
  const loginUrl = generateUri(`${ENTRY_HOST}/v1/sso/login.html`, {
    return_url: window.location.href,
  });
  window.location.replace(loginUrl.href);
};

const useAuthModel =
  (authPath: string): Hook =>
  () => {
    const [user, setUser] = useState(null);

    const signout = useCallback(() => {
      Cookie.remove(TOKEN_KEY, { domain: '.qingtingfm.com' });
      Cookie.remove(USER_KEY, { domain: '.qingtingfm.com' });
      Cookie.remove('sso_token', { domain: '.qingtingfm.com' });
      Cookie.remove('sso_user_id', { domain: '.qingtingfm.com' });
      window.location.replace(window.location.origin);
    }, []);

    const auth = useRequest(() => request.get(authPath), {
      manual: true,
      onSuccess: (result) => {
        setUser(result);
      },
    });

    return {
      user,
      signin,
      signout,
      auth,
    };
  };

export default useAuthModel;
