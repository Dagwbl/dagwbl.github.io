---
title: "Integrated Search"
# category: "local" 注释以不显示
icon: "🔍"
customcss: "css/extended/tools.css"
showToc: false
tools: true
weight: 1
---

<style>
    /* 全局样式 */
    body {
        font-family: Arial, sans-serif;
        /* background-color: #f8f9fa; */
        background: url("/images/four-hand-horizonal.png");
        background-size:100% 100%;
        background-attachment:fixed;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /* height: 70vh; */
    }

    .main-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 100px 10px;
    }
    /* 标题 */
    h1 {
        font-size: 24px;
        color: #333;
        margin-bottom: 20px;
        text-align: center;
    }

    /* 搜索容器 */
    .search-container {
        display: flex;
        align-items: center;
        background-color: #fff;
        padding: 10px 20px;
        border-radius: 50px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 600px;
    }

    /* 搜索框 */
    .search-input {
        flex: 1;
        font-size: 16px;
        border: none;
        outline: none;
        padding: 10px;
        border-radius: 50px;
        background-color: #f5f5f5;
        transition: background-color 0.3s ease;
    }

    .search-input:focus {
        background-color: #e9ecef;
    }

    /* 搜索图标按钮 */
    .search-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        margin-left: 10px;
        background-color: #7c608b;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .search-icon:hover {
        background-color: #005a9e;
    }

    .search-icon svg {
        width: 20px;
        height: 20px;
        fill: #fff;
    }

    /* 搜索引擎按钮容器 */
    .search-buttons {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 20px;
        max-width: 650px;
    }

    /* 搜索引擎按钮 */
    .search-button {
        padding: 10px 20px;
        font-size: 14px;
        color: #fff;
        background-color: #607d8b;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .search-button:hover {
        background-color: #005a9e;
        transform: translateY(-2px);
    }

    .search-button:active {
        background-color: #004a86;
    }
</style>
<div class="main-container">
    <h1>HUAN</h1>
    <div class="search-container">
        <input type="text" id="searchInput" class="search-input" placeholder="Please input a keyword...">
        <button class="search-icon" id="defaultSearch">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707a1 1 0 001.414-1.414l-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"/>
            </svg>
        </button>
    </div>
    <div class="search-buttons">
        <button class="search-button" data-engine="https://www.bing.com/search?q=">Bing</button>
        <button class="search-button" data-engine="https://www.google.com/search?q=">Google</button>
        <button class="search-button" data-engine="https://www.baidu.com/s?wd=">Baidu</button>
        <button class="search-button" data-engine="https://github.com/search?type=repositories&q=">Github</button>
        <button class="search-button" data-engine="https://duckduckgo.com/?q=">DuckDuckGo</button>
        <button class="search-button" data-engine="https://search.brave.com/search?q=">Brave</button>
        <button class="search-button" data-engine="https://www.youtube.com/results?search_query=">YouTube</button>
        <button class="search-button" data-engine="https://www.xiaohongshu.com/search_result?keyword=">Rednote</button>
        <button class="search-button" data-engine="https://www.zhihu.com/search?type=content&q=">ZhiHu</button>
        <button class="search-button" data-engine="https://search.bilibili.com/all?keyword=">Bilibili</button>
        <button class="search-button" data-engine="https://weixin.sogou.com/weixin?type=2&query=">WeXin</button>
        <button class="search-button" data-engine="https://www.douban.com/search?q=">DouBan</button>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const searchInput = document.getElementById('searchInput');
        const searchButtons = document.querySelectorAll('.search-button');
        const defaultSearchButton = document.getElementById('defaultSearch');

        // 点击搜索引擎按钮
        searchButtons.forEach(button => {
            button.addEventListener('click', () => {
                const query = searchInput.value.trim();
                if (query) {
                    const engineUrl = button.getAttribute('data-engine');
                    const searchUrl = engineUrl + encodeURIComponent(query);
                    window.open(searchUrl, '_blank');
                } else {
                    alert('请输入搜索关键词！');
                }
            });
        });

        // 点击默认搜索图标
        defaultSearchButton.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                const defaultEngine = 'https://www.bing.com/search?q=';
                const searchUrl = defaultEngine + encodeURIComponent(query);
                window.open(searchUrl, '_blank');
            } else {
                alert('请输入搜索关键词！');
            }
        });

        // 按回车键搜索
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    const defaultEngine = 'https://www.bing.com/search?q=';
                    const searchUrl = defaultEngine + encodeURIComponent(query);
                    window.open(searchUrl, '_blank');
                } else {
                    alert('请输入搜索关键词！');
                }
            }
        });
    });
</script>
