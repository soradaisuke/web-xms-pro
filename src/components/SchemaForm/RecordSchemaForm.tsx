import { BetaSchemaForm, DrawerFormProps, ModalFormProps, ProFormInstance } from '@ant-design/pro-form';
import { FormSchema, ProFormColumnsType } from '@ant-design/pro-form/lib/components/SchemaForm';
import { map } from 'lodash';
import React, { useCallback, useMemo, useRef } from 'react';
import { CommonRecord } from '../../types/common';
import { XMSFormColumns } from '../../types/form';
import { transformFormColumn } from '../../utils/transformColumn';
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

function RecordSchemaForm<T = CommonRecord>({
  record,
  columns,
  ...restProps
}: RecordSchemaFormProps<T>) {
  const formRef = useRef<ProFormInstance>();

  const onVisibleChange = useCallback((visible: boolean) => {
    if (visible) {
      formRef.current?.resetFields();
    }
  }, []);

  const newColumns = useMemo<ProFormColumnsType<T>[]>(() => map(columns, (col) => transformFormColumn(col, record)), [
    columns,
    record,
  ]);

  const formProps = useMemo(() => {
    const common = {
      ...restProps,
      formRef,
      columns: newColumns,
      omitNil: false,
    };
    if (restProps.layoutType === 'ModalForm') {
      return {
        ...common,
        onVisibleChange,
        modalProps: {
          ...((restProps as ModalFormProps<T>).modalProps ?? {}),
          destroyOnClose: true,
          forceRender: true,
        },
      };
    }
    if (restProps.layoutType === 'DrawerForm') {
      return {
        ...common,
        onVisibleChange,
        drawerProps: {
          ...((restProps as DrawerFormProps<T>).drawerProps ?? {}),
          destroyOnClose: true,
          forceRender: true,
        },
      };
    }
    return common;
  }, [newColumns, onVisibleChange, restProps]);

  return (
    <XmsProProvider>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <BetaSchemaForm
        {...formProps}
      />
    </XmsProProvider>
  );
}

RecordSchemaForm.defaultProps = {
  record: null,
};

export default RecordSchemaForm;
