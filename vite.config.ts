import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      "@reactables/core",
      "@reactables/react",
      "@reactables/web-workers",
    ],
  },
  build: {
    commonjsOptions: {
      include: [/reactables/, /node_modules/],
    },
  },
});
