import { BetaSchemaForm, DrawerFormProps, FormItemProps, ModalFormProps, ProFormInstance } from '@ant-design/pro-form';
import { FormSchema } from '@ant-design/pro-form/lib/components/SchemaForm';
import { ProSchema } from '@ant-design/pro-utils';
import { find, isFunction, isPlainObject, isString, map, merge, omit, trim } from 'lodash';
import React, { useCallback, useMemo, useRef } from 'react';
import { CommonRecord } from '../../types/common';
import { XMSFormColumns } from '../../types/form';
import XmsProProvider from '../XmsProProvider';

export type RecordSchemaFormProps<T = CommonRecord> =
  & Omit<
    FormSchema<T>,
    'columns'
  >
  & {
    columns: XMSFormColumns[];
    record?: T;
  };

function makeMergedRender<T = CommonRecord>(
  renderFormItem: ProSchema['renderFormItem'],
  record: T,
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
      form,
    );
}

function insertRequired(formItemProps: FormItemProps, label?: string): FormItemProps {
  const newProps: FormItemProps = { ...formItemProps };
  if (formItemProps.rules) {
    newProps.rules = map(formItemProps.rules, (rule) => {
      if (isFunction(rule)) {
        return rule;
      }
      if (rule.required) {
        newProps.required = true;
        if (!rule.message && label) {
          return {
            ...rule,
            message: `请输入${label}`,
          };
        }
      }
      return rule;
    });
  }
  return newProps;
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
      const { valueType, title, initialValue, formItemProps, fieldProps, renderFormItem, columns: cols } = col;
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
              (c) => transformColumn(c),
            );
        } else {
          newCol.columns = map(newCol.columns, (c) => transformColumn(c));
        }
      }

      if (valueType === 'switch' || valueType === 'boolean') {
        newCol.initialValue = initialValue || false;

        if (valueType === 'boolean') {
          newCol.valueType = 'switch';
        }
      }

      if (valueType === 'object') {
        newCol = merge(newCol, {
          formItemProps: {
            rules: [
              {
                validator: (_, value) => {
                  if (isPlainObject(value)) {
                    return Promise.resolve();
                  }
                  if (trim(value)) {
                    try {
                      const result = JSON.parse(value);
                      if (!isPlainObject(result)) {
                        throw new Error();
                      }
                    } catch (err) {
                      return Promise.reject(
                        new Error(
                          '格式错误！例子：{"key1": "value1", "key2": "value2"}，其中除双引号里的内容以外的都要是英文字符',
                        ),
                      );
                    }
                  }
                  return Promise.resolve();
                },
              },
            ],
          },
        });
      }

      // 当valueType是formList时，formItemProps不生效，需要将formItemProps合并到fieldProps
      if (valueType === 'formList' && formItemProps) {
        if (isFunction(formItemProps)) {
          newCol.fieldProps = (...args) =>
            merge(
              isFunction(fieldProps) ? fieldProps(...args) : (fieldProps ?? {}),
              insertRequired(formItemProps(...args), isString(title) ? title : null),
            );
        } else if (isFunction(fieldProps)) {
          newCol.fieldProps = (...args) =>
            merge(
              fieldProps(...args),
              insertRequired(formItemProps, isString(title) ? title : null),
            );
        } else {
          newCol.fieldProps = merge(
            fieldProps ?? {},
            insertRequired(formItemProps, isString(title) ? title : null),
          );
        }
      }

      if (record) {
        newCol = omit(newCol, 'initialValue');
      }

      return newCol;
    }

    return map(columns, (col) => transformColumn(col)) as FormSchema<T>['columns'];
  }, [columns, record]);

  return (
    <XmsProProvider>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <BetaSchemaForm
        {...rest}
        {...componentProps}
        layoutType={layoutType}
        columns={newColumns}
        formRef={formRef}
        omitNil={false}
      />
    </XmsProProvider>
  );
}

RecordSchemaForm.defaultProps = {
  record: null,
};

export default RecordSchemaForm;
