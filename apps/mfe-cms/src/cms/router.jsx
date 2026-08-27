import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProviderDashboard from "./pages/ProviderDashboard";
import WebsiteSetup from "./pages/WebsiteSetup";
import Transactions from "./pages/Transactions";

export default function CMSRouter() {
  return (
    <Routes>
      <Route path="dashboard" element={<ProviderDashboard />} />
      <Route path="setup" element={<WebsiteSetup />} />
      <Route path="transactions" element={<Transactions />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}
