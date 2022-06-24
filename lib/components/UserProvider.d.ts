import React from 'react';
import { User } from '../types/common';
import { ServiceConfig } from '../hooks/useCRUDRequests';
export declare type UserProviderProps = {
    children: React.ReactNode;
    requestConfig?: ServiceConfig;
    user?: User;
};
declare function UserProvider({ children, requestConfig, user: propUser, }: UserProviderProps): JSX.Element;
declare namespace UserProvider {
    var defaultProps: {
        requestConfig: any;
        user: any;
    };
}
export default UserProvider;
