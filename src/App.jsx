import React from 'react';
import {
  createBrowserRouter,
  Link,
  Navigate,
  RouterProvider,
  redirect
} from "react-router-dom";
import { ToastProvider } from './components/ui/toast';
import { Toaster } from './components/ui/toaster';
import StorageContextProvider from './context/storage/StorageContextProvider';
import { Suspense } from 'react';
import AppLoader from './components/ux/AppLoader';
import { DcryptText } from './lib/Storage';
import AccountContextProvider from './context/account/AccountCOntextProvider';
import FinancialYearContextProvider from './context/financialYear/FinancialYearCOntextProvider';
import { useAppMenu } from './context/applicationMenu/ApplicationMenuContextProvider';
import ApplicationMenuContext from './context/applicationMenu/ApplicationMenuContext';
import { getMenusByActionURL } from './lib/utils';
const Auth = React.lazy(() => import('@/screens/auth/Layout'));
const SignIn = React.lazy(() => import('@/screens/auth/Signin'));
const Practice = React.lazy(() => import('@/screens/main/Practice/Practice'))
const StudentLayout = React.lazy(() => import('./layouts/Studentlayout'))
const StudentDashboard = React.lazy(() => import('@/screens/main/student/dashboard'))
function App() {
  const { rawMenus } = useAppMenu(ApplicationMenuContext)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Auth />,
      children: [
        {
          index: true,
          element: <SignIn />
        },
      ]
    },
    {
      path: 'practice',
      element: <Practice />
    },
    {
      path: 'student',
      element: <StudentLayout />,
      children: [
        {
          index: true,
          element: <StudentDashboard />
        },
      ]
    }


  ])

  return (
    <>
      <StorageContextProvider>
        <ToastProvider>
          <Toaster />
          <AccountContextProvider>
            <FinancialYearContextProvider>
              {/* <ApplicationMenuContextProvider> */}
              <Suspense fallback={<AppLoader background="bg-background" />}>
                <RouterProvider router={router} />
              </Suspense>
              {/* </ApplicationMenuContextProvider> */}
            </FinancialYearContextProvider>
          </AccountContextProvider>
        </ToastProvider>
      </StorageContextProvider>
    </>
  )
}

export default App

