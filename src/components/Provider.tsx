import React from 'react';
import XmsContext from '../contexts/XmsContext';
import Dispatcher from '../helpers/dispatcher';
import Executor from './Executor';

const dispatcher = new Dispatcher();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Hook = () => any;

export type Models = Record<string, Hook>;

export type ProviderProps = {
  children: React.ReactNode;
  models: Models;
};

const Provider: React.FC<ProviderProps> = (props) => {
  const { children, models } = props;

  return (
    <XmsContext.Provider value={dispatcher}>
      {Object.entries(models).map((pair) => (
        <Executor
          key={pair[0]}
          namespace={pair[0]}
          hook={pair[1]}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onUpdate={(val: any) => {
            const [ns] = pair;
            dispatcher.data[ns] = val;
            dispatcher.update(ns);
          }}
        />
      ))}
      {children}
    </XmsContext.Provider>
  );
};

export default Provider;
