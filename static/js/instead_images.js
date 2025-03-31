// 配置中心
console.log('instead_images.js');
const IMAGE_REWRITER_CONFIG = {
  // 路径匹配规则
  pathPatterns: [
    { 
      test: /(\/zh|\/en)\/static\/images\/(.*)/, 
      replace: '/images/$2' 
    }
  ],
  
  // 缓存控制参数
  cacheBuster: false,
  
  // 调试模式
  debug: true
};

// 核心重写逻辑
function rewriteImageSource(src) {
  try {
    const url = new URL(src);
    
    // 遍历所有匹配规则
    for (const rule of IMAGE_REWRITER_CONFIG.pathPatterns) {
      const match = url.pathname.match(rule.test);
      if (match) {
        const newPath = rule.replace.replace(/\$(\d+)/g, (_, n) => match[n]);
        const newUrl = new URL(url);
        newUrl.pathname = newPath;
        
        // 添加缓存破坏参数
        if (IMAGE_REWRITER_CONFIG.cacheBuster) {
          newUrl.search += (newUrl.search ? '&' : '?') + `_=${Date.now()}`;
        }
        
        IMAGE_REWRITER_CONFIG.debug && 
          console.log('[ImageRewriter] Rewrote:', src, '→', newUrl.href);
        return newUrl.href;
      }
    }
  } catch (e) {
    console.error('[ImageRewriter] URL解析失败:', src, e);
  }
  return src;
}

// 劫持所有图片创建方式
const nativeCreateElement = document.createElement.bind(document);
document.createElement = function(tagName, options) {
  const element = nativeCreateElement(tagName, options);
  if (tagName.toLowerCase() === 'img') {
    Object.defineProperty(element, 'src', {
      set(value) {
        const newSrc = rewriteImageSource(value);
        element.setAttribute('src', newSrc);
      },
      configurable: true
    });
  }
  return element;
};

// 处理现有及动态添加的图片
function processImage(img) {
  if (img.src && !img.dataset.rewriteProcessed) {
    const newSrc = rewriteImageSource(img.src);
    if (newSrc !== img.src) {
      img.dataset.rewriteProcessed = 'true';
      img.src = newSrc;
    }
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  // 处理现有图片
  document.querySelectorAll('img').forEach(processImage);

  // 监听动态添加的图片
  new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.tagName === 'IMG') processImage(node);
      });
    });
  }).observe(document.body, { childList: true, subtree: true });
});