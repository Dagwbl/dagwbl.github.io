const fs = require('fs');
const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
const path = require('path');

// 检查是否有 Hugo 进程运行
async function isHugoRunning() {
    try {
        const platform = process.platform;
        let command = '';

        if (platform === 'win32') {
            command = 'tasklist | findstr /I "hugo.exe"'; // Windows 查找进程
        } else {
            command = 'ps aux | grep "[h]ugo server"'; // Linux/macOS 查找进程（防止 grep 本身匹配）
        }

        const { stdout } = await exec(command);
        return stdout.trim().length > 0; // 如果有输出，说明进程在运行
    } catch (error) {
        return false; // 发生错误（比如找不到进程），认为 Hugo 没有运行
    }
}

// 关闭 Hugo 服务器
async function stopHugoServer() {
    try {
        const platform = process.platform;
        let command = '';

        if (platform === 'win32') {
            command = 'taskkill /F /IM hugo.exe'; // Windows 强制终止 Hugo
        } else {
            command = 'pkill -f "hugo server"'; // Linux/macOS 终止 Hugo 进程
        }

        await exec(command);
        console.log('Hugo 服务器已关闭。');
    } catch (error) {
        console.error('关闭 Hugo 服务器失败:', error.message);
    }
}

// 启动 Hugo 服务器
async function startHugoServer() {
    const hugoProjectDir = app.vault.adapter.basePath; // 假设在 Obsidian 库目录下
    console.log(`Hugo 项目目录: ${hugoProjectDir}`);

    const configFiles = ['config.toml', 'hugo.yaml', 'hugo.json'];
    const hasConfigFile = configFiles.some(file => fs.existsSync(path.join(hugoProjectDir, file)));

    if (!hasConfigFile) {
        throw new Error('未找到 Hugo 配置文件。请确保当前目录是 Hugo 项目的根目录。');
    }

    console.log('正在启动 Hugo 服务器...');
    const hugoProcess = child_process.spawn('hugo server', {
        shell: true,
        stdio: 'pipe',
        cwd: hugoProjectDir
    });

    hugoProcess.stdout.on('data', (data) => {
        console.log(data.toString());
        if (data.toString().includes('Web Server is available')) {
            openBrowser();
        }
    });

    hugoProcess.stderr.on('data', (data) => console.error(`Hugo 错误: ${data.toString()}`));

    hugoProcess.on('close', (code) => console.log(`Hugo 进程已退出，代码: ${code}`));
}

// 打开浏览器访问 Hugo 服务器
function openBrowser() {
    const url = 'http://localhost:1313';
    console.log(`正在打开浏览器访问: ${url}`);
    
    const platform = process.platform;
    if (platform === 'linux') {
        exec(`xdg-open ${url}`);
    } else if (platform === 'win32') {
        exec(`start ${url}`);
    } else {
        exec(`open ${url}`); // macOS
    }
}

// 主逻辑
module.exports = async function () {
    if (await isHugoRunning()) {
        console.log('检测到 Hugo 服务器正在运行，正在关闭...');
        await stopHugoServer();
    } else {
        console.log('Hugo 服务器未运行，正在启动...');
        await startHugoServer();
    }
};
