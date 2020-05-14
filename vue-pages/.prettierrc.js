/**
 * pretiier 标准配置
 */
module.exports = {
  // 在ES5中有效的结尾逗号（对象，数组等）
  trailingComma: 'es5',
  // 添加分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 在Vue文件中缩进脚本和样式标签。
  vueIndentScriptAndStyle: true,
  // 一行最多 100 字符
  printWidth: 100,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: true,
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  endOfLine: 'crlf',
};
