import { ProFormInstance } from '@ant-design/pro-form';
import ProList, { ProListMeta, ProListProps } from '@ant-design/pro-list';
import { ParamsType } from '@ant-design/pro-provider';
import { ActionType } from '@ant-design/pro-table';
import { SortOrder } from 'antd/lib/table/interface';
import { filter, find, isBoolean, isFunction, keyBy, mapValues, values } from 'lodash';
import React, { useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useMergedToolBarRender from '../hooks/useMergedToolBarRender';
import { useTableRequests } from '../hooks/useTableCRUDRequests';
import useUser from '../hooks/useUser';
import { XMSListMetas } from '../types';
import { CommonRecord } from '../types/common';
import defaultSyncToUrl from '../utils/defaultSyncToUrl';
import makeMergedRender from '../utils/makeMergedRender';
import { transformListColumn } from '../utils/transformColumn';
import { TableProps } from './Table';
import XmsProProvider from './XmsProProvider';

export type ListProps<T = CommonRecord, U = ParamsType> =
  & Omit<
    ProListProps<T, U>,
    'metas' | 'toolBarRender' | 'params'
  >
  & Pick<TableProps, 'requestConfig' | 'rowKey' | 'params' | 'toolBarRender'>
  & {
    metas: XMSListMetas;
  };

function List<T = CommonRecord, U = ParamsType>({
  rowKey,
  requestConfig,
  metas,
  toolBarRender,
  search,
  params,
  form,
  formRef: propsFormRef,
  actionRef: propsActionRef,
  ...rest
}: ListProps<T, U>) {
  const matchParams = useParams();
  const user = useUser();
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();

  useImperativeHandle(propsFormRef, () => formRef.current);
  useImperativeHandle(propsActionRef, () => actionRef.current);

  const {
    create,
    update,
    delete: del,
    retrieve,
  } = useTableRequests(requestConfig, matchParams, user, actionRef);

  const formattedMetas = useMemo<ProListProps<T, U>['metas']>(() => {
    const newMetas = mapValues(metas, (meta) => {
      const { render } = meta;
      return transformListColumn(
        meta,
        makeMergedRender(
          rowKey,
          render,
          update,
          del,
          user,
          matchParams,
        ),
      );
    }) as ProListProps<T, U>['metas'];

    const sortMetas = filter(
      newMetas,
      (meta) => meta.sortDirections?.length > 0 || !!meta.defaultSortOrder,
    );
    if (sortMetas.length > 0) {
      const initialSortMeta = find(newMetas, (meta) => !!meta.defaultSortOrder);
      newMetas.sort = {
        dataIndex: 'sort',
        title: '排序',
        valueType: 'formSet',
        initialValue: initialSortMeta
          ? [initialSortMeta.dataIndex, initialSortMeta.defaultSortOrder]
          : undefined,
        columns: [
          {
            valueEnum: mapValues(keyBy(sortMetas, 'dataIndex'), 'title'),
            initialValue: initialSortMeta?.dataIndex,
            fieldProps: find(sortMetas, 'fieldProps')?.fieldProps,
          },
          {
            valueEnum: {
              descend: '降序',
              ascend: '升序',
            },
            initialValue: initialSortMeta?.defaultSortOrder,
          },
        ],
      };
    }

    return newMetas;
  }, [del, matchParams, metas, rowKey, update, user]);

  const newSearch = useMemo<ListProps['search']>(() => {
    if (isBoolean(search)) {
      return search;
    }
    if (
      !find(
        values<ProListMeta<T>>(formattedMetas),
        (c) => c.search !== false && c.valueType !== 'option',
      )
    ) {
      return false;
    }
    return {
      defaultCollapsed: false,
      labelWidth: 'auto',
      ...(search || {}),
    };
  }, [formattedMetas, search]);

  const newForm = useMemo<ListProps['form']>(
    () => ({
      syncToInitialValues: false,
      ...(form || {}),
      syncToUrl: (data, type) => {
        if (isFunction(form?.syncToUrl)) {
          return form.syncToUrl(defaultSyncToUrl(data, type), type);
        }
        return defaultSyncToUrl(data, type);
      },
    }),
    [form],
  );

  const listRetrieve = useCallback(
    ({ sort, ...restParams }, _, f) =>
      retrieve(
        restParams,
        sort?.length === 2
          ? {
            [sort[0] as string]: sort[1] as SortOrder,
          }
          : {},
        f,
      ),
    [retrieve],
  );

  const mergedToolBarRender = useMergedToolBarRender(
    toolBarRender,
    create,
    formRef.current,
    matchParams,
    user,
  );

  return (
    <XmsProProvider>
      <ProList
        request={listRetrieve}
        {...rest}
        rowKey={rowKey}
        form={newForm}
        formRef={formRef}
        search={newSearch}
        params={isFunction(params) ? params(matchParams) : params}
        toolBarRender={mergedToolBarRender}
        metas={formattedMetas}
        actionRef={actionRef}
      />
    </XmsProProvider>
  );
}

export default List;
