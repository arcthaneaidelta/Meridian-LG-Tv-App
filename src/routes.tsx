import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/landing/LandingPage';
import { ConsoleShell } from './components/layout/ConsoleShell';
import { NotFound } from './pages/NotFound';
import { Skeleton } from './components/ui/Skeleton';

// Route-level code splitting via React.lazy
const Overview = lazy(() => import('./pages/console/Overview').then((m) => ({ default: m.Overview })));
const Simulator = lazy(() => import('./pages/console/Simulator').then((m) => ({ default: m.Simulator })));
const Review = lazy(() => import('./pages/console/Review').then((m) => ({ default: m.Review })));
const ResolutionLab = lazy(() => import('./pages/console/ResolutionLab').then((m) => ({ default: m.ResolutionLab })));
const ConfigValidator = lazy(() => import('./pages/console/ConfigValidator').then((m) => ({ default: m.ConfigValidator })));
const Build = lazy(() => import('./pages/console/Build').then((m) => ({ default: m.Build })));
const StoreAssets = lazy(() => import('./pages/console/StoreAssets').then((m) => ({ default: m.StoreAssets })));
const Submission = lazy(() => import('./pages/console/Submission').then((m) => ({ default: m.Submission })));
const Portfolio = lazy(() => import('./pages/console/Portfolio').then((m) => ({ default: m.Portfolio })));
const Report = lazy(() => import('./pages/console/Report').then((m) => ({ default: m.Report })));

const SuspenseLoader: React.FC = () => (
  <div className="space-y-4 p-6">
    <Skeleton variant="block" className="h-28" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Skeleton variant="block" className="h-20" />
      <Skeleton variant="block" className="h-20" />
      <Skeleton variant="block" className="h-20" />
      <Skeleton variant="block" className="h-20" />
    </div>
    <Skeleton variant="block" className="h-64" />
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/console',
    element: <ConsoleShell />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <Overview />
          </Suspense>
        ),
      },
      {
        path: 'simulator',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <Simulator />
          </Suspense>
        ),
      },
      {
        path: 'review',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <Review />
          </Suspense>
        ),
      },
      {
        path: 'resolution',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <ResolutionLab />
          </Suspense>
        ),
      },
      {
        path: 'config',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <ConfigValidator />
          </Suspense>
        ),
      },
      {
        path: 'build',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <Build />
          </Suspense>
        ),
      },
      {
        path: 'assets',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <StoreAssets />
          </Suspense>
        ),
      },
      {
        path: 'submission',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <Submission />
          </Suspense>
        ),
      },
      {
        path: 'portfolio',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <Portfolio />
          </Suspense>
        ),
      },
      {
        path: 'portfolio/:appId',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <Portfolio />
          </Suspense>
        ),
      },
      {
        path: 'report',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <Report />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
