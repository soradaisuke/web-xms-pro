import React, { useEffect, useRef, useMemo } from 'react';

interface ExecutorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hook: () => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (val: any) => void;
  namespace: string;
}

const Executor: React.FC<ExecutorProps> = function (props) {
  const { hook, onUpdate, namespace } = props;

  const updateRef = useRef(onUpdate);
  updateRef.current = onUpdate;
  const initialLoad = useRef(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any;
  try {
    data = hook();
    if (
      process.env.NODE_ENV === 'development' &&
      typeof document !== 'undefined'
    ) {
      try {
        const count = Object.keys(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ((window as any).xms_useModel_dev_tool_log || {})[namespace] || {}
        ).length;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).xms_useModel_dev_tool = Object.assign(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).xms_useModel_dev_tool || {},
          {
            [namespace]: data,
          }
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).xms_useModel_dev_tool_log = Object.assign(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).xms_useModel_dev_tool_log || {},
          {
            [namespace]: Object.assign(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ((window as any).xms_useModel_dev_tool_log || {})[namespace] ||
                {},
              {
                [count]: data,
              }
            ),
          }
        );
        window.dispatchEvent(
          new CustomEvent('xms_useModel_update', {
            detail: {
              namespace,
              time: Date.now(),
              data,
              index: count,
            },
          })
        );
      } catch (e) {
        // dev tool 记录失败、可能是低版本浏览器，忽略
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(
      `plugin-model: Invoking '${namespace || 'unknown'}' model failed:`,
      e
    );
  }

  // 首次执行时立刻返回初始值
  useMemo(() => {
    updateRef.current(data);
    initialLoad.current = false;
  }, [data]);

  // React 16.13 后 update 函数用 useEffect 包裹
  useEffect(() => {
    if (initialLoad.current) {
      updateRef.current(data);
    } else {
      initialLoad.current = true;
    }
  });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default Executor;
