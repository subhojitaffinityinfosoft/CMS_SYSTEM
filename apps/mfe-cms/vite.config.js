import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import { fileURLToPath, URL } from "url";
import path from "path";

const appDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(appDir, "../..");

const sharedDependencies = [
  "react",
  "react-dom",
  "react-router-dom",
  "recharts"
];

export default defineConfig({
  envDir: workspaceRoot,
  server: {
    port: 5004, // mfe-cms will run on 5004
  },
  preview: {
    port: 5004,
  },
  plugins: [
    react(),
    federation({
      name: "mfe_cms",
      filename: "remoteEntry.js",
      exposes: {
        "./CMSRouter": "./src/cms/router.jsx",
        "./CMSLogin": "./src/cms/pages/CMSLogin.jsx",
      },
      shared: sharedDependencies,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("../../packages/shared-ui/src", import.meta.url)),
      "shared-ui": fileURLToPath(new URL("../../packages/shared-ui/src", import.meta.url)),
      "shared-core": fileURLToPath(new URL("../../packages/shared-core/src", import.meta.url)),
      "shared-api": fileURLToPath(new URL("../../packages/shared-api/src", import.meta.url)),
    },
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
