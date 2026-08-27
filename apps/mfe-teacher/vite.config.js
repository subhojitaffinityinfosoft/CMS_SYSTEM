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
  "recharts"
];

export default defineConfig({
  envDir: workspaceRoot,
  server: {
    port: 5002,
    strictPort: true,
    cors: true,
    fs: {
      allow: [workspaceRoot],
    },
  },
  preview: {
    port: 5002,
    strictPort: true,
    cors: true,
  },
  plugins: [
    react(),
    federation({
      name: "mfe_teacher",
      filename: "remoteEntry.js",
      exposes: {
        "./TeacherDashboard": "./src/teacher/dashboard/index.jsx",
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
    target: "esnext",
    chunkSizeWarningLimit: 1800,
  },
});