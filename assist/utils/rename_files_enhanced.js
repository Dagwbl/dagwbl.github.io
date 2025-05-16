module.exports = async (tp) => {
  const input = await tp.system.prompt(
    "请输入：目录路径 | 原始扩展名 | 目标扩展名\n例如：assist|.zh.md|.md",
    "assist|.zh.md|.md"
  );

  if (!input || !input.includes("|")) {
    new Notice("取消或格式错误");
    return;
  }

  const [folderPath, fromExt, toExt] = input.split("|").map(s => s.trim());

  if (!folderPath || !fromExt || !toExt) {
    new Notice("输入不完整");
    return;
  }

  const rootFolder = app.vault.getAbstractFileByPath(folderPath);
  if (!rootFolder) {
    new Notice("找不到指定目录: " + folderPath);
    return;
  }

  const filesToRename = [];
  const renameMap = [];

  const traverseFolder = (folder) => {
    if (!folder.children) return;
    for (const file of folder.children) {
      if (file.children) {
        traverseFolder(file);
      } else if (file.path.endsWith(fromExt) && file.extension === 'md') {
        filesToRename.push(file);
      }
    }
  };

  traverseFolder(rootFolder);

  if (filesToRename.length === 0) {
    new Notice("没有找到匹配文件");
    return;
  }

  const confirmed = confirm(`确定要重命名这 ${filesToRename.length} 个文件吗？`);
  if (!confirmed) {
    new Notice("操作取消");
    return;
  }

  let renamedCount = 0;
  for (const file of filesToRename) {
    const oldPath = file.path;
    const newPath = oldPath.replace(new RegExp(fromExt + "$"), toExt);
    try {
      await app.fileManager.renameFile(file, newPath);
      renameMap.push({ oldPath, newPath });
      renamedCount++;
    } catch (e) {
      console.error("重命名失败:", oldPath, e);
    }
  }

  // 保存记录以便撤销
  const undoFile = app.vault.getAbstractFileByPath("assist/log/rename_undo.json");
  const content = JSON.stringify(renameMap, null, 2);
  if (undoFile) {
    await app.vault.modify(undoFile, content);
  } else {
    await app.vault.create("assist/log/rename_undo.json", content);
  }

  new Notice(`重命名完成，成功 ${renamedCount}/${filesToRename.length} 个文件。可通过 undo 恢复`);
};
