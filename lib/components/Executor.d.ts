import React from 'react';
interface ExecutorProps {
    hook: () => any;
    onUpdate: (val: any) => void;
    namespace: string;
}
declare const Executor: React.FC<ExecutorProps>;
export default Executor;
