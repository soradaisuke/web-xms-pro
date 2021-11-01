export default class Dispatcher {
  callbacks = {};

  data = {};

  update = (namespace: string): void => {
    (this.callbacks[namespace] || []).forEach(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (callback: (val: any) => void) => {
        try {
          const data = this.data[namespace];
          callback(data);
        } catch (e) {
          callback(undefined);
        }
      }
    );
  };
}
