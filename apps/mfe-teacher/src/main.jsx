import React from "react";
import ReactDOM from "react-dom/client";
import "shared-ui/index.css";
import TeacherDashboard from "./teacher/dashboard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TeacherDashboard />
  </React.StrictMode>
);
