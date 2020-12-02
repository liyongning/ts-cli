"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearConsole = exports.printMsg = exports.getProjectPath = exports.writeJsonFile = exports.readJsonFile = void 0;
/**
 * 放一些通用的工具方法
 */
const fs_1 = require("fs");
const path_1 = require("path");
const clear = require("clear-console");
/**
 * 读取指定路径下 json 文件
 * @param filename json 文件的路径
 */
function readJsonFile(filename) {
    return JSON.parse(fs_1.readFileSync(filename, { encoding: 'utf-8', flag: 'r' }));
}
exports.readJsonFile = readJsonFile;
/**
 * 覆写指定路径下的 json 文件
 * @param filename json 文件的路径
 * @param content  json 内容
 */
function writeJsonFile(filename, content) {
    fs_1.writeFileSync(filename, JSON.stringify(content, null, 2));
}
exports.writeJsonFile = writeJsonFile;
/**
 * 获取项目绝对路径
 * @param projectName 项目名
 */
function getProjectPath(projectName) {
    return path_1.resolve(process.cwd(), projectName);
}
exports.getProjectPath = getProjectPath;
/**
 * 打印信息
 * @param msg 信息
 */
function printMsg(msg) {
    console.log(msg);
}
exports.printMsg = printMsg;
/**
 * 清空命令行
 */
function clearConsole() {
    clear();
}
exports.clearConsole = clearConsole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7R0FFRztBQUNILDJCQUFpRDtBQUNqRCwrQkFBK0I7QUFDL0IsdUNBQXVDO0FBZXZDOzs7R0FHRztBQUNILFNBQWdCLFlBQVksQ0FBSSxRQUFnQjtJQUM5QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDOUUsQ0FBQztBQUZELG9DQUVDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLGFBQWEsQ0FBSSxRQUFnQixFQUFFLE9BQVU7SUFDM0Qsa0JBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUZELHNDQUVDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBZ0IsY0FBYyxDQUFDLFdBQW1CO0lBQ2hELE9BQU8sY0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBRkQsd0NBRUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFnQixRQUFRLENBQUMsR0FBVztJQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ25CLENBQUM7QUFGRCw0QkFFQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0IsWUFBWTtJQUMxQixLQUFLLEVBQUUsQ0FBQztBQUNWLENBQUM7QUFGRCxvQ0FFQyJ9