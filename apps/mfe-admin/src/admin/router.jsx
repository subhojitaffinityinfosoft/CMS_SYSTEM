import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./dashboard";

export default function AdminRouter() {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}
