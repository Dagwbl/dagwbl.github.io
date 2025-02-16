const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
const fs = require('fs');
const path = require('path');

module.exports = async function (params) {
    const { quickAddApi } = params;

    // 日记目录路径（相对于 Obsidian 库的根目录）
    const diaryDir = path.join(app.vault.adapter.basePath, 'content/diary');

    try {
        // 检查日记目录是否存在
        if (!fs.existsSync(diaryDir)) {
            throw new Error(`日记目录不存在: ${diaryDir}`);
        }

        // 获取日记目录下的所有文件
        const files = fs.readdirSync(diaryDir);

        // 过滤出 .md 文件并获取它们的创建时间
        const diaryFiles = files
            .filter(file => file.endsWith('.md'))
            .map(file => {
                const filePath = path.join(diaryDir, file);
                const stats = fs.statSync(filePath);
                return {
                    name: file,
                    path: filePath,
                    ctime: stats.birthtime // 文件的创建时间
                };
            });

        // 如果没有日记文件，抛出错误
        if (diaryFiles.length === 0) {
            throw new Error('日记目录中没有找到任何日记文件。');
        }

        // 按创建时间排序，找到最新的日记文件
        const latestDiary = diaryFiles.sort((a, b) => b.ctime - a.ctime)[0];

        // 读取最新日记文件的内容
        const content = fs.readFileSync(latestDiary.path, 'utf-8');

        // 复制日记内容到剪贴板
        await navigator.clipboard.writeText(content);
        console.log(`最新日记 "${latestDiary.name}" 的内容已复制到剪贴板`);

        // 指定要打开的网站
        const url = "https://dagwbl.github.io/en/navi/#one-diary"; // 替换为你想打开的网站

        // 判断操作系统
        const platform = process.platform;

        if (platform === 'linux') {
            // Linux 平台：使用 Firefox 打开
            const { exec } = require('child_process');
            exec(`/opt/apps/org.mozilla.firefox-nal/files/firefox-nal/firefox-bin.sh ${url}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error opening Firefox: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`Firefox stderr: ${stderr}`);
                    return;
                }
                console.log(`Firefox opened: ${stdout}`);
            });
        } else if (platform === 'win32') {
            // Windows 平台：使用 Edge 打开
            const { exec } = require('child_process');
            exec(`start msedge ${url}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error opening Edge: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`Edge stderr: ${stderr}`);
                    return;
                }
                console.log(`Edge opened: ${stdout}`);
            });
        } else {
            console.error(`Unsupported platform: ${platform}`);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};