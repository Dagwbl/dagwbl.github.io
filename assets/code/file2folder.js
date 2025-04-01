module.exports = async (params) => {
    const { app } = params;
    const currentFile = app.workspace.getActiveFile();

    if (!currentFile) {
        console.error("No active file found.");
        return;
    }

    const currentFileName = currentFile.basename;
    const currentFileParentDir = currentFile.parent;

    // 创建同名文件夹（在同级目录下）
    const newFolderPath = `${currentFileParentDir.path}/${currentFileName}`;
    await app.vault.createFolder(newFolderPath);

    // 创建 image 子文件夹
    const imageFolderPath = `${newFolderPath}/image`;
    await app.vault.createFolder(imageFolderPath);

    // 移动当前文件到同名文件夹并重命名为 index.md
    const newFilePath = `${newFolderPath}/index.md`;
    await app.vault.rename(currentFile, newFilePath);

    console.log(`File moved and renamed to ${newFilePath}`);
};
