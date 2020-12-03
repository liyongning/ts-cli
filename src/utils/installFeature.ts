/**
 * 实现各个功能的安装方法
 */
import * as shell from 'shelljs';
import { writeFileSync } from 'fs';
import { PackageJSON, printMsg, readJsonFile, writeJsonFile } from './common';
import { red } from 'chalk';

/**
 * 安装 ESLint
 */
export function installESLint(): void {
  shell.exec(
    'npm i eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D',
  );
  // 添加 .eslintrc.js
  const eslintrc = `module.exports = {
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
  }
};
  `;
  try {
    writeFileSync('./.eslintrc.js', eslintrc, { encoding: 'utf-8' });
  } catch (err) {
    printMsg(`${red('Failed to write .eslintrc.js file content')}`);
    printMsg(`${red('Please add the following content in .eslintrc.js')}`);
    printMsg(`${red(eslintrc)}`);
  }

  // 改写 package.json
  const packageJson = readJsonFile<PackageJSON>('./package.json');
  packageJson.scripts['eslint:comment'] =
    '使用 ESLint 检查并自动修复 src 目录下所有扩展名为 .ts 的文件';
  packageJson.scripts['eslint'] = 'eslint --fix src --ext .ts';
  writeJsonFile<PackageJSON>('./package.json', packageJson);
}

/**
 * 安装 Prettier
 */
export function installPrettier(): void {
  shell.exec('npm i prettier -D');
  // 添加 .prettierrc.js
  const prettierrc = `module.exports = {
  // 一行最多 80 字符
  printWidth: 80,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用 tab 缩进，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用单引号代替双引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾使用逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格 { foo: bar }
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'lf'
};
  `;
  try {
    writeFileSync('./.prettierrc.js', prettierrc, { encoding: 'utf-8' });
  } catch (err) {
    printMsg(`${red('Failed to write .prettierrc.js file content')}`);
    printMsg(`${red('Please add the following content in .prettierrc.js')}`);
    printMsg(`${red(prettierrc)}`);
  }
  // 改写 package.json
  const packageJson = readJsonFile<PackageJSON>('./package.json');
  packageJson.scripts['prettier:comment'] =
    '自动格式化 src 目录下的所有 .ts 文件';
  packageJson.scripts['prettier'] = 'prettier --write "src/**/*.ts"';
  writeJsonFile<PackageJSON>('./package.json', packageJson);
}

/**
 * 安装 CZ，规范 git 提交信息
 */
export function installCZ(): void {
  shell.exec(
    'npx commitizen init cz-conventional-changelog --save --save-exact',
  );
  shell.exec('npm i @commitlint/cli @commitlint/config-conventional -D');
  // 添加 commitlint.config.js
  const commitlint = `module.exports = {
  extends: ['@commitlint/config-conventional']
};
  `;
  try {
    writeFileSync('./commitlint.config.js', commitlint, { encoding: 'utf-8' });
  } catch (err) {
    printMsg(`${red('Failed to write commitlint.config.js file content')}`);
    printMsg(
      `${red('Please add the following content in commitlint.config.js')}`,
    );
    printMsg(`${red(commitlint)}`);
  }
  // 改写 package.json
  const packageJson = readJsonFile<PackageJSON>('./package.json');
  packageJson.scripts['commit:comment'] = '引导设置规范化的提交信息';
  packageJson.scripts['commit'] = 'cz';
  writeJsonFile<PackageJSON>('./package.json', packageJson);
}

/**
 * 安装 husky 和 lint-staged，以实现 git commit 时自动化校验
 * @param hooks，需要自动执行的钩子
 * @param lintStaged，需要钩子运行的命令
 */
export function installHusky(
  hooks: { [key: string]: string },
  lintStaged: Array<string>,
): void {
  // 初始化 git 仓库
  shell.exec('git init');
  // 在安装 husky 和 lint-staged
  shell.exec('npm i husky lint-staged -D');
  // 设置 package.json
  const packageJson = readJsonFile<PackageJSON>('./package.json');
  packageJson['husky'] = {
    hooks: {
      'pre-commit': 'lint-staged',
      ...hooks,
    },
  };
  packageJson['lint-staged'] = {
    '*.ts': lintStaged.map((item) => `npm run ${item}`),
  };
  writeJsonFile<PackageJSON>('./package.json', packageJson);
}

/**
 * 安装构建工具，目前主要用于小项目，所以使用 typescript 原生的构建功能即可
 */
export function installBuild(feature: Array<string>): void {
  // 设置 package.json
  const packageJson = readJsonFile<PackageJSON>('./package.json');
  packageJson.scripts['build:comment'] = '构建';
  let order = '';
  if (feature.includes('ESLint')) {
    order += 'npm run eslint';
  }
  if (feature.includes('Prettier')) {
    order += ' && npm run prettier';
  }
  order += ' && rm -rf lib && tsc --build';
  packageJson.scripts['build'] = order;
  writeJsonFile<PackageJSON>('./package.json', packageJson);
}
