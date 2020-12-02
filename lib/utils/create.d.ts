/**
 * 验证当前目录下是否已经存在指定文件，如果存在则退出进行
 * @param filename 文件名
 */
export declare function isFileExist(filename: string): void;
/**
 * 交互式命令行，让用户自己选择需要的功能
 * return ['ESLint', 'Prettier', 'CZ']
 */
export declare function selectFeature(): Promise<Array<string>>;
/**
 * 初始化项目目录
 */
export declare function initProjectDir(projectName: string): void;
/**
 * 改写项目中 package.json 的 name、description
 */
export declare function changePackageInfo(projectName: string): void;
/**
 * 安装 typescript 并初始化
 */
export declare function installTSAndInit(): void;
/**
 * 安装 @types/node
 * 这是 node.js 的类型定义包
 */
export declare function installTypesNode(): void;
/**
 * 安装开发环境，支持实时编译
 */
export declare function installDevEnviroment(): void;
/**
 * 安装用户选择的功能
 * @param feature 功能列表
 */
export declare function installFeature(feature: Array<string>): void;
/**
 * 整个项目安装结束，给用户提示信息
 */
export declare function end(projectName: string): void;
