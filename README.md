<h1 align="center">esbuild-plugin-prismjs ⚡ Welcome 😀</h1>

<p align="left">
  <a href="https://github.com/actions/setup-node"><img alt="GitHub Actions status" src="https://github.com/activeguild/esbuild-plugin-prismjs/workflows/automatic%20release/badge.svg" style="max-width:100%;"></a>
</p>

If you are using babel, please use [babel-plugin-prismjs](https://www.npmjs.com/package/babel-plugin-prismjs).

## Introduce

This is a [prismjs](https://github.com/PrismJS/prism/blob/master/assets/style.css) plugin for esbuild.

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
})

```

## Options

The plugin option is [babel-plugin-prismjs](https://www.npmjs.com/package/babel-plugin-prismjs) and you can use the same option.

## Principles of conduct

Please see [the principles of conduct](https://github.com/activeguild/visualize-react-component/blob/master/.github/CONTRIBUTING.md) when building a site.

## License

This library is licensed under the [MIT license](https://github.com/activeguild/visualize-react-component/blob/master/LICENSE).
