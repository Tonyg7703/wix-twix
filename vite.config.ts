import { defineConfig } from 'vitest/config';
import fs from 'fs';
import path from 'path';
import dts from 'vite-plugin-dts';

const currentDir = path.resolve(process.cwd(), __dirname);
const buildDir = 'dist';
const esmDir = `${buildDir}/es`;
const cjsDir = `${buildDir}/cjs`;

function resetBuildDir(name: string) {
  const buildPath = path.resolve(currentDir, name);
  if (fs.existsSync(buildPath)) {
    fs.rmSync(buildPath, { force: true, recursive: true });
    fs.mkdirSync(buildPath);
  }
}

function rollupOption(format: 'esm' | 'cjs') {
  const dir = format === 'esm' ? esmDir : cjsDir;
  const preserveModules = true;
  const chunkFileNames = 'chunks/[name].js';
  const entryFileNames = ({ name, moduleIds }) => {
    const { ext } = path.parse(moduleIds[0]);
    if (ext === '.ts') return `${name}.js`;
    return `${name}${ext}`;
  };

  return { dir, format, entryFileNames, chunkFileNames, preserveModules };
}

export default defineConfig(({ command }) => {
  if (command === 'build') {
    resetBuildDir(buildDir);
  }

  return {
    build: {
      lib: {
        name: 'wix-twix',
        entry: 'src/index.ts',
        fileName: (format) => `${format}/index.js`,
      },
      rollupOptions: {
        external: ['@wix/sdk'],
        output: [rollupOption('esm'), rollupOption('cjs')],
      },
      sourcemap: true,
      minify: 'esbuild',
    },
    plugins: [
      dts({
        outDir: [esmDir, cjsDir],
        exclude: ['tests', 'node_modules', buildDir],
      }),
    ],
  };
});
