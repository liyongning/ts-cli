"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.end = exports.installFeature = exports.installDevEnviroment = exports.installTypesNode = exports.installTSAndInit = exports.changePackageInfo = exports.initProjectDir = exports.selectFeature = exports.isFileExist = void 0;
/**
 * create 命令需要用到的所有方法
 */
const common_1 = require("../utils/common");
const fs_1 = require("fs");
const inquirer_1 = require("inquirer");
const chalk_1 = require("chalk");
const shell = require("shelljs");
const installFeatureMethod = require("./installFeature");
/**
 * 验证当前目录下是否已经存在指定文件，如果存在则退出进行
 * @param filename 文件名
 */
function isFileExist(filename) {
    // 文件路径
    const file = common_1.getProjectPath(filename);
    // 验证文件是否已经存在，存在则推出进程
    if (fs_1.existsSync(file)) {
        common_1.printMsg(chalk_1.red(`${file} 已经存在`));
        process.exit(1);
    }
}
exports.isFileExist = isFileExist;
/**
 * 交互式命令行，让用户自己选择需要的功能
 * return ['ESLint', 'Prettier', 'CZ']
 */
async function selectFeature() {
    // 清空命令行
    common_1.clearConsole();
    // 输出信息
    /* eslint-disable @typescript-eslint/no-var-requires */
    common_1.printMsg(chalk_1.blue(`TS CLI v${require('../../package.json').version}`));
    common_1.printMsg('Start initializing the project:');
    common_1.printMsg('');
    // 选择功能，这里配合 下面的 installFeature 方法 和 ./installFeature.ts 文件为脚手架提供了良好的扩展机制
    // 将来扩展其它功能只需要在 choices 数组中增加配置项，然后在 ./installFeature.ts 文件中增加相应的安装方法即可
    const { feature } = await inquirer_1.prompt([
        {
            name: 'feature',
            type: 'checkbox',
            message: 'Check the features needed for your project',
            choices: [
                { name: 'ESLint', value: 'ESLint' },
                { name: 'Prettier', value: 'Prettier' },
                { name: 'CZ', value: 'CZ' },
            ],
        },
    ]);
    return feature;
}
exports.selectFeature = selectFeature;
/**
 * 初始化项目目录
 */
function initProjectDir(projectName) {
    shell.exec(`mkdir ${projectName}`);
    shell.cd(projectName);
    shell.exec('npm init -y');
}
exports.initProjectDir = initProjectDir;
/**
 * 改写项目中 package.json 的 name、description
 */
function changePackageInfo(projectName) {
    const packageJSON = common_1.readJsonFile('./package.json');
    packageJSON.name = packageJSON.description = projectName;
    common_1.writeJsonFile('./package.json', packageJSON);
}
exports.changePackageInfo = changePackageInfo;
/**
 * 安装 typescript 并初始化
 */
function installTSAndInit() {
    // 安装 typescript 并执行命令 tsc --init 生成 tsconfig.json
    shell.exec('npm i typescript -D && npx tsc --init');
    // 覆写 tsconfig.json
    const tsconfigJson = {
        compileOnSave: true,
        compilerOptions: {
            target: 'ES2018',
            module: 'commonjs',
            moduleResolution: 'node',
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            inlineSourceMap: true,
            noImplicitThis: true,
            noUnusedLocals: true,
            stripInternal: true,
            pretty: true,
            declaration: true,
            outDir: 'lib',
            baseUrl: './',
            paths: {
                '*': ['src/*'],
            },
        },
        exclude: ['lib', 'node_modules'],
    };
    common_1.writeJsonFile('./tsconfig.json', tsconfigJson);
    // 创建 src 目录和 /src/index.ts
    shell.exec('mkdir src && touch src/index.ts');
}
exports.installTSAndInit = installTSAndInit;
/**
 * 安装 @types/node
 * 这是 node.js 的类型定义包
 */
function installTypesNode() {
    shell.exec('npm i @types/node -D');
}
exports.installTypesNode = installTypesNode;
/**
 * 安装开发环境，支持实时编译
 */
function installDevEnviroment() {
    shell.exec('npm i ts-node-dev -D');
    /**
     * 在 package.json 的 scripts 中增加如下内容
     * "dev:comment": "启动开发环境",
     * "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
     */
    const packageJson = common_1.readJsonFile('./package.json');
    packageJson.scripts['dev:comment'] = '启动开发环境';
    packageJson.scripts['dev'] =
        'ts-node-dev --respawn --transpile-only src/index.ts';
    common_1.writeJsonFile('./package.json', packageJson);
}
exports.installDevEnviroment = installDevEnviroment;
/**
 * 安装用户选择的功能
 * @param feature 功能列表
 */
function installFeature(feature) {
    feature.forEach((item) => {
        const func = installFeatureMethod[`install${item}`];
        func();
    });
    // 安装 husky 和 lint-staged
    installHusky(feature);
    // 安装构建工具
    installFeatureMethod.installBuild(feature);
}
exports.installFeature = installFeature;
/**
 * 安装 husky 和 lint-staged，并根据功能设置相关命令
 * @param feature 用户选择的功能列表
 */
function installHusky(feature) {
    // feature 副本
    const featureBak = JSON.parse(JSON.stringify(feature));
    // 设置 hook
    const hooks = {};
    // 判断用户是否选择了 CZ，有则设置 hooks
    if (featureBak.includes('CZ')) {
        hooks['commit-msg'] = 'commitlint -E HUSKY_GIT_PARAMS';
    }
    // 设置 lintStaged
    const lintStaged = [];
    if (featureBak.includes('ESLint')) {
        lintStaged.push('eslint');
    }
    if (featureBak.includes('Prettier')) {
        lintStaged.push('prettier');
    }
    installFeatureMethod.installHusky(hooks, lintStaged);
}
/**
 * 整个项目安装结束，给用户提示信息
 */
function end(projectName) {
    common_1.printMsg(`Successfully created project ${chalk_1.yellow(projectName)}`);
    common_1.printMsg('Get started with the following commands:');
    common_1.printMsg('');
    common_1.printMsg(`${chalk_1.gray('$')} ${chalk_1.cyan('cd ' + projectName)}`);
    common_1.printMsg(`${chalk_1.gray('$')} ${chalk_1.cyan('npm run dev')}`);
    common_1.printMsg('');
}
exports.end = end;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NyZWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7R0FFRztBQUNILDRDQVF5QjtBQUN6QiwyQkFBZ0M7QUFDaEMsdUNBQWtDO0FBQ2xDLGlDQUFzRDtBQUN0RCxpQ0FBaUM7QUFDakMseURBQXlEO0FBRXpEOzs7R0FHRztBQUNILFNBQWdCLFdBQVcsQ0FBQyxRQUFnQjtJQUMxQyxPQUFPO0lBQ1AsTUFBTSxJQUFJLEdBQUcsdUJBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QyxxQkFBcUI7SUFDckIsSUFBSSxlQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDcEIsaUJBQVEsQ0FBQyxXQUFHLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDOUIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtBQUNILENBQUM7QUFSRCxrQ0FRQztBQUVEOzs7R0FHRztBQUNJLEtBQUssVUFBVSxhQUFhO0lBQ2pDLFFBQVE7SUFDUixxQkFBWSxFQUFFLENBQUM7SUFDZixPQUFPO0lBQ1AsdURBQXVEO0lBQ3ZELGlCQUFRLENBQUMsWUFBSSxDQUFDLFdBQVcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25FLGlCQUFRLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUM1QyxpQkFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2IseUVBQXlFO0lBQ3pFLHVFQUF1RTtJQUN2RSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxpQkFBTSxDQUFDO1FBQy9CO1lBQ0UsSUFBSSxFQUFFLFNBQVM7WUFDZixJQUFJLEVBQUUsVUFBVTtZQUNoQixPQUFPLEVBQUUsNENBQTRDO1lBQ3JELE9BQU8sRUFBRTtnQkFDUCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FB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