import { netlifyPlugin } from "@netlify/remix-adapter/plugin";
import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
installGlobals();

export default defineConfig({
  plugins: [remix(), netlifyPlugin(), tsconfigPaths()],
});
