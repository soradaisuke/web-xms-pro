const presets = [
  "@babel/preset-env",
  "@babel/preset-react",
  "@babel/preset-typescript"
];
const plugins = [
  "lodash",
  ["import", { 
    "libraryName": "antd", 
    "style": (name) => `${name.replace('/lib/', '/es/')}/style`
  }, "antd"],
  ["import", { "libraryName": "ahooks", "camel2DashComponentName": false }, "ahooks"],
  ["import", { "libraryName": "@ant-design/icons", "libraryDirectory": "lib/icons", "camel2DashComponentName": false }, "@ant-design/icons"],
  ["import", { "libraryName": "@qt/web-common", "camel2DashComponentName": false }, "@qt/web-common"],
  ["import", { "libraryName": "@qt/env", "camel2DashComponentName": false }, "@qt/env"]
];

module.exports = { presets, plugins };