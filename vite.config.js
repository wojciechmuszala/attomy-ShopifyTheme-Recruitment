import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: ".",
  build: {
    outDir: "assets",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/js/main.js"),
        style: path.resolve(__dirname, "src/scss/style.scss"),
      },
      output: {
        entryFileNames: "attomy.js",
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || "";
          if (
            typeof name === "string" &&
            name.endsWith(".css") &&
            name.includes("style")
          ) {
            return "attomy.css";
          }
          return "[name].[ext]";
        },
      },
    },
  },
});
