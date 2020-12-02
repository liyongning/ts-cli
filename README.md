# 介绍

typescript 脚手架，用来开发一些简单 typescript 项目，比如：团队业务脚手架、npm 包等

# 使用

不需要在本地安装脚手架，执行以下命令一键创建项目

```shell
npx @liyongning/ts-cli create <new app>
```

当然也可以安装在本地

```shell
npm i @liyongning/ts-cli -g
```

```shell
ts-cli create newPro
```

# 扩展

脚手架内置了不错的扩展性，不论是为已有的 create 命令增加新的功能，还是新增一个命令，都很简单，方便你根据自身需要进行二次开发

## 增加新的命令

从 /src/index.ts 开始，仿照 create 命令方式即可

## 给 create 命令增加新的功能

在 /src/utils/create.ts 中的 selectFeature 方法中新增一条 choice，然后在 /src/utils/installFeature.ts 中新增对应的安装方法即可

# 能力

通过该脚手架创建的项目具有以下能力

### typescript

如飘柔般丝滑的开发体验

### 本地开发服务器

执行以下命令即可启动一个本地开发服务器，支持实时编译

```shell
npm run dev
```

### 构建

执行以下命令完成构建，因为脚手架主要用于开发一些简单的 typescript 项目，所以就没有集成第三方的构建工具，直接用 typescript 自己的构建能力即可，简单易用，没有学习成本

```shell
npm run build
```

### 代码质量

ESLint + prettier 配合 husky 和 lint-staged，在代码提交时自动校验和修复代码格式

### 规范的 git 提交信息

使用 commitzen 来规范 git 提交信息，可以直接执行 `git commit -m "msg"` 提交，会提示提交信息有误，弹出一个链接，点开会告诉你有效的提交格式，或者执行 `npm run cz` 命令会弹出一个交互式的命令行，引导你填充提交信息


脚手架的详细开发过程发布在 [掘金](https://juejin.cn/post/6901552013717438472/) 上，源码在 [github](https://github.com/liyongning/ts-cli.git) 上