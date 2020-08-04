/**
 * prettier 标准配置
 */
module.exports = {
  // 在ES5中有效的结尾逗号（对象，数组等）
  trailingComma: 'es5',
  // 指定代码换行的行长度。单行代码宽度超过指定的最大宽度，将会换行，如果都不想换，可以添加 "proseWrap": "never"
  printWidth: 140,
  // 添加分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 在Vue文件中缩进脚本和样式标签。
  vueIndentScriptAndStyle: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'avoid',
  // 结尾换行问题
  endOfLine: 'auto',
  // html结束标签自动换行问题
  htmlWhitespaceSensitivity: 'ignore',
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
  ],
};
