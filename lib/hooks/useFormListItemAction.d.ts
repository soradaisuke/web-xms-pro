import { ProFormInstance } from '@ant-design/pro-form';
export default function useFormListItemAction(form: ProFormInstance): {
    setCurrentRowData: (data: any) => void;
    getCurrentRowData: () => any;
};
