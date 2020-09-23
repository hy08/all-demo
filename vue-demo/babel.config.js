module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  // ant-design 按需加载
  plugins: [
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
};
