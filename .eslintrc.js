// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    root: true,
    env: {
        node: true,
        browser: true
    },
    globals: {
        process: true
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            tsx: true,
        }
    },
    extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended',
    ],
    plugins: [
      '@typescript-eslint',
      'prettier',
      'import',
      'html',
      'vue',
    ],
    overrides: [
      {
        files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
        rules: {
          'import/extensions': [
            'error',
            'ignorePackages',
            {
              'js': 'never',
              'jsx': 'never',
              'ts': 'never',
              'tsx': 'never'
            }
          ] // 忽略文件后缀
        },
      }
    ],
    settings: {
      'import/resolver': {
        alias: {
          extensions: ['.js', '.jsx', '.ts', 'tsx']
        }
      }
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ['warn', 'error'] }] : 'off', // 禁用 console
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 禁用 debugger
      'import/no-extraneous-dependencies': 'off', // 引入path报错
      '@typescript-eslint/no-explicit-any': 'off', // any警告

      'no-use-before-define': 'off', // 禁止定义前使用
      '@typescript-eslint/no-use-before-define': ['off'], // 禁止定义前使用
      'no-shadow': 'off', // 禁止变量声明覆盖外层作用域的变量
      'no-param-reassign': 'off', // 禁止对函数参数再赋值
      'no-plusplus': 'off', // 禁止使用一元表达式
      'func-names': 'off', // 要求或禁止使用命名的function表达式
      'import/prefer-default-export': 'off', // 需要有默认导出
      'prefer-destructuring': ['error', {'array': false, 'object': false}], // 优先使用数组和对象解构(不强制)
      'no-else-return': ['error',{allowElseIf: true}], // 禁止在else之前返回
      'consistent-return': 'off', // 要求return语句一致返回
      'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'], // 禁止指定的语法
      '@typescript-eslint/no-non-null-assertion': 'off', // 禁止非空断言
      'import/no-unresolved': ['error', { ignore: ['.css$'] }] // 忽略.css后缀名检查
    }
});
