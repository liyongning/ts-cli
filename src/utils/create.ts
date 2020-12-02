/**
 * create 命令需要用到的所有方法
 */
import {
  getProjectPath,
  PackageJSON,
  JSON,
  printMsg,
  readJsonFile,
  writeJsonFile,
  clearConsole,
} from '../utils/common';
import { existsSync } from 'fs';
import { prompt } from 'inquirer';
import { blue, cyan, gray, red, yellow } from 'chalk';
import * as shell from 'shelljs';
import * as installFeatureMethod from './installFeature';

/**
 * 验证当前目录下是否已经存在指定文件，如果存在则退出进行
 * @param filename 文件名
 */
export function isFileExist(filename: string): void {
  // 文件路径
  const file = getProjectPath(filename);
  // 验证文件是否已经存在，存在则推出进程
  if (existsSync(file)) {
    printMsg(red(`${file} 已经存在`));
    process.exit(1);
  }
}

/**
 * 交互式命令行，让用户自己选择需要的功能
 * return ['ESLint', 'Prettier', 'CZ']
 */
export async function selectFeature(): Promise<Array<string>> {
  // 清空命令行
  clearConsole();
  // 输出信息
  /* eslint-disable @typescript-eslint/no-var-requires */
  printMsg(blue(`TS CLI v${require('../../package.json').version}`));
  printMsg('Start initializing the project:');
  printMsg('');
  // 选择功能，这里配合 下面的 installFeature 方法 和 ./installFeature.ts 文件为脚手架提供了良好的扩展机制
  // 将来扩展其它功能只需要在 choices 数组中增加配置项，然后在 ./installFeature.ts 文件中增加相应的安装方法即可
  const { feature } = await prompt([
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

  return feature as Array<string>;
}

/**
 * 初始化项目目录
 */
export function initProjectDir(projectName: string): void {
  shell.exec(`mkdir ${projectName}`);
  shell.cd(projectName);
  shell.exec('npm init -y');
}

/**
 * 改写项目中 package.json 的 name、description
 */
export function changePackageInfo(projectName: string): void {
  const packageJSON: PackageJSON = readJsonFile<PackageJSON>('./package.json');
  packageJSON.name = packageJSON.description = projectName;
  writeJsonFile<PackageJSON>('./package.json', packageJSON);
}

/**
 * 安装 typescript 并初始化
 */
export function installTSAndInit(): void {
  // 安装 typescript 并执行命令 tsc --init 生成 tsconfig.json
  shell.exec('npm i typescript -D && npx tsc --init');
  // 覆写 tsconfig.json
  const tsconfigJson: JSON = {
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
  writeJsonFile<JSON>('./tsconfig.json', tsconfigJson);
  // 创建 src 目录和 /src/index.ts
  shell.exec('mkdir src && touch src/index.ts');
}

/**
 * 安装 @types/node
 * 这是 node.js 的类型定义包
 */
export function installTypesNode(): void {
  shell.exec('npm i @types/node -D');
}

/**
 * 安装开发环境，支持实时编译
 */
export function installDevEnviroment(): void {
  shell.exec('npm i ts-node-dev -D');
  /**
   * 在 package.json 的 scripts 中增加如下内容
   * "dev:comment": "启动开发环境",
   * "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
   */
  const packageJson = readJsonFile<PackageJSON>('./package.json');
  packageJson.scripts['dev:comment'] = '启动开发环境';
  packageJson.scripts['dev'] =
    'ts-node-dev --respawn --transpile-only src/index.ts';
  writeJsonFile<PackageJSON>('./package.json', packageJson);
}

/**
 * 安装用户选择的功能
 * @param feature 功能列表
 */
export function installFeature(feature: Array<string>): void {
  feature.forEach((item) => {
    const func = (installFeatureMethod[
      `install${item}`
    ] as unknown) as () => void;
    func();
  });
  // 安装 husky 和 lint-staged
  installHusky(feature);
  // 安装构建工具
  installFeatureMethod.installBuild(feature);
}

/**
 * 安装 husky 和 lint-staged，并根据功能设置相关命令
 * @param feature 用户选择的功能列表
 */
function installHusky(feature: Array<string>): void {
  // feature 副本
  const featureBak = JSON.parse(JSON.stringify(feature));

  // 设置 hook
  const hooks = {};
  // 判断用户是否选择了 CZ，有则设置 hooks
  if (featureBak.includes('CZ')) {
    hooks['commit-msg'] = 'commitlint -E HUSKY_GIT_PARAMS';
  }

  // 设置 lintStaged
  const lintStaged: Array<string> = [];
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
export function end(projectName: string): void {
  printMsg(`Successfully created project ${yellow(projectName)}`);
  printMsg('Get started with the following commands:');
  printMsg('');
  printMsg(`${gray('$')} ${cyan('cd ' + projectName)}`);
  printMsg(`${gray('$')} ${cyan('npm run dev')}`);
  printMsg('');
}
