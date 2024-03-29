import { ProFormInstance } from '@ant-design/pro-form';
import { FormListContext } from '@ant-design/pro-form/es/components/List';
import { set } from 'lodash';
import { useCallback, useContext } from 'react';

/**
 * 得到用于获取和修改当前Form.List的行数据的函数
 * @param form ProForm实例
 * @returns setCurrentRowData和getCurrentRowData
 * @group Pro Components
 * @category Pro Form
 */
export default function useFormListItemAction(form: ProFormInstance) {
  const context = useContext(FormListContext);

  const setCurrentRowData = useCallback(
    (data) => {
      form?.setFieldsValue(
        set(form?.getFieldsValue() || {}, context.listName, {
          ...(form?.getFieldValue(context.listName) || {}),
          ...(data || {}),
        }),
      );
    },
    [context.listName, form],
  );

  const getCurrentRowData = useCallback(
    () => form?.getFieldValue(context.listName),
    [context.listName, form],
  );

  return {
    setCurrentRowData,
    getCurrentRowData,
  };
}
