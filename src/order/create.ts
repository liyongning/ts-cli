/**
 * create 命令的具体任务
 */

import {
  changePackageInfo,
  end,
  initProjectDir,
  installDevEnviroment,
  installFeature,
  installTSAndInit,
  installTypesNode,
  isFileExist,
  selectFeature,
} from '../utils/create';

// create 命令
export default async function create(projecrName: string): Promise<void> {
  // 判断文件是否已经存在
  isFileExist(projecrName);
  // 选择需要的功能
  const feature = await selectFeature();
  // 初始化项目目录
  initProjectDir(projecrName);
  // 改写项目的 package.json 基本信息，比如 name、description
  changePackageInfo(projecrName);
  // 安装 typescript 并初始化
  installTSAndInit();
  // 安装 @types/node
  installTypesNode();
  // 安装开发环境，支持实时编译
  installDevEnviroment();
  // 安装 feature
  installFeature(feature);
  // 结束
  end(projecrName);
}
