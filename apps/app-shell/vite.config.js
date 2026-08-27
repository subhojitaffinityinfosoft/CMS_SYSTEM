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
    port: 3001,
    strictPort: true,
    cors: true,
    fs: {
      allow: [workspaceRoot],
    },
  },
  preview: {
    port: 3001,
    strictPort: true,
  },
  plugins: [
    react(),
    federation({
      name: "app_shell",
      remotes: {
        app_login: "http://localhost:5000/assets/remoteEntry.js",
        mfe_admin: "http://localhost:5001/assets/remoteEntry.js",
        mfe_teacher: "http://localhost:5002/assets/remoteEntry.js",
        mfe_student: "http://localhost:5003/assets/remoteEntry.js",
      },
      shared: sharedDependencies,
    }),
  ],
  resolve: {
    alias: [
      { find: "@", replacement: sharedUiSrc },
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
