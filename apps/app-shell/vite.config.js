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

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
    cors: true,
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
      shared: ["react", "react-dom", "react-router-dom"],
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
    modulePreload: false,
    minify: false,
    cssCodeSplit: false,
  },
});