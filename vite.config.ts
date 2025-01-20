import { defineConfig } from "vitest/config";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "wix-twix",
      fileName: (format) => `${format}/index.js`,
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
    sourcemap: true,
    minify: "esbuild",
  },
  test: {
    globals: true,
    environment: "node",
    coverage: {
      reporter: ["text", "json", "html"], // Coverage reporters
      all: true, // Include all files for coverage (not just the tested ones)
      exclude: ["node_modules", "dist"], // Exclude certain files/folders
    },
    include: ["tests/**/*.test.ts"], // Specify test file patterns
    exclude: ["node_modules", "dist"], // Exclude folders
  },
});
