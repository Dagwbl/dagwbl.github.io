---
title: "JSON Formatter"
description: "在线 JSON 格式化工具"
category: "local"
icon: "👾"
tools: true
weight: 3
---

<div id="json-formatter">
    <textarea id="input" placeholder="粘贴 JSON 文本..."></textarea>
    <button onclick="format()">格式化</button>
    <pre id="output"></pre>
</div>

<style>
#json-formatter {
    padding: 20px;
}

textarea {
    width: 100%;
    height: 200px;
    margin-bottom: 10px;
}

pre {
    background: #f5f5f5;
    padding: 10px;
}
</style>

<script>
function format() {
    const input = document.getElementById('input').value;
    try {
        const obj = JSON.parse(input);
        document.getElementById('output').textContent = 
            JSON.stringify(obj, null, 2);
    } catch(e) {
        document.getElementById('output').textContent = 
            '无效的 JSON 格式: ' + e.message;
    }
}
</script>
