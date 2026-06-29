import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  typescript: true,
  ignores: ['**/dist/**', '**/node_modules/**', '**/public/**', '**/.agents/**', '**/.claude/**'],
  rules: {
    'node/prefer-global/process': 'off',
    'array-bracket-spacing': 'off',
    'unused-imports/no-unused-vars': 'warn',
    'unused-imports/no-unused-imports': 'warn',
    'e18e/prefer-static-regex': 'warn',
    'one-var': 'off',
    'no-console': 'off',
    'jsdoc/check-param-names': 'off',
    'curly': ['warn', 'multi-or-nest'],
    'antfu/if-newline': 'off',
    'antfu/curly': 'off',
    'antfu/consistent-list-newline': 'off',
    'brace-style': 'off',
    'style/no-tabs': 'warn',
    'ts/ban-ts-comment': 'off',
    'no-restricted-imports': ['error', {
      patterns: [{
        regex: '^\\.\\.\\/\\.\\.\\/',
        message: 'Use path aliases (~/...) instead of imports 2+ levels up.',
      }],
    }],
    'perfectionist/sort-imports': ['error', {
      groups: [
        ['type-internal', 'type-parent', 'type-sibling', 'type-index'],
        'type-import',
        'value-builtin',
        'value-internal',
        ['value-parent', 'value-sibling', 'value-index'],
        'value-external',
        'side-effect',
        'ts-equals-import',
        'unknown',
      ],
      newlinesBetween: 'ignore',
      newlinesInside: 'ignore',
      order: 'asc',
      type: 'natural',
    }],
  },
})
