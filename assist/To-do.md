## Temporary Clipboard
```
// ==UserScript==
// @name         Block LM Arena Alerts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Block or auto-close alerts on LM Arena page
// @author       You
// @match        https://lmarena.ai/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 方法1：重写 window.alert 函数，使其失效
    window.alert = function(message) {
        console.log('Blocked alert:', message); // 在控制台记录被屏蔽的alert内容
        return true;
    };

    // 方法2：如果需要保留原始alert功能，但只在特定条件下屏蔽
    /*
    const originalAlert = window.alert;
    window.alert = function(message) {
        // 可以在这里添加条件判断，例如根据message内容决定是否屏蔽
        if (message.includes('某些特定关键词')) {
            console.log('Blocked specific alert:', message);
            return true;
        }
        // 如果不符合屏蔽条件，则调用原始alert
        return originalAlert.apply(window, arguments);
    };
    */

    // 方法3：使用 MutationObserver 监控页面变化，移除可能的弹窗元素
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                // 可以在这里添加逻辑，检查是否有特定的弹窗元素并移除
                // 这部分需要根据实际页面结构调整
            }
        });
    });

    // 开始观察页面变化
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 页面加载完成后再次检查
    window.addEventListener('load', () => {
        console.log('Page loaded, checking for alerts...');
        // 可以在这里添加额外的检查逻辑
    });

})();
```
## Done
- [x] 接入https://aistudio.google.com/prompts/new_chat  [completion:: 2025-02-12] ^otx3
## Long term
- [ ] 刷题  [repeat:: every day]  [created:: 2025-02-19]
- [x] 刷题  [repeat:: every day]  [created:: 2025-02-18]  [completion:: 2025-02-19]
- [x] 刷题  [repeat:: every day]  [created:: 2025-02-18]  [completion:: 2025-02-18]
- [x] 刷题  [repeat:: every day]  [created:: 2025-02-16]  [completion:: 2025-02-18]
- [x] 刷题  [repeat:: every day]  [created:: 2025-02-14]  [due:: 2025-03-25]  [completion:: 2025-02-16]
- [x] 刷题  [repeat:: every day]  [created:: 2025-02-14]  [due:: 2025-03-14]  [completion:: 2025-02-14]
- [x] 刷题  [repeat:: every day]  [created:: 2025-02-13]  [due:: 2025-03-13]  [completion:: 2025-02-14]
- [x] 刷题  [repeat:: every day]  [due:: 2025-03-12]  [completion:: 2025-02-13] ^x6xe



## Short term
- [-] 给UA刘老师发邮件咨询相关事情  [🍅:: 5]  [priority:: high]  [cancelled:: 2025-02-13]
- [x] Left收起时不显示滚动条  [due:: 2025-02-13]  [completion:: 2025-02-13]
- [x] 打电话给山西和浙江省教育厅咨询CSC申请  [completion:: 2025-02-17]
- [ ] 学习微观经济学
- [x] 隐藏滚动条但仍可滚动  [completion:: 2025-02-18]
```css
.container {
  overflow: auto;
  width: 300px;
  height: 200px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 和 Edge */
}

.container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
```
- [x] 移动端左侧导航栏高度设置  [completion:: 2025-02-19]
