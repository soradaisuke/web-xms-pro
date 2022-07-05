module.exports = {
  entryPoints: [
    './src/utils/',
  ],
  // entryPointStrategy: 'expand',
  tsconfig: './tsconfig.json',
  sort: ['static-first', 'instance-first', 'visibility', 'enum-value-ascending', 'required-first', 'alphabetical'],
  out: "docs",
}