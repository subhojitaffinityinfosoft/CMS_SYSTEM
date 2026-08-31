import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppLoader } from "shared-ui";

const ProviderDashboard = lazy(() => import("./pages/ProviderDashboard"));
const WebsiteSetup = lazy(() => import("./pages/WebsiteSetup"));
const Transactions = lazy(() => import("./pages/Transactions"));

const Loadable = (Component) => (props) => (
  <Suspense fallback={<AppLoader />}>
    <Component {...props} />
  </Suspense>
);

export default function CMSRouter() {
  return (
    <Routes>
      <Route path="dashboard" element={Loadable(ProviderDashboard)({})} />
      <Route path="setup" element={Loadable(WebsiteSetup)({})} />
      <Route path="transactions" element={Loadable(Transactions)({})} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}
