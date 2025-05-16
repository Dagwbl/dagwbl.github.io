module.exports = async (tp) => {
  const undoFile = app.vault.getAbstractFileByPath("assist/log/rename_undo.json");
  if (!undoFile) {
    new Notice("没有找到 undo 记录");
    return;
  }

  const content = await app.vault.read(undoFile);
  let renameMap;
  try {
    renameMap = JSON.parse(content);
  } catch (e) {
    new Notice("撤销文件格式错误");
    return;
  }

  let undoCount = 0;
  for (const { oldPath, newPath } of renameMap) {
    const file = app.vault.getAbstractFileByPath(newPath);
    if (file) {
      try {
        await app.fileManager.renameFile(file, oldPath);
        undoCount++;
      } catch (e) {
        console.error("撤销失败:", newPath, e);
      }
    }
  }

  new Notice(`撤销完成，恢复了 ${undoCount}/${renameMap.length} 个文件名`);
};
