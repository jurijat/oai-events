// YAML files are bundled as raw strings via the webpack asset/source rule in
// next.config.ts.
declare module '*.yml' {
  const content: string;
  export default content;
}

declare module '*.yaml' {
  const content: string;
  export default content;
}
