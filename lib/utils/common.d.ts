export interface PackageJSON {
  name: string;
  version: string;
  description: string;
  scripts: {
    [key: string]: string;
  };
}
export interface JSON {
  [key: string]: unknown;
}
/**
 * 读取指定路径下 json 文件
 * @param filename json 文件的路径
 */
export declare function readJsonFile<T>(filename: string): T;
/**
 * 覆写指定路径下的 json 文件
 * @param filename json 文件的路径
 * @param content  json 内容
 */
export declare function writeJsonFile<T>(filename: string, content: T): void;
/**
 * 获取项目绝对路径
 * @param projectName 项目名
 */
export declare function getProjectPath(projectName: string): string;
/**
 * 打印信息
 * @param msg 信息
 */
export declare function printMsg(msg: string): void;
/**
 * 清空命令行
 */
export declare function clearConsole(): void;
