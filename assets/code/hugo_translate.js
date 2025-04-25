// 在模块顶部添加yaml引用
const yaml = require('d:\\blog\\assets\\code\\libs\\js-yaml.min.js');

module.exports = async (params) => {
  // 获取当前活跃文件
  let activeFile = app.workspace.getActiveFile();
  if (!activeFile) {
    new Notice("No active file");
    return;
  }

  // 先加载配置
  let config = await loadConfig();
  // 验证API密钥
  if (!config.apiKey) {
    new Notice("API key not found in configuration");
    return;
  }

  // 检查文件名，如果没有zh后缀，添加上
  let filePath = activeFile.path;
  let fileName = activeFile.basename;
  let fileExt = activeFile.extension;
  let renameFlag = false;

  if (!fileName.endsWith(".zh") && renameFlag === true) {
    // 创建新的文件名和路径
    let newFileName = `${fileName}.zh`;
    let newFilePath = filePath.replace(fileName, newFileName);

    // 重命名文件
    await app.fileManager.renameFile(
      activeFile,
      newFilePath
    );

    // 更新文件引用
    filePath = newFilePath;
    fileName = newFileName;

    new Notice(`File renamed to ${newFileName}.${fileExt}`);

    // 获取更新后的活跃文件
    activeFile = app.workspace.getActiveFile();
  }

  // 读取文件内容
  let fileContent = await app.vault.read(activeFile);

  // 检查是否包含frontmatter
  let post = {};
  let content = fileContent;


  // 修改frontmatter解析部分
  if (fileContent.startsWith("---")) {
    let frontmatterEnd = fileContent.indexOf("---", 3);
    if (frontmatterEnd !== -1) {
      let frontmatterContent = fileContent.substring(3, frontmatterEnd).trim();
      content = fileContent.substring(frontmatterEnd + 3).trim();

      // 使用yaml解析frontmatter
      try {
        post = yaml.load(frontmatterContent);
      } catch (e) {
        new Notice("Frontmatter解析失败：" + e.message);
        return;
      }
    }
  }

  // 翻译标题
  let translatedTitle = "";
  if (post.title) {
    new Notice("Translating title...");
    translatedTitle = await getTranslation([
      { "role": "system", "content": "Translate the following Chinese blog post title into English while keeping the original meaning. if the title is a date, just translate into English format (eg., March 11, 2025)" },
      { "role": "user", "content": post.title }
    ], config);
  }

  // 翻译摘要
  let translatedSummary = "";
  if (post.summary) {
    new Notice("Translating summary...");
    translatedSummary = await getTranslation([
      { "role": "system", "content": "Translate the following Chinese blog post summary into English while keeping the original meaning." },
      { "role": "user", "content": post.summary }
    ], config);
  }

  // 翻译正文
  new Notice("Translating content...");
  let translatedContent = await translateText(content, config);

  // 修改frontmatter生成部分
  // 创建新的frontmatter
  let newFrontmatter = "";
  if (Object.keys(post).length > 0) {
    // 创建副本避免修改原始数据
    let translatedPost = { ...post };
    if (translatedTitle) translatedPost.title = translatedTitle;
    if (translatedSummary) translatedPost.summary = translatedSummary;

    // 生成带格式的YAML
    newFrontmatter = "---\n" +
      yaml.dump(translatedPost, { lineWidth: -1 }) +
      "---\n\n";
  }

  // 生成新文件
  let newFileContent = newFrontmatter + translatedContent;
  // 创建或更新英文版文件
  let enFilePath = filePath;
  if (renameFlag === true) {
    enFilePath = filePath.replace(".zh.", ".en.");
  }else {
    enFilePath = filePath.replace(".md", ".en.md");
  }
  let enFile = app.vault.getAbstractFileByPath(enFilePath);

  if (enFile) {
    await app.vault.modify(enFile, newFileContent);
  } else {
    await app.vault.create(enFilePath, newFileContent);
    // 创建后重新获取文件引用
    enFile = app.vault.getAbstractFileByPath(enFilePath);
    if (!enFile) {
      new Notice("❌ Failed to create English file");
      return;
    }
  }

  new Notice(`✅ Translation completed: ${filePath} -> ${enFilePath}`);
  // 在右侧分栏打开文件（修正后的代码）
  try {
    // 先检查文件是否存在
    if (!enFile) {
      new Notice(`❌ File not found: ${enFilePath}`);
      return;
    }

    // 创建新的叶子并在其中打开文件
    let leaf = app.workspace.getLeaf('split', 'vertical');
    if (!leaf) {
      new Notice("❌ Failed to create new leaf");
      return;
    }

    // 在新叶子中打开文件
    await leaf.openFile(enFile, { active: true });

    new Notice(`✅ Translation completed and file opened`);
  } catch (e) {
    new Notice(`❌ Failed to open file: ${e.message}`);
    console.error(e);
  }


  // 函数定义
  async function loadConfig() {
    // 读取配置
    let configFilePath = ".obsidian/translator_config.json";
    let configJson = JSON.parse(await app.vault.adapter.read(configFilePath));
    let config = configJson.services[configJson.default];
    return {
      chunkSize: configJson.chunkSize || 20000,
      maxLookback: configJson.maxLookback || 200,
      apiKey: config.apiKey,
      llmType: config.llmType,
      apiBase: config.apiBase,
      model: config.model
    };
  }

  async function getTranslation(messages, config) {
    let model = config.model;
    let apiBase = config.apiBase;

    try {
      let response = await fetch(apiBase, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: messages
        })
      });

      let data = await response.json();
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content;
      } else {
        throw new Error("No response from API");
      }
    } catch (error) {
      new Notice(`Error in translation: ${error.message}`);
      console.error("API Error:", error);
      return "";
    }
  }

  async function translateText(text, config) {
    let totalLength = text.length;
    let translatedText = "";
    const chunkSize = config.chunkSize || 20000; // 默认分块大小
    const maxLookback = config.maxLookback || 200; // 默认最大回溯长度
    let i = 0;

    while (i < text.length) {
      let end = Math.min(i + chunkSize, text.length);

      // 查找句子结束符（包含中文标点和换行符）
      const punctuationIndex = text.lastIndexOf('\n', end - 1);    // 优先换行符
      // 找到最后出现的几个标点中的最大值
      const periods = [
        text.lastIndexOf('。', end - 1),
        text.lastIndexOf('！', end - 1),
        text.lastIndexOf('？', end - 1),
        text.lastIndexOf('…', end - 1)
      ];
      const fallbackPunctuation = Math.max(...periods);
      let foundIndex = Math.max(
        punctuationIndex,
        fallbackPunctuation
      );

      if (foundIndex > i && foundIndex !== -1 && (end - foundIndex) < maxLookback) {
        end = foundIndex + 1;
      }

      let chunk = text.slice(i, end);
      let translatedChunk = await getTranslation([
        { "role": "system", "content": "Translate the following Chinese blog post into English while keeping the original meaning." },
        // { "role": "system", "content": "Translate the following Chinese blog post into English while keeping the original meaning and the original Markdown format accurately (include line break and space)." },
        { "role": "user", "content": chunk }
      ], config);
      if (punctuationIndex > fallbackPunctuation) {
        translatedText += translatedChunk + "\n\n";
      } else {
        translatedText += translatedChunk + " ";
      }

      // 修复进度计算
      let progress = (end / totalLength * 100).toFixed(2);
      new Notice(`Text translation progress: ${progress}%`);
      i = end;
    }

    return translatedText;
  }
};
