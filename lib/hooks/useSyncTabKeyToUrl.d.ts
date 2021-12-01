export default function useSyncTabKeyToUrl(key: string, defaultTabKey: string): {
    tabActiveKey: string;
    onTabChange: (k: any) => void;
};
