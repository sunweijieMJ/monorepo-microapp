module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-property-sort-order-smacss',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'max-nesting-depth': 10, // 限制嵌套深度
    'scss/dollar-variable-pattern': [/$/, { ignore: 'global' }], // scss 变量名忽略警告
    'selector-class-pattern': '^[a-z][a-zA-Z0-9_-]+$|^el-|^mz-', // 为类选择器指定一个匹配模式
    'declaration-block-trailing-semicolon': null, // 要求或禁止在声明块中使用拖尾分号
    'selector-max-id': 6, // 限制选择器中 ID 选择器的数量
    'selector-max-compound-selectors': 15, // 限制选择器中复合选择器的数量
    'color-function-notation': 'legacy', // 颜色函数符号
    'alpha-value-notation': ['number'], // 字母值表示法
    'keyframes-name-pattern': '^[a-zA-Z-]+$', // 动画名称匹配模式
    'custom-property-pattern': '^[a-zA-Z-]+$', // 自定义属性匹配模式
    'selector-pseudo-element-no-unknown': [
      true,
      { ignorePseudoElements: ['v-deep'] },
    ], // 禁止未知的伪类选择器
    'function-no-unknown': [
      // 禁用未知的函数
      true,
      {
        ignoreFunctions: ['constant', 'env', 'fade-out', '-'],
      },
    ],
  },
};
