import React from 'react';
export declare type UserProviderProps = {
    children: React.ReactNode;
    authPath: string;
};
declare function UserProvider({ children, authPath }: UserProviderProps): JSX.Element;
export default UserProvider;
