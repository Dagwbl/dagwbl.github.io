document.addEventListener('DOMContentLoaded', function () {
    const pathPatterns = [/\/zh\/static\/images\//, /\/en\/static\/images\//];

    function handleImage(img) {
        const originalSrc = img.src;

        // 检查是否匹配路径模式
        if (!pathPatterns.some(pattern => pattern.test(originalSrc))) return;

        // 主动检测图片是否存在
        const checkImage = (url, callback) => {
            const tester = new Image();
            tester.onload = () => callback(true);
            tester.onerror = () => callback(false);
            tester.src = `${url}?ts=${Date.now()}_${Math.random()}`; // 添加随机参数避免缓存
        };

        checkImage(originalSrc, (exists) => {
            if (exists) return;

            // 构建新路径
            const urlObj = new URL(originalSrc);
            const newPath = urlObj.pathname
                .replace(/^\/[a-z]{2}\/static/, '')
                .replace(/\/+/g, '/');
            const newSrc = `${urlObj.origin}${newPath}`;

            // 验证新路径
            checkImage(newSrc, (newExists) => {
                if (newExists) {
                    img.src = newSrc;
                    console.log(`Replaced: ${originalSrc} -> ${newSrc}`);
                } else {
                    console.warn('Both paths failed:', originalSrc);
                }
            });
        });
    }

    // 初始处理 + MutationObserver
    document.querySelectorAll('img').forEach(handleImage);
    new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            [...mutation.addedNodes].forEach(node => {
                if (node.tagName === 'IMG') handleImage(node);
            });
        });
    }).observe(document.body, { childList: true, subtree: true });
});