import React from "react";
import ReactDOM from "react-dom/client";
import "shared-ui/index.css";
import AdminDashboard from "./admin/dashboard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminDashboard />
  </React.StrictMode>
);
