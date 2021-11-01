import React from 'react';
export declare type Hook = () => any;
export declare type Models = Record<string, Hook>;
export declare type ProviderProps = {
    children: React.ReactNode;
    models: Models;
};
declare const Provider: React.FC<ProviderProps>;
export default Provider;
