import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ProblemSet from './pages/ProblemSet';
import ProblemDetails from './pages/ProblemDetails';

const AppLayout = () => {
  console.log("AppLayout Rendered");
  return (
      <div className="app">
        <Outlet />
      </div>
    
  );
};


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ProblemSet />,
    children: [
      {
        path: "/",
        element: <ProblemSet />,
      },
      {
        path: "/problemset",
        element: <ProblemSet />,
      },
      {
        path: "/problems/:problemSlug",
        element: <ProblemDetails />,
      },
    ]
  }
  
]);


export default () => <RouterProvider router={appRouter} />;