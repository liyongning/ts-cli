"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const create_1 = require("./order/create");
// ts-cli -v、ts-cli --version
// 临时禁用规则，保证这里可以通过 require 方法获取 package.json 中的版本号
/* eslint-disable @typescript-eslint/no-var-requires */
commander_1.program
    .version(`${require('../package.json').version}`, '-v --version')
    .usage('<command> [options]');
// ts-cli create newPro
commander_1.program
    .command('create <app-name>')
    .description('Create new project from => ts-cli create yourProjectName')
    .action(async (name) => {
    // 创建命令具体做的事情都在这里，name 是你指定的 newPro
    await create_1.default(name);
});
commander_1.program.parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5Q0FBb0M7QUFDcEMsMkNBQW9DO0FBRXBDLDZCQUE2QjtBQUM3QixrREFBa0Q7QUFDbEQsdURBQXVEO0FBQ3ZELG1CQUFPO0tBQ0osT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsY0FBYyxDQUFDO0tBQ2hFLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBRWhDLHVCQUF1QjtBQUN2QixtQkFBTztLQUNKLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztLQUM1QixXQUFXLENBQUMsMERBQTBELENBQUM7S0FDdkUsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFZLEVBQUUsRUFBRTtJQUM3QixtQ0FBbUM7SUFDbkMsTUFBTSxnQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FBQyxDQUFDO0FBRUwsbUJBQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDIn0=