---
title: "Integrated Search"
# layout: tools
category: "local"
icon: "🔍"
customcss: "css/extended/tools.css"
# customjs: 
showToc: false
tools: true
weight: 1
---

<style>
    /* 全局样式 */
    body {
        font-family: Arial, sans-serif;
        background-color: #f8f9fa;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 70vh;
    }

    /* 标题 */
    h1 {
        font-size: 24px;
        color: #333;
        margin-bottom: 20px;
        align: center;
    }

    /* 搜索容器 */
    .search-container {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 600px;
        text-align: center;
    }

    /* 搜索框 */
    .search-input {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-bottom: 10px;
        outline: none;
        transition: border-color 0.3s ease;
    }

    .search-input:focus {
        border-color: #fff;
        outline: none;
    }

    /* 搜索引擎按钮 */
    .search-buttons {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 10px;
    }

    .search-button {
        padding: 10px 20px;
        font-size: 14px;
        color:rgba(114, 114, 114, 0.42);
        background-color:rgb(255, 255, 255);
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .search-button:hover {
        /* background-color:rgb(158, 188, 221); */
        color: rgba(0, 0, 0, 0.84);
        /* transition: color 0.3s ease; */
    }

    .search-button:active {
        background-color:rgba(154, 162, 170, 0.74);
    }

</style>


<center><h1>Polymer</h1></center>
<div class="search-container">
    <input type="text" id="searchInput" class="search-input" placeholder="Please input a keyword...">
    <div class="search-buttons">
        <button class="search-button" data-engine="https://www.bing.com/search?q=">Bing</button>
        <button class="search-button" data-engine="https://www.google.com/search?q=">Google</button>
        <button class="search-button" data-engine="https://github.com/search?type=repositories&q=">Github</button>
        <button class="search-button" data-engine="https://duckduckgo.com/?q=">DuckDuckGo</button>
        <button class="search-button" data-engine="https://www.baidu.com/s?wd=">Baidu</button>
        <button class="search-button" data-engine="https://search.brave.com/search?q=">Brave</button>
        <button class="search-button" data-engine="https://www.youtube.com/results?search_query=">YouTube</button>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const searchInput = document.getElementById('searchInput');
        const searchButtons = document.querySelectorAll('.search-button');

        // 点击搜索引擎按钮
        searchButtons.forEach(button => {
            button.addEventListener('click', () => {
                const query = searchInput.value.trim();
                if (query) {
                    const engineUrl = button.getAttribute('data-engine');
                    const searchUrl = engineUrl + encodeURIComponent(query);
                    window.open(searchUrl, '_blank'); // 在新标签页中打开搜索结果
                } else {
                    alert('请输入搜索关键词！');
                }
            });
        });

        // 支持按回车键搜索
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    const defaultEngine = 'https://www.google.com/search?q='; // 默认搜索引擎
                    const searchUrl = defaultEngine + encodeURIComponent(query);
                    window.open(searchUrl, '_blank'); // 在新标签页中打开搜索结果
                } else {
                    alert('请输入搜索关键词！');
                }
            }
        });
    });
</script>


