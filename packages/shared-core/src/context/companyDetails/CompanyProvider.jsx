import { createContext, useContext, useEffect, useState } from "react";
import CallApi from "shared-api/services/dbIntr";
import {
  applyTheme,
  getStoredConfig,
  setStoredConfig,
} from "../../lib/theme";
import AppLoader from "shared-ui/components/ux/AppLoader";

export const AppContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // ✅ 1. Load cached config
      const cached = getStoredConfig();
      if (cached) {
        setConfig(cached);
        applyTheme(cached);
      }

      try {
        // ✅ 2. Fetch latest
        const res = await CallApi("GET_COMPANY_CONFIG");
        const data = res?.data || res;

        // ✅ 3. Multi-company support
        // Assume API returns { companyId, primaryColor, ... }

        if (JSON.stringify(data) !== JSON.stringify(cached)) {
          setStoredConfig(data);
          applyTheme(data);
          setConfig(data);
        }
      } catch (err) {
        console.error("Init failed", err);
      }

      setLoading(false);
    };

    init();
  }, []);

  if (loading) return <AppLoader />;

  return (
    <AppContext.Provider value={{ config }}>
      {children}
    </AppContext.Provider>
  );
};

export const useCompany = () => useContext(AppContext);
