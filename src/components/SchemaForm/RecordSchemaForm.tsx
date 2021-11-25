import React, { useCallback, useMemo, useRef } from 'react';
import { FormSchema } from '@ant-design/pro-form/lib/components/SchemaForm';
import { BetaSchemaForm, ProFormInstance } from '@ant-design/pro-form';
import { isFunction, map, omit, merge } from 'lodash';
import { ProSchema } from '@ant-design/pro-utils';
import { CommonRecord } from '../../types/common';
import { XMSFormColumns } from '../../types/form';

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

const RecordSchemaForm: React.FC<RecordSchemaFormProps> = function(props) {
  const { layoutType, modalProps = {}, columns, record } = props;
  const formRef = useRef<ProFormInstance>();

  const otherProps = useMemo(() => {
    if (layoutType === 'ModalForm') {
      return {
        modalProps: {
          ...modalProps,
          destroyOnClose: true,
        },
      };
    }
    return {};
  }, [layoutType, modalProps]);

  const onVisibleChange = useCallback((visible: boolean) => {
    if (visible) {
      formRef.current?.resetFields();
    }
  }, []);

  const newColumns = useMemo(() => {
    function transformColumn(col: XMSFormColumns) {
      const {
        valueType,
        initialValue,
        renderFormItem,
        formItemProps,
        fieldProps,
        columns: cols,
      } = col;
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

      if (valueType === 'formList') {
        newCol.fieldProps = merge({}, formItemProps, fieldProps);
      }

      if (record) {
        newCol = omit(newCol, 'initialValue');
      }

      return newCol;
    }

    return map(columns, (col) => transformColumn(col));
  }, [columns, record]);

  return (
    <BetaSchemaForm
      {...props}
      {...otherProps}
      columns={newColumns}
      formRef={formRef}
      onVisibleChange={onVisibleChange}
    />
  );
}

export default RecordSchemaForm;
