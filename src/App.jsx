import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Progress from './components/Progress'

const ProblemSet = lazy(() => import('./pages/ProblemSet'))
const ProblemDetails = lazy(() => import('./pages/ProblemDetails'))
const Error = lazy(() => import('./pages/Error'))

const AppLayout = () => {
  console.log('AppLayout Rendered')
  return (
    <div className="app">
      <Outlet />
    </div>
  )
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Progress />}>
            <ProblemSet />
          </Suspense>
        ),
      },
      {
        path: '/problemset',
        element: (
          <Suspense fallback={<Progress />}>
            <ProblemSet />
          </Suspense>
        ),
      },
      {
        path: '/problems/:problemSlug',
        element: (
          <Suspense fallback={<Progress />}>
            <ProblemDetails />{' '}
          </Suspense>
        ),
      },
    ],
  },
])
const AppRouter = () => <RouterProvider router={appRouter} />

export default AppRouter
