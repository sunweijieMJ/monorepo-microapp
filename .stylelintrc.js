module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines'],
  plugins: ['stylelint-order'],
  rules: {
    'max-nesting-depth': 5, // 限制嵌套深度
    // 'selector-class-pattern': '^[a-z][a-zA-Z0-9_-]+$|^el-|^mz-', // 为类选择器指定一个匹配模式
    // 'declaration-block-trailing-semicolon': null, // 要求或禁止在声明块中使用拖尾分号
    // 'selector-max-id': 6, // 限制选择器中 ID 选择器的数量
    // 'selector-max-compound-selectors': 10, // 限制选择器中复合选择器的数量
    // 'selector-pseudo-element-no-unknown': [
    //   true,
    //   { ignorePseudoElements: ['v-deep'] },
    // ], // 禁止未知的伪类选择器
  },
};
