import { FormItemProps, ProFormColumnsType } from '@ant-design/pro-form';
import { ProListMeta } from '@ant-design/pro-list';
import { ProColumns } from '@ant-design/pro-table';
import { get, isFunction, isPlainObject, isString, map, merge, omit, toNumber, trim } from 'lodash';
import makeLinkRender from './makeLinkRender';
import { CommonRecord, XMSFormColumns, XMSListMeta, XMSTableColumns } from '../types';
import generateValueEnum from './generateValueEnum';
import makeMergedRenderFormItem from './makeMergeRenderFormItem';

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

function transformLinkRender<T = CommonRecord>(src: XMSTableColumns<T>, dst: ProColumns<T>) {
  const { link, render } = src;

  if (link && !render) {
    // eslint-disable-next-line no-param-reassign
    dst.render = makeLinkRender(link);
  }
}

function transformSorter<T = CommonRecord>(src: XMSTableColumns<T>, dst: ProColumns<T>) {
  const { sortDirections, defaultSortOrder } = src;

  if (sortDirections || defaultSortOrder) {
    // eslint-disable-next-line no-param-reassign
    dst.sorter = true;
  }
}

function transformImage<T = CommonRecord>(src: XMSTableColumns<T>, dst: ProColumns<T>) {
  const { valueType, width } = src;
  if (
    valueType === 'image'
    || get(src, ['valueType', 'type']) === 'image'
  ) {
    // eslint-disable-next-line no-param-reassign
    dst.search = false;
    if (valueType === 'image') {
      // eslint-disable-next-line no-param-reassign
      dst.valueType = {
        type: 'image',
        width: toNumber(width) ?? 100,
      };
    }
  }
}

function transformBoolean<T = CommonRecord>(
  src: XMSTableColumns<T> | XMSFormColumns<T>,
  dst: ProColumns<T>,
  forForm: boolean,
) {
  const { valueEnum, valueType, initialValue } = src;

  if (valueType === 'boolean') {
    if (!valueEnum) {
      // eslint-disable-next-line no-param-reassign
      dst.valueEnum = generateValueEnum([
        {
          text: '是',
          value: true,
        },
        {
          text: '否',
          value: false,
        },
      ]);
    }
    if (forForm) {
      // eslint-disable-next-line no-param-reassign
      dst.initialValue = initialValue || false;
      // eslint-disable-next-line no-param-reassign
      dst.valueType = 'switch';
    }
  }
}

function transformSwitch<T = CommonRecord>(src: XMSFormColumns<T>, dst: ProColumns<T>) {
  const { valueType, initialValue } = src;

  if (valueType === 'switch') {
    // eslint-disable-next-line no-param-reassign
    dst.initialValue = initialValue || false;
  }
}

function transformObject<T = CommonRecord>(src: XMSFormColumns<T>, dst: ProColumns<T>) {
  const { valueType, formItemProps } = src;

  if (valueType === 'object') {
    // eslint-disable-next-line no-param-reassign
    dst.formItemProps = merge(formItemProps ?? {}, {
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
    });
  }
}

function transformFormList<T = CommonRecord>(src: XMSFormColumns<T>, dst: ProColumns<T>) {
  const { valueType, formItemProps, fieldProps, title } = src;

  // 当valueType是formList时，formItemProps不生效，需要将formItemProps合并到fieldProps
  if (valueType === 'formList' && formItemProps) {
    if (isFunction(formItemProps)) {
      // eslint-disable-next-line no-param-reassign
      dst.fieldProps = (...args) =>
        merge(
          isFunction(fieldProps) ? fieldProps(...args) : (fieldProps ?? {}),
          insertRequired(formItemProps(...args), isString(title) ? title : null),
        );
    } else if (isFunction(fieldProps)) {
      // eslint-disable-next-line no-param-reassign
      dst.fieldProps = (...args) =>
        merge(
          fieldProps(...args),
          insertRequired(formItemProps, isString(title) ? title : null),
        );
    } else {
      // eslint-disable-next-line no-param-reassign
      dst.fieldProps = merge(
        fieldProps ?? {},
        insertRequired(formItemProps, isString(title) ? title : null),
      );
    }
  }
}

export function transformTableColumn<T = CommonRecord>(
  src: XMSTableColumns<T>,
  mergedRender: ProColumns['render'],
): ProColumns<T> {
  const col = {
    ...src,
    render: mergedRender,
  };

  transformLinkRender(src, col as ProColumns<T>);
  transformImage(src, col as ProColumns<T>);
  transformBoolean(src, col as ProColumns<T>, false);
  transformSorter(src, col as ProColumns<T>);

  return col as ProColumns<T>;
}

export function transformListColumn<T = CommonRecord>(
  src: XMSListMeta<T>,
  mergedRender: ProColumns['render'],
): ProListMeta<T> {
  const meta = {
    ...src,
    render: mergedRender,
  };

  transformLinkRender(src, meta as ProColumns<T>);
  transformImage(src, meta as ProColumns<T>);
  transformBoolean(src, meta as ProColumns<T>, false);

  return meta as ProListMeta<T>;
}

export function transformFormColumn<T = CommonRecord>(col: XMSFormColumns<T>, record?: T): ProFormColumnsType<T> {
  const { renderFormItem, columns: cols } = col;
  let newCol = {
    ...col,
    renderFormItem: makeMergedRenderFormItem(renderFormItem, record),
  };

  if (cols) {
    if (isFunction(cols)) {
      newCol.columns = (values) =>
        map(
          (cols as (values: CommonRecord) => XMSFormColumns[])(values),
          (c) => transformFormColumn(c),
        );
    } else {
      newCol.columns = map(newCol.columns, (c) => transformFormColumn(c));
    }
  }

  transformBoolean(col, newCol as ProColumns<T>, true);
  transformSwitch(col, newCol as ProColumns<T>);
  transformObject(col, newCol as ProColumns<T>);
  transformFormList(col, newCol as ProColumns<T>);

  if (record) {
    newCol = omit(newCol, 'initialValue');
  }

  return newCol as ProFormColumnsType<T>;
}
