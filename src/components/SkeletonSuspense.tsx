import { Skeleton } from 'antd';
import React, { Suspense, SuspenseProps } from 'react';
import Page from './Page';

export default function SkeletonSuspense({ children, fallback }: SuspenseProps) {
  return (
    <Suspense
      fallback={fallback || (
        <Page>
          <Skeleton />
        </Page>
      )}
    >
      {children}
    </Suspense>
  );
}
