import React, { useCallback, useMemo, useRef } from 'react';
import { ActionType } from '@ant-design/pro-table';
import ProList, { ProListMeta, ProListProps } from '@ant-design/pro-list';
import { SortOrder } from 'antd/lib/table/interface';
import {
  filter,
  find,
  get,
  isBoolean,
  isFunction,
  keyBy,
  mapValues,
  values,
} from 'lodash';
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

  const formattedMetas = useMemo<ProListProps<T, U>['metas']>(() => {
    const newMetas = mapValues(metas, (meta) => {
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
    }) as ProListProps<T, U>['metas'];

    const sortMetas = filter(
      newMetas,
      (meta) => meta.sortDirections?.length > 0 || !!meta.defaultSortOrder
    );
    if (sortMetas.length > 0) {
      newMetas.sort = {
        dataIndex: 'sort',
        title: '排序',
        valueType: 'formSet',
        columns: [
          {
            valueEnum: mapValues(keyBy(sortMetas, 'dataIndex'), 'title'),
            initialValue: find(newMetas, (meta) => !!meta.defaultSortOrder)
              ?.dataIndex,
            fieldProps: {
              width: 150,
            },
          },
          {
            valueEnum: {
              descend: '降序',
              asced: '升序',
            },
            initialValue: find(newMetas, (meta) => !!meta.defaultSortOrder)
              ?.defaultSortOrder,
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
    [form]
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
        f
      ),
    [retrieve]
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
  );
}

export default List;
