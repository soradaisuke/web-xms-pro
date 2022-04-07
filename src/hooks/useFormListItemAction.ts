import { ProFormInstance } from '@ant-design/pro-form';
import { FormListContext } from '@ant-design/pro-form/es/components/List';
import { set } from 'lodash';
import { useCallback, useContext } from 'react';

export default function useFormListItemAction(form: ProFormInstance) {
  const context = useContext(FormListContext);

  const setCurrentRowData = useCallback(
    (data) => {
      if (form) {
        const oldTableDate = form.getFieldsValue() || {};
        const rowKeyName = context.listName;
        const updateValues = set(oldTableDate, rowKeyName, {
          ...form.getFieldValue(rowKeyName),
          ...(data || {}),
        });
        form.setFieldsValue(updateValues);
      }
      form?.setFieldsValue(
        set(form?.getFieldsValue() || {}, context.listName, {
          ...(form?.getFieldValue(context.listName) || {}),
          ...(data || {}),
        })
      );
    },
    [context.listName, form]
  );

  const getCurrentRowData = useCallback(
    () => form?.getFieldValue(context.listName),
    [context.listName, form]
  );

  return {
    setCurrentRowData,
    getCurrentRowData,
  };
}
