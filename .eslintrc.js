/*
 * @Description:
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2020-01-04 14:36:09
 * @LastEditors  : yilingsj（315800015@qq.com）
 * @LastEditTime : 2020-01-10 11:08:05
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard', '@vue/typescript'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0 //括号前0空格
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
