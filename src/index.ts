/* eslint-disable @typescript-eslint/no-var-requires */
import type { Plugin } from 'esbuild'
import fs from 'fs'
import path from 'path'
import prismConfig from 'prismjs/components.js'
import getLoader from 'prismjs/dependencies.js'

type Category = 'plugins' | 'languages' | 'themes'

type PluginOptions = {
  languages: string | string[]
  plugins: string[]
  theme: string
  css: true
  inline?: boolean
}

export const prismPlugin = (options: PluginOptions): Plugin => {
  return {
    name: 'prismjs',
    setup(build) {
      build.onResolve({ filter: /^prismjs$/ }, (args) => {
        return {
          path: args.path,
          namespace: 'prismjs-ns',
        }
      })

      build.onLoad({ filter: /.*/, namespace: 'prismjs-ns' }, async () => {
        try {
          const finalOptions = getFiinalOptions(options)
          const loaded = ['prismjs/prism.js']
          const loadedPrismjs = getLoader(prismConfig, [
            ...finalOptions.languages,
            ...finalOptions.plugins,
          ])
            .getIds()
            .reduce((deps: string[], dep: string) => {
              const addPath = isPlugin(dep)
                ? getPluginPath(dep)
                : getLanguagePath(dep)
              const add = [`${addPath}.min.js`]
              if (
                finalOptions.css &&
                isPlugin(dep) &&
                !getNoCSS('plugins', dep)
              ) {
                add.unshift(getPluginPath(dep) + '.css')
              }

              return [...deps, ...add]
            }, []) as string[]

          loaded.push(...loadedPrismjs)

          const cssArr =
            finalOptions.css && finalOptions.theme
              ? [getThemePath(finalOptions.theme)]
              : []
          let contents = ''
          loaded.push(...cssArr)
          let css = ''

          for (const loadedPath of loaded) {
            const text = await fs.readFileSync(
              path.resolve(path.resolve(), `node_modules/${loadedPath}`),
              { encoding: 'utf8' }
            )
            if (loadedPath.endsWith('.js')) {
              contents = `${contents};${text}`
            } else {
              css = `${css}${text}`
            }
          }

          if (css) {
            const replacedCss = css.replace(/[\n]/g, '').replace(/\s+/g, ' ')
            if (finalOptions.inline) {
              const inlineStyleScript = makeInsertStyleScript(replacedCss)
              contents = `${contents};${inlineStyleScript}`
            } else {
              const outpurCssFilePath = path.resolve(
                build.initialOptions.outdir || './',
                'prism.css'
              )
              fs.writeFileSync(outpurCssFilePath, replacedCss)
            }
          }
          return {
            contents,
            loader: 'js',
          }
        } catch (e) {
          if (e instanceof Error) {
            return {
              errors: [
                {
                  pluginName: 'esbuild-plugin-prismjs',
                  text: e.message,
                  detail: e.stack,
                },
              ],
            }
          }
        }
      })
    },
  }
}

const getFiinalOptions = (options: PluginOptions): Required<PluginOptions> => {
  return {
    ...options,
    inline: options.inline === undefined ? true : options.inline,
    languages: getFiinalLanguages(options.languages),
  }
}

const getFiinalLanguages = (languages: string | string[]): string[] => {
  const finalLanguages: string[] = []
  if (typeof languages === 'string') {
    if (languages === 'all') {
      finalLanguages.push(
        ...Object.keys(prismConfig.languages).filter((lang) => lang !== 'meta')
      )
    } else {
      finalLanguages.push(languages)
    }
  } else {
    finalLanguages.push(...languages)
  }

  return finalLanguages
}
const getPath = (type: Category) => (name: string) =>
  `prismjs/${prismConfig[type].meta.path.replace(/\{id\}/g, name)}`
const isPlugin = (dep: string) => prismConfig.plugins[dep] != null
const getNoCSS = (type: 'plugins', name: string) =>
  !!prismConfig[type][name].noCSS
const getThemePath = (theme: string) => {
  if (theme.includes('/')) {
    const [themePackage, themeName] = theme.split('/')
    return `${themePackage}/themes/prism-${themeName}.css`
  }
  if (theme === 'default') {
    theme = 'prism'
  } else {
    theme = `prism-${theme}`
  }

  return getPath('themes')(theme)
}
const getPluginPath = getPath('plugins')
const getLanguagePath = getPath('languages')
const makeInsertStyleScript = (
  style: string
) => `var styleTag = document.createElement('style');
styleTag.innerText = \`${style}\`;
document.getElementsByTagName('head')[0].insertAdjacentElement('beforeend', styleTag);`
