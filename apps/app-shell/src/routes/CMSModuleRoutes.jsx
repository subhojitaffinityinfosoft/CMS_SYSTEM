import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AppLoader } from "shared-ui";
import CMSLayout from "../layouts/CMSLayout";

const Loadable = (Component) => (props) => (
  <Suspense fallback={<AppLoader />}>
    <Component {...props} />
  </Suspense>
);

const CMSLogin = Loadable(lazy(() => import("mfe_cms/CMSLogin")));
const CMSRouter = Loadable(lazy(() => import("mfe_cms/CMSRouter")));

export default function CMSModuleRoutes() {
  return (
    <Routes>
      <Route path="login" element={<CMSLogin />} />
      <Route element={<CMSLayout />}>
        <Route path="*" element={<CMSRouter />} />
      </Route>
    </Routes>
  );
}
