import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import 'shared-ui/src/index.css'; 
import { ThemeProvider } from "shared-ui";
import SignIn from "./auth/Signin";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);