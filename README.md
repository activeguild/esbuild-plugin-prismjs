<h1 align="center">esbuild-plugin-prismjs ⚡ Welcome 😀</h1>

<p align="left">
  <a href="https://github.com/actions/setup-node"><img alt="GitHub Actions status" src="https://github.com/activeguild/esbuild-plugin-prismjs/workflows/automatic%20release/badge.svg" style="max-width:100%;"></a>
</p>

If you are using babel, please use [babel-plugin-prismjs](https://www.npmjs.com/package/babel-plugin-prismjs).

## Introduce

A [PrismJS](https://github.com/PrismJS/prisms) plugin for esbuild.
Bundle the language and plugins set in the configuration at build time.
The same options as [babel-plugin-prismjs](https://www.npmjs.com/package/babel-plugin-prismjs) are available.

## Install

```bash
npm i -D esbuild-plugin-prismjs

```

## Usage

```bash
import { prismPlugin } from 'esbuild-plugin-prismjs'
import { build } from 'esbuild'

build({
  entryPoints: ['./src/index.ts'],
  outdir: 'dist',
  bundle: true,
  minify: true,
  platform: 'node',
  plugins: [
    prismPlugin({
      languages: ['typescript', 'javascript', 'css', 'markup'],
      plugins: [
        'line-highlight',
        'line-numbers',
        'show-language',
        'copy-to-clipboard',
      ],
      theme: 'okaidia',
      css: true,
    }),
  ],
}).catch(() => process.exit(1))

```

## Options

The plugin option is [babel-plugin-prismjs](https://www.npmjs.com/package/babel-plugin-prismjs) and you can use the same option.

## Principles of conduct

Please see [the principles of conduct](https://github.com/activeguild/visualize-react-component/blob/master/.github/CONTRIBUTING.md) when building a site.

## License

This library is licensed under the [MIT license](https://github.com/activeguild/visualize-react-component/blob/master/LICENSE).
