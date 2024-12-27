import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginPrettier from 'eslint-plugin-prettier' // Plugin Prettier

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: [
      '**/node_modules/**', // Ignorar a pasta node_modules
      '**/dist/**', // Ignorar a pasta dist
      '**/*.test.js', // Ignorar arquivos de teste
      '**/*.spec.js', // Ignorar arquivos de teste
    ],
    files: ['**/*.{js,mjs,cjs,ts}'], // Arquivos analisados
    languageOptions: {
      globals: globals.node, // Globais do Node.js
      parser: tsParser, // Parser do TypeScript
    },
    plugins: {
      '@typescript-eslint': tseslint, // Plugin do TypeScript
      import: eslintPluginImport, // Plugin de importação
      prettier: eslintPluginPrettier, // Plugin Prettier
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          printWidth: 80,
          tabWidth: 2,
          singleQuote: true,
          trailingComma: 'all',
          arrowParens: 'always',
          semi: false,
        },
      ],
      semi: ['error', 'never'], // Não exige ponto e vírgula
      quotes: ['error', 'single'], // Usa aspas simples
      'no-console': 'off', // Permite console.log
      'no-unused-vars': 'warn', // Aviso para variáveis não utilizadas
      indent: ['error', 2], // Configura indentação para 2 espaços
      'max-len': [
        'error',
        {
          code: 80, // Máximo de 80 caracteres por linha
          ignoreUrls: true, // Ignora URLs
          ignoreStrings: true, // Ignora strings longas
          ignoreTemplateLiterals: true, // Ignora templates literais
        },
      ],
      'no-trailing-spaces': ['error'], // Não permite espaços no final das linhas
      'comma-spacing': ['error', { before: false, after: true }], // Espaço após vírgulas
    },
  },
  pluginJs.configs.recommended, // Configurações recomendadas do JavaScript
]
