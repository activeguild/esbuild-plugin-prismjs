declare module 'prismjs/dependencies.js' {
  type Loader = {
    getIds: () => string[]
    load: LoadFunction
  }
  type ComponentEntry = {
    title: string
    owner: string
    noCSS: boolean
    alias: string | string[]
    aliasTitles: Record<string, string>
  }
  type LoadChainer<T> = {
    series: (before: T, after: () => T) => T
    parallel: (values: T[]) => T
  }
  type LoadFunction = <T>(
    loadComponent: (id: string) => T,
    chainer?: LoadChainer<T>
  ) => T
  const getLoader: (
    components: Record<string, Record<string, string | ComponentEntry>>,
    load: string[],
    loaded: string[]
  ) => Loader
  export default getLoader
}
