import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";
import { fileURLToPath } from "url";

const appDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(appDir, "../..");
const sharedUiSrc = path.resolve(workspaceRoot, "packages/shared-ui/src");
const sharedCoreSrc = path.resolve(workspaceRoot, "packages/shared-core/src");
const sharedApiSrc = path.resolve(workspaceRoot, "packages/shared-api/src");

const sharedDependencies = [
  "react",
  "react-dom",
  "react-router-dom",
  "shared-ui",
  "shared-core",
  "shared-api",
];

export default defineConfig({
  envDir: workspaceRoot,
  server: {
    port: 5000,
    strictPort: true,
    cors: true,
    fs: {
      allow: [workspaceRoot],
    },
  },
  preview: {
    port: 5000,
    strictPort: true,
  },
  plugins: [
    react(),
    federation({
      name: "app_login",
      filename: "remoteEntry.js",
      exposes: {
        "./Layout": "./src/auth/Layout.jsx",
        "./Signin": "./src/auth/Signin.jsx",
      },
      shared: sharedDependencies,
    }),
  ],
  resolve: {
    alias: [
      // 🟢 FIXED: Now @ points to app-login/src
      { find: "@", replacement: path.resolve(appDir, "src") },
      { find: /^shared-ui\/(.*)$/, replacement: `${sharedUiSrc}/$1` },
      { find: /^shared-core\/(.*)$/, replacement: `${sharedCoreSrc}/$1` },
      { find: /^shared-api\/(.*)$/, replacement: `${sharedApiSrc}/$1` },
    ],
  },
  build: {
    target: "esnext",
    chunkSizeWarningLimit: 1800,
  },
});