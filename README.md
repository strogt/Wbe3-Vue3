# web3-wallet-app

1、创建 vue3 项目
vue create web3-wallet-app
2、安装 web3 第三方库
npm install web3 bip39 ethereumjs-tx@1.3.7 ethereumjs-util ethereumjs-wallet
3、安装 polyfill（垫片）
npm install node-polyfill-webpack-plugin -D
（webpack<5 的时候需要个叠片 npm i node-polyfill-webpack-plugin ）
npm add webpack@latest（安装最新 webpack）

配置 vant-ui ui 组件库
https://vant-contrib.gitee.io/vant/#/zh-CN
安装
$ npm i vant
$npm i unplugin-vue-components -D （防止版本过高产生的引用问题 v0.25.2——TypeError: ComponentsPlugin is not a function）

更改 vue.config.js:
const { defineConfig } = require('@vue/cli-service')
++ const { VantResolver } = require("unplugin-vue-components/resolvers");
++ const ComponentsPlugin = require("unplugin-vue-components/webpack");
++ const NodePolyfillWebpackPlugin = require("node-polyfill-webpack-plugin")

module.exports = defineConfig({
transpileDependencies: true,
configureWebpack: {
++ plugins: [
++ new NodePolyfillWebpackPlugin(),
++ ComponentsPlugin({ resolvers: [VantResolver()] })
++ ],
}})

plugins 争议（暂未仔细研究应该是 vue3 写法问题）
configureWebpack: {
plugins: [
new NodePolyfillWebpackPlugin(),
ComponentsPlugin({ resolvers: [VantResolver()] }),
],
},

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
