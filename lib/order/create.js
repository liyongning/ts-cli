"use strict";
/**
 * create 命令的具体任务
 */
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("../utils/create");
// create 命令
async function create(projecrName) {
    // 判断文件是否已经存在
    create_1.isFileExist(projecrName);
    // 选择需要的功能
    const feature = await create_1.selectFeature();
    // 初始化项目目录
    create_1.initProjectDir(projecrName);
    // 改写项目的 package.json 基本信息，比如 name、description
    create_1.changePackageInfo(projecrName);
    // 安装 typescript 并初始化
    create_1.installTSAndInit();
    // 安装 @types/node
    create_1.installTypesNode();
    // 安装开发环境，支持实时编译
    create_1.installDevEnviroment();
    // 安装 feature
    create_1.installFeature(feature);
    // 结束
    create_1.end(projecrName);
}
exports.default = create;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL29yZGVyL2NyZWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsNENBVXlCO0FBRXpCLFlBQVk7QUFDRyxLQUFLLFVBQVUsTUFBTSxDQUFDLFdBQW1CO0lBQ3RELGFBQWE7SUFDYixvQkFBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pCLFVBQVU7SUFDVixNQUFNLE9BQU8sR0FBRyxNQUFNLHNCQUFhLEVBQUUsQ0FBQztJQUN0QyxVQUFVO0lBQ1YsdUJBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM1Qiw4Q0FBOEM7SUFDOUMsMEJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0IscUJBQXFCO0lBQ3JCLHlCQUFnQixFQUFFLENBQUM7SUFDbkIsaUJBQWlCO0lBQ2pCLHlCQUFnQixFQUFFLENBQUM7SUFDbkIsZ0JBQWdCO0lBQ2hCLDZCQUFvQixFQUFFLENBQUM7SUFDdkIsYUFBYTtJQUNiLHVCQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEIsS0FBSztJQUNMLFlBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNuQixDQUFDO0FBbkJELHlCQW1CQyJ9