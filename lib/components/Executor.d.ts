/// <reference types="react" />
declare type ExecutorProps = {
    hook: () => any;
    onUpdate: (val: any) => void;
    namespace: string;
};
declare function Executor({ hook, onUpdate, namespace }: ExecutorProps): JSX.Element;
export default Executor;
