/**
 * 安装 ESLint
 */
export declare function installESLint(): void;
/**
 * 安装 Prettier
 */
export declare function installPrettier(): void;
/**
 * 安装 CZ，规范 git 提交信息
 */
export declare function installCZ(): void;
/**
 * 安装 husky 和 lint-staged，以实现 git commit 时自动化校验
 * @param hooks，需要自动执行的钩子
 * @param lintStaged，需要钩子运行的命令
 */
export declare function installHusky(
  hooks: {
    [key: string]: string;
  },
  lintStaged: Array<string>,
): void;
/**
 * 安装构建工具，目前主要用于小项目，所以使用 typescript 原生的构建功能即可
 */
export declare function installBuild(feature: Array<string>): void;
