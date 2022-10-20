module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-property-sort-order-smacss',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'max-nesting-depth': 15, // 限制嵌套深度
    'max-line-length': 200, // 最大行长度
    'scss/dollar-variable-pattern': [/$/, { ignore: 'global' }], // scss变量名忽略警告
    'selector-class-pattern': '^[a-zA-Z][a-zA-Z0-9_-]+$|^el-|^mz-', // 为类选择器指定一个匹配模式
    'declaration-block-trailing-semicolon': null, // 要求或禁止在声明块中使用拖尾分号
    'selector-max-id': 6, // 限制选择器中ID选择器的数量
    'selector-max-compound-selectors': 15, // 限制选择器中复合选择器的数量
    'color-function-notation': 'legacy', // 颜色函数符号
    'alpha-value-notation': ['number'], // 字母值表示法
    'keyframes-name-pattern': '^[a-zA-Z-]+$', // 动画名称匹配模式
    'custom-property-pattern': '^[a-zA-Z-]+$', // 自定义属性匹配模式
    'no-descending-specificity': null, // 禁止特异性较低的选择器在特异性较高的选择器之后重写
    'media-feature-name-no-vendor-prefix': null, // 不允许媒体功能名称使用供应商前缀
    'selector-pseudo-element-no-unknown': [
      true,
      { ignorePseudoElements: ['v-deep'] },
    ], // 禁止未知的伪类选择器
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['constant', 'env', 'fade-out', '-'],
      },
    ], // 禁用未知的函数
    'font-family-no-missing-generic-family-keyword': [
      true,
      {
        ignoreFontFamilies: ['iconfont'],
      },
    ], // 不允许在字体系列名称列表中缺少通用系列
    'value-no-vendor-prefix': [
      true,
      {
        ignoreValues: ['box'],
      },
    ], // 禁用值的浏览器前缀
    'at-rule-no-unknown': [
      // 未知规则的禁用
      true,
      {
        ignoreAtRules: [
          'use',
          'function',
          'if',
          'for',
          'each',
          'include',
          'extend',
          'mixin',
        ],
      },
    ],
  },
};
