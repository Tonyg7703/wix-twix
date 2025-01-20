import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "wix-twix",
      fileName: (format) => `${format}/index.js`,
    },
    rollupOptions: {
      external: [],
      output: [
        {
          dir: "dist/es",
          format: "esm",
          entryFileNames: "[name].js",
          chunkFileNames: "chunks/[name].js",
          preserveModules: true,
        },
        {
          dir: "dist/cjs",
          format: "cjs",
          entryFileNames: "[name].js",
          chunkFileNames: "chunks/[name].js",
          preserveModules: true,
        },
      ],
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
  plugins: [
    dts({
      outDir: ["dist/es", "dist/cjs"],
    }),
  ],
});
