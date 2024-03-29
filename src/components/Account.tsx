import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import React, { useContext, useEffect } from 'react';
import UserContext from '../contexts/UserContext';

function Account() {
  const { user, auth, signin, signout } = useContext(UserContext);

  useEffect(() => {
    auth.run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (auth.error) {
    return <Button onClick={signin} icon={<LoginOutlined />} />;
  }

  if (user) {
    return (
      <>
        <Avatar
          shape="square"
          size="small"
          src={user.avatar || 'https://sss.qingting.fm/zhibo/ic-qt-assistant.png'}
          icon={<UserOutlined />}
        />
        <div style={{ marginLeft: 5, marginRight: 5 }}>{user.nickname}</div>
        <Button onClick={signout} icon={<LogoutOutlined />} />
      </>
    );
  }

  return null;
}

export default Account;
