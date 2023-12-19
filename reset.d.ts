import '@total-typescript/ts-reset'

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>

  export default content
}
