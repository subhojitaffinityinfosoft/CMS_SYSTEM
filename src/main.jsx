import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';


// import '@mantine/core/styles.css';
// import '@mantine/dates/styles.css';
import './index.css';
import { getStoredConfig, applyTheme } from "@/lib/theme";


import { ThemeProvider } from './components/theme-provider.jsx'
import LoaderContextProvider from './context/loader/LoaderContextProvider.jsx'
import { GlobalLoader } from './services/dbIntr.jsx';
import ApplicationMenuContextProvider from './context/applicationMenu/ApplicationMenuContextProvider.jsx';
const cached = getStoredConfig();
if (cached) {
  applyTheme(cached);
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider defaultTheme="light" enableSystem attribute="class" storageKey="vite-ui-theme">
    <ApplicationMenuContextProvider>
      <LoaderContextProvider>
        <GlobalLoader />
          <App />
      </LoaderContextProvider>
    </ApplicationMenuContextProvider>
  </ThemeProvider>
)
