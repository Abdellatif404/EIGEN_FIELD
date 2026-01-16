import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

const ChatPage = lazy(() => import('src/pages/chat'));
const UserPage = lazy(() => import('src/pages/user'));
const SignInPage = lazy(() => import('src/pages/sign-in'));
const Page404 = lazy(() => import('src/pages/page-not-found'));
const DashboardPage = lazy(() => import('src/pages/dashboard'));

const LoadingScreen = () => (
  <Box
    sx={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

// ----------------------------------------------------------------------

export const routesSection: RouteObject[] = [
  {
    element: (
      <DashboardLayout>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'farm-team', element: <UserPage /> },
    ],
  },
  {
    path: 'sign-in',
    element: (
      <AuthLayout>
        <Suspense fallback={<LoadingScreen />}>
          <SignInPage />
        </Suspense>
      </AuthLayout>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Page404 />
      </Suspense>
    ),
  },
];
