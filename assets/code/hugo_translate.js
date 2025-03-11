module.exports = async (params) => {
  // 获取当前活跃文件
  let activeFile = app.workspace.getActiveFile();
  if (!activeFile) {
    new Notice("No active file");
    return;
  }
  
  // 先加载配置
  let config = await loadConfig();
  
  // 检查文件名，如果没有zh后缀，添加上
  let filePath = activeFile.path;
  let fileName = activeFile.basename;
  let fileExt = activeFile.extension;
  
  if (!fileName.endsWith(".zh")) {
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
  
  if (fileContent.startsWith("---")) {
    let frontmatterEnd = fileContent.indexOf("---", 3);
    if (frontmatterEnd !== -1) {
      let frontmatterContent = fileContent.substring(3, frontmatterEnd).trim();
      content = fileContent.substring(frontmatterEnd + 3).trim();
      
      // 解析frontmatter
      let frontmatterLines = frontmatterContent.split("\n");
      frontmatterLines.forEach(line => {
        if (line.includes(":")) {
          let [key, ...valueParts] = line.split(":");
          let value = valueParts.join(":").trim();
          post[key.trim()] = value.replace(/^["'](.*)["']$/, "$1"); // 移除可能的引号
        }
      });
    }
  } else {
    content = fileContent;
  }
  
  // 验证API密钥
  if (!config.apiKey) {
    new Notice("API key not found in configuration");
    return;
  }
  
  // 翻译标题
  let translatedTitle = "";
  if (post.title) {
    new Notice("Translating title...");
    translatedTitle = await getTranslation(config.llmType, [
      {"role": "system", "content": "Translate the following Chinese blog post title into English while keeping the original meaning."},
      {"role": "user", "content": post.title}
    ], config);
  }
  
  // 翻译摘要
  let translatedSummary = "";
  if (post.summary) {
    new Notice("Translating summary...");
    translatedSummary = await getTranslation(config.llmType, [
      {"role": "system", "content": "Translate the following Chinese blog post summary into English while keeping the original meaning."},
      {"role": "user", "content": post.summary}
    ], config);
  }
  
  // 翻译正文
  new Notice("Translating content...");
  let translatedContent = await translateText(content, config.llmType, config);
  
  // 创建新的frontmatter
  let newFrontmatter = "";
  if (Object.keys(post).length > 0) {
    newFrontmatter = "---\n";
    for (let [key, value] of Object.entries(post)) {
      if (key === "title") {
        newFrontmatter += `title: "${translatedTitle}"\n`;
      } else if (key === "summary") {
        newFrontmatter += `summary: "${translatedSummary}"\n`;
      } else {
        newFrontmatter += `${key}: ${value}\n`;
      }
    }
    newFrontmatter += "---\n\n";
  }
  
  // 生成新文件
  let newFileContent = newFrontmatter + translatedContent;
  let enFilePath = filePath.replace(".zh.", ".en.");
  
  // 创建或更新英文版文件
  let adapter = app.vault.adapter;
  let enFile = app.vault.getAbstractFileByPath(enFilePath);
  
  if (enFile) {
    await app.vault.modify(enFile, newFileContent);
  } else {
    await app.vault.create(enFilePath, newFileContent);
  }
  
  new Notice(`✅ Translation completed: ${filePath} -> ${enFilePath}`);
  
  // 函数定义
  async function loadConfig() {
    // 读取配置
    let configFilePath = ".obsidian/translator_config.json";
    let config = JSON.parse(await app.vault.adapter.read(configFilePath));
    return {
        apiKey: config.apiKey,
        llmType: config.llmType || "deepseek",
        deepseekApiBase: config.deepseekApiBase || "https://api.deepseek.com/v1"
      };
  }
  
  async function getTranslation(llmType, messages, config) {
    let model = llmType === "openai" ? "gpt-4o" : "deepseek-chat";
    let apiUrl = llmType === "openai" ? 
      "https://api.openai.com/v1/chat/completions" : 
      `${config.deepseekApiBase}/chat/completions`;
    
    try {
      let response = await fetch(apiUrl, {
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
  
  async function translateText(text, llmType, config) {
    let totalLength = text.length;
    let translatedText = "";
    
    // 分段翻译以显示进度
    let chunkSize = 1000;
    for (let i = 0; i < totalLength; i += chunkSize) {
      let chunk = text.slice(i, i + chunkSize);
      let translatedChunk = await getTranslation(llmType, [
        {"role": "system", "content": "Translate the following Chinese blog post into English while keeping the original meaning."},
        {"role": "user", "content": chunk}
      ], config);
      
      translatedText += translatedChunk;
      
      let progress = Math.min((i + chunkSize) / totalLength * 100, 100);
      new Notice(`Text translation progress: ${progress.toFixed(2)}%`);
    }
    
    return translatedText;
  }
};