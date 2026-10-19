import { lazy, Suspense } from 'react';
import { LoadingScreen } from '@/shared/components/LoadingScreen';

const PortfolioPage = lazy(() => import('@/features/portfolio/PortfolioPage'));

export function AppRouter() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <PortfolioPage />
    </Suspense>
  );
}
