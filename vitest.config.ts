import { defineConfig } from "vitest/config";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "wix-twix",
      fileName: (format) => `wix-twix.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {
          // Provide global variables to use in the UMD build
          // for externalized deps
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "node",
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [],
    },
  },
});
