const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);


module.exports = async function (params) {
    const { quickAddApi } = params;
    // 获取当前笔记的正文内容
    const activeFile = app.workspace.getActiveFile();
    const content = await app.vault.read(activeFile);

    // 复制正文内容到剪贴板
    await navigator.clipboard.writeText(content);
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
};

