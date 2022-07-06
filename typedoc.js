module.exports = {
  entryPoints: [
    './src/',
  ],
  // entryPointStrategy: 'expand',
  tsconfig: './tsconfig.json',
  sort: ['static-first', 'instance-first', 'visibility', 'enum-value-ascending', 'required-first', 'alphabetical'],
  out: 'docs',
  // categoryOrder: ['Utils', '*'],
  // categorizeByGroup: false,
  defaultCategory: 'Common',
  visibilityFilters: {
    'protected': false,
    'private': false,
    'inherited': true,
    'external': true,
    '@alpha': false,
    '@beta': false
  }
}