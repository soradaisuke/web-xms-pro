export default function useModel(namespace: string, updater?: (model: any) => any): ReturnType<NonNullable<typeof updater>>;
