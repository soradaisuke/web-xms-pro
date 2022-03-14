import { useUrlSearchParams } from '@umijs/use-params';
import { useCallback, useState } from 'react';

export default function useSyncTabKeyToUrl(key: string, defaultTabKey: string) {
  const [params, setParams] = useUrlSearchParams();
  const [tabActiveKey, setTabActiveKey] = useState(
    String(params[key] || defaultTabKey)
  );
  const onTabChange = useCallback(
    (k) => {
      setTabActiveKey(k);
      setParams({ [key]: k });
    },
    [key, setParams]
  );

  return { tabActiveKey, onTabChange };
}
