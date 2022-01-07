import { build } from 'esbuild'

build({
  entryPoints: ['./src/index.ts'],
  outdir: 'dist',
  bundle: true,
  minify: true,
  platform: 'node',
}).catch(() => process.exit(1))
