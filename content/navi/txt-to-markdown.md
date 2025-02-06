---
title: "TXT to Markdown"
# category: "local" 注释以不显示
icon: "📑"
customcss: "css/extended/tools.css"
# customjs: 
showToc: false
tools: true
weight: 2
---




<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
        background-color: #f5f5f5;
    }

    .container {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
        text-align: center;
        color: #333;
        margin-bottom: 20px;
    }

    .text-area-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 20px;
    }

    @media (max-width: 768px) {
        .text-area-container {
            grid-template-columns: 1fr;
        }
    }

    .text-area-wrapper {
        display: flex;
        flex-direction: column;
    }

    .text-area-label {
        font-weight: bold;
        margin-bottom: 5px;
        color: #444;
    }

    textarea {
        width: 100%;
        height: 500px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        resize: vertical;
        font-size: 16px;
        line-height: 1.5;
    }

    .button-group {
        display: flex;
        gap: 10px;
        justify-content: center;
        flex-wrap: wrap;
    }

    button {
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:hover {
        opacity: 0.9;
    }

    #convertBtn {
        background-color: #4CAF50;
        color: white;
    }

    #copyBtn {
        background-color: #2196F3;
        color: white;
    }

    #clearBtn {
        background-color: #f44336;
        color: white;
    }

    #jumpBtn {
        background-color: #9C27B0;
        color: white;
    }

    #jsonBtn {
        background-color: #FF9800;
        color: white;
    }

    .toast {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #333;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        display: none;
        z-index: 1000;
    }
</style>



<div class="container">
    <h1>格式处理工具</h1>
    <div class="text-area-container">
        <div class="text-area-wrapper">
            <div class="text-area-label">原始文本:</div>
            <textarea id="inputText" placeholder="请输入需要转换的文本..."></textarea>
        </div>
        <div class="text-area-wrapper">
            <div class="text-area-label">转换结果:</div>
            <textarea id="outputText" placeholder="转换后的文本将显示在这里..." readonly></textarea>
        </div>
    </div>
    <div class="button-group">
        <button id="convertBtn">转换回车</button>
        <button id="copyBtn">复制结果</button>
        <button id="clearBtn">全部清空</button>
        <button id="jumpBtn">一本日记</button>
        <button id="jsonBtn">转换Json</button> <!-- 新增按钮 -->
    </div>
</div>
<div id="toast" class="toast"></div>

<script>
    document.getElementById('convertBtn').addEventListener('click', function () {
        const inputText = document.getElementById('inputText').value;
        const outputText = inputText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('\n\n')
            .replace(/\n{3,}/g, '\n\n'); // 确保最多只有一个空行
        document.getElementById('outputText').value = outputText;
    });

    document.getElementById('copyBtn').addEventListener('click', function () {
        const outputText = document.getElementById('outputText');
        outputText.select();
        document.execCommand('copy');
        showToast('已复制到剪贴板');
    });

    document.getElementById('clearBtn').addEventListener('click', function () {
        document.getElementById('inputText').value = '';
        document.getElementById('outputText').value = '';
    });

    document.getElementById('jumpBtn').addEventListener('click', function () {
        window.open('https://web.xianfengtech.cn/web2/#/record', '_blank');
    });

    document.getElementById('jsonBtn').addEventListener('click', function () {
        const inputText = document.getElementById('inputText').value;
        const jsonObject = {
            id: 1,
            date: new Date().toISOString().split('T')[0],
            title: "想你的第一天",
            content: inputText,
            from: "朱朱",
            to: "欢欢",
            avatar: "/images/avatar-ZZ.jpg"
        };
        const jsonString = JSON.stringify(jsonObject, null, 4);
        document.getElementById('outputText').value = jsonString;
    });

    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 2000);
    }
</script>
