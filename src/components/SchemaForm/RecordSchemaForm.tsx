import React, { useCallback, useMemo, useRef } from 'react';
import { FormSchema } from '@ant-design/pro-form/lib/components/SchemaForm';
import {
  BetaSchemaForm,
  DrawerFormProps,
  ModalFormProps,
  ProFormInstance,
} from '@ant-design/pro-form';
import { isFunction, map, omit } from 'lodash';
import { ProSchema } from '@ant-design/pro-utils';
import { CommonRecord } from 'types/common';
import { XMSFormColumns } from 'types/form';

export type RecordSchemaFormProps<T = CommonRecord> = Omit<
  FormSchema<T>,
  'columns'
> & {
  columns: XMSFormColumns[];
  record?: T;
};

function makeMergedRender<T = CommonRecord>(
  renderFormItem: ProSchema['renderFormItem'],
  record: T
): ProSchema['renderFormItem'] {
  if (!renderFormItem) {
    return null;
  }
  return (schema, config, form) =>
    renderFormItem(
      schema,
      {
        ...config,
        record,
      },
      form
    );
}

function RecordSchemaForm<T = CommonRecord>({
  layoutType,
  columns,
  record,
  ...rest
}: RecordSchemaFormProps<T>) {
  const formRef = useRef<ProFormInstance>();

  const onVisibleChange = useCallback((visible: boolean) => {
    if (visible) {
      formRef.current?.resetFields();
    }
  }, []);

  const componentProps = useMemo(() => {
    if (layoutType === 'ModalForm') {
      return {
        onVisibleChange,
        modalProps: {
          ...((rest as ModalFormProps<T>).modalProps ?? {}),
          destroyOnClose: true,
          forceRender: true,
        },
      };
    }
    if (layoutType === 'DrawerForm') {
      return {
        onVisibleChange,
        drawerProps: {
          ...((rest as DrawerFormProps<T>).drawerProps ?? {}),
          destroyOnClose: true,
          forceRender: true,
        },
      };
    }
    return {};
  }, [layoutType, onVisibleChange, rest]);

  const newColumns = useMemo<FormSchema<T>['columns']>(() => {
    function transformColumn(col: XMSFormColumns) {
      const { valueType, initialValue, renderFormItem, columns: cols } = col;
      let newCol = {
        ...col,
      };

      if (renderFormItem) {
        newCol.renderFormItem = makeMergedRender(renderFormItem, record);
      }

      if (cols) {
        if (isFunction(cols)) {
          newCol.columns = (values) =>
            map(
              (cols as (values: CommonRecord) => XMSFormColumns[])(values),
              (c) => transformColumn(c)
            );
        } else {
          newCol.columns = map(newCol.columns, (c) => transformColumn(c));
        }
      }

      if (valueType === 'switch') {
        newCol.initialValue = initialValue || false;
      }

      if (record) {
        newCol = omit(newCol, 'initialValue');
      }

      return newCol;
    }

    return map(columns, (col) =>
      transformColumn(col)
    ) as FormSchema<T>['columns'];
  }, [columns, record]);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <BetaSchemaForm
      {...rest}
      {...componentProps}
      layoutType={layoutType}
      columns={newColumns}
      formRef={formRef}
      omitNil={false}
    />
  );
}

RecordSchemaForm.defaultProps = {
  record: null,
};

export default RecordSchemaForm;
