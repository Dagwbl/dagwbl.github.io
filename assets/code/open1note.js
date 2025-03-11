const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
const fs = require('fs');
const path = require('path');

module.exports = async function (params) {
    const { quickAddApi } = params;
    
    // 日记目录路径
    const diaryDir = path.join(app.vault.adapter.basePath, 'content/diary');
    
    // 定义日记文件名的正则表达式（假设格式为 YYYY-MM-DD.md 或类似格式）
    const diaryFilePattern = /^\d{4}-\d{2}-\d{2}(\.(zh|en))?\.md$/;

    try {
        // 检查日记目录是否存在
        if (!fs.existsSync(diaryDir)) {
            throw new Error(`日记目录不存在: ${diaryDir}`);
        }

        // 获取当前活动文件
        const activeFile = app.workspace.getActiveFile();
        let diaryContent;
        let diaryName;

        // 检查当前文件是否符合日记格式
        if (activeFile && activeFile.path.includes('content/diary')) {
            const currentFileName = activeFile.name;
            if (diaryFilePattern.test(currentFileName)) {
                // 当前文件是日记文件，直接使用当前文件
                const currentFilePath = path.join(app.vault.adapter.basePath, activeFile.path);
                diaryContent = fs.readFileSync(currentFilePath, 'utf-8');
                diaryName = currentFileName;
            }
        }

        // 如果当前文件不是日记文件，则获取最新日记文件
        if (!diaryContent) {
            const files = fs.readdirSync(diaryDir);
            
            // 过滤出 .md 文件并获取它们的创建时间
            const diaryFiles = files
                .filter(file => diaryFilePattern.test(file))
                .map(file => {
                    const filePath = path.join(diaryDir, file);
                    const stats = fs.statSync(filePath);
                    return {
                        name: file,
                        path: filePath,
                        ctime: stats.birthtime
                    };
                });

            if (diaryFiles.length === 0) {
                throw new Error('日记目录中没有找到任何日记文件。');
            }

            // 按创建时间排序，找到最新的日记文件
            const latestDiary = diaryFiles.sort((a, b) => b.ctime - a.ctime)[0];
            diaryContent = fs.readFileSync(latestDiary.path, 'utf-8');
            diaryName = latestDiary.name;
        }

        // 复制日记内容到剪贴板
        await navigator.clipboard.writeText(diaryContent);
        console.log(`日记 "${diaryName}" 的内容已复制到剪贴板`);

        // 打开指定网站
        const url = "https://dagwbl.github.io/en/navi/#one-diary";
        await openUrl(url);
        new Notice("The content of the diary has been copied to the clipboard and the website has been opened.");

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

// 抽取打开URL的函数，简化代码
async function openUrl(url) {
    const platform = process.platform;
    const commands = {
        linux: `/opt/apps/org.mozilla.firefox-nal/files/firefox-nal/firefox-bin.sh ${url}`,
        win32: `start msedge ${url}`
    };

    if (!commands[platform]) {
        console.error(`Unsupported platform: ${platform}`);
        return;
    }

    try {
        const { stdout, stderr } = await exec(commands[platform], { shell: platform === 'win32' });
        if (stderr) {
            console.error(`${platform === 'win32' ? 'Edge' : 'Firefox'} stderr: ${stderr}`);
            return;
        }
        console.log(`${platform === 'win32' ? 'Edge' : 'Firefox'} opened: ${stdout}`);
    } catch (error) {
        console.error(`Error opening ${platform === 'win32' ? 'Edge' : 'Firefox'}: ${error.message}`);
    }
}