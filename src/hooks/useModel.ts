import { useState, useEffect, useContext, useRef } from 'react';
import isEqual from 'fast-deep-equal';
import XmsContext from '../contexts/XmsContext';
import Dispatcher from '../helpers/dispatcher';

export default function useModel(
  namespace: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updater?: (model: any) => any
): ReturnType<NonNullable<typeof updater>> {
  type RetState = ReturnType<NonNullable<typeof updater>>;

  const dispatcher = useContext<Dispatcher>(XmsContext);
  const updaterRef = useRef(updater);

  updaterRef.current = updater;

  const [state, setState] = useState<RetState>(() =>
    updaterRef.current
      ? updaterRef.current(dispatcher.data[namespace])
      : dispatcher.data[namespace]
  );
  const stateRef = useRef(state);
  stateRef.current = state;
  const isMount = useRef(false);
  useEffect(() => {
    isMount.current = true;
    return () => {
      isMount.current = false;
    };
  }, []);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (e: any) => {
      if (!isMount.current) {
        // 如果 handler 执行过程中，组件被卸载了，则强制更新全局 data
        setTimeout(() => {
          dispatcher.data[namespace] = e;
          dispatcher.update(namespace);
        });
      } else if (updater && updaterRef.current) {
        const currentState = updaterRef.current(e);
        const previousState = stateRef.current;
        if (!isEqual(currentState, previousState)) {
          setState(currentState);
        }
      } else {
        setState(e);
      }
    };
    try {
      dispatcher.callbacks[namespace].add(handler);
      dispatcher.update(namespace);
    } catch (e) {
      dispatcher.callbacks[namespace] = new Set();
      dispatcher.callbacks[namespace].add(handler);
      dispatcher.update(namespace);
    }
    return () => {
      dispatcher.callbacks[namespace].delete(handler);
    };
  }, [namespace, dispatcher, updater]);
  return state;
}
