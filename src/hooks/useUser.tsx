import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { User } from '../types';

/**
 * 获取用户信息
 * @returns 用户信息
 * @group User
 */
export default function useUser(): User {
  const { user } = useContext(UserContext);
  return user;
}
