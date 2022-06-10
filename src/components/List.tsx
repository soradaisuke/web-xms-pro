import React, { useMemo, useRef } from 'react';
import { ActionType } from '@ant-design/pro-table';
import ProList, { ProListMeta, ProListProps } from '@ant-design/pro-list';
import { find, get, isBoolean, isFunction, mapValues, values } from 'lodash';
import { useParams } from 'react-router-dom';
import { ProFormInstance } from '@ant-design/pro-form';
import { ParamsType } from '@ant-design/pro-provider';
import { CommonRecord } from '../types/common';
import { useTableRequests } from '../hooks/useTableCRUDRequests';
import makeLinkRender from '../utils/makeLinkRender';
import useUser from '../hooks/useUser';
import { TableProps } from './Table';
import { XMSListMetas } from '../types';
import defaultSyncToUrl from '../utils/defaultSyncToUrl';
import useMergedToolBarRender from '../hooks/useMergedToolBarRender';
import makeMergedRender from '../utils/makeMergedRender';

export type ListProps<T = CommonRecord, U = ParamsType> = Omit<
  ProListProps<T, U>,
  'metas' | 'toolBarRender' | 'params'
> &
  Pick<TableProps, 'requestConfig' | 'rowKey' | 'params' | 'toolBarRender'> & {
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
  ...rest
}: ListProps<T, U>) {
  const matchParams = useParams();
  const user = useUser();
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();

  const {
    create,
    update,
    delete: del,
    retrieve,
  } = useTableRequests(requestConfig, matchParams, user, actionRef);

  const newMetas = useMemo<ProListProps<T, U>['metas']>(
    () =>
      mapValues(metas, (meta) => {
        const { link, render, valueType } = meta;
        const newMeta = {
          ...meta,
          render: makeMergedRender(
            rowKey,
            render,
            update,
            del,
            user,
            matchParams
          ),
        };
        if (link && !render) {
          newMeta.render = makeLinkRender(link);
        }
        if (
          valueType === 'image' ||
          get(meta, ['valueType', 'type']) === 'image'
        ) {
          newMeta.search = false;
        }
        if (valueType === 'image') {
          newMeta.valueType = {
            type: 'image',
            width: 100,
          };
        }
        return newMeta;
      }) as ProListProps<T, U>['metas'],
    [del, matchParams, metas, rowKey, update, user]
  );

  const newSearch = useMemo<ListProps['search']>(() => {
    if (isBoolean(search)) {
      return search;
    }
    if (
      !find(
        values<ProListMeta<T>>(newMetas),
        (c) => c.search !== false && c.valueType !== 'option'
      )
    ) {
      return false;
    }
    return {
      defaultCollapsed: false,
      labelWidth: 'auto',
      ...(search || {}),
    };
  }, [newMetas, search]);

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
    [form]
  );

  const mergedToolBarRender = useMergedToolBarRender(
    toolBarRender,
    create,
    formRef.current,
    matchParams,
    user
  );

  return (
    <ProList
      request={retrieve}
      {...rest}
      rowKey={rowKey}
      form={newForm}
      formRef={formRef}
      search={newSearch}
      params={isFunction(params) ? params(matchParams) : params}
      toolBarRender={mergedToolBarRender}
      metas={newMetas}
      actionRef={actionRef}
    />
  );
}

export default List;
