import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import "shared-ui/index.css";
import { getStoredConfig, applyTheme } from "shared-core";
import { ThemeProvider } from "shared-ui";
import { ApplicationMenuContextProvider, LoaderContextProvider } from "shared-core";
import { GlobalLoader } from "shared-api";
const cached = getStoredConfig();
if (cached) {
  applyTheme(cached);
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" enableSystem attribute="class" storageKey="vite-ui-theme">
      <ApplicationMenuContextProvider>
        <LoaderContextProvider>
          <GlobalLoader />
            <App />
        </LoaderContextProvider>
      </ApplicationMenuContextProvider>
    </ThemeProvider>
  </React.StrictMode>
)
