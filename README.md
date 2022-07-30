
# 前端架构脚手架

该脚手架采用SPA+MPA混合开发的形式，采用的具体技术如下：

> * React 16.8 + Mobx
> * Webpack4
> * awilix
> * TypeScript

![cmd-markdown-logo](https://www.yidengxuetang.com/static/common/static/images/logo_01c8731.png)

系统通过本项目能够助力于各位完成简历项目的完整度：

### [Windows/Mac/Linux 全平台运行](https://www.yidengfe.com//)

> 官网建议采用 `Linux` 平台运行，如下是项目的一些注意事项。

------

## 登录
用户名：admin
密码: admin
------
## 🏠具体配置说明项

**备用** + *说明* 共同构成

### 1. 使用scripty无法运行脚本如何处理
```shell
chmod -R +x scripts
```

### 2. pm2.json上线配置脚本文件

```json
{
    "//_comment1": "项目名字",
    "name": "ydapp",
    "//_comment2": "设置node单个进程可占用最大的内存，如果内存使用率超过300M，pm2自动重启该进程",
    "max_memory_restart": "300M",
    "//_comment3": "node主入口文件",
    "script": "app.ts",
    "out_file": "logs/pm2/-service-stdout-access.log",
    "error_file": "logs/pm2/node-service-stderr-error.log",
    "//_comment4": "让node程序占满你的cpu，发挥cpu最大的功效",
    "instances": "1",
    "//_comment5": "以主进程的方式启动",
    "exec_mode": "cluster", 
    "//_comment6": "热启动 ",
    "watch": true 
}
```
### 3. 作用于Node后台方案的别名

```shell
#当前项目文件件目录较浅 深入建议使用
yarn add module-alias
```

### 4. 分析app包占用体积汇总

```shell
//两种解决方案
//1️⃣本地分析工具
yarn add webpack-bundle-analyzer 
//2️⃣json分析工具
webpack --profile --json > stats.json
#线上分析地址
#http://alexkuz.github.io/webpack-chart/
#http://webpack.github.io/analyse/
#jarvis && size-plugin
```
------

开发环境启动server: 使用ts-node-dev

Webpack Bundle Analyzer is started at http://127.0.0.1:3011
Use Ctrl+C to close it
希望大家脚踏实地完成项目的整体架构搭建工作

