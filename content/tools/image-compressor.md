---
title: "Imagine Compression"
description: "在线图片压缩工具"
category: "local"
icon: "🖼️"
weight: 4
tools: true
---

<div id="image-compressor">
    <input type="file" accept="image/*" onchange="compress(this)">
    <div id="preview"></div>
</div>

<style>
#image-compressor {
    padding: 20px;
}

#preview img {
    max-width: 100%;
    margin-top: 20px;
}
</style>

<script>
function compress(input) {
    const file = input.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // 设置压缩后的尺寸
            const MAX_WIDTH = 1024;
            const MAX_HEIGHT = 1024;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);

            // 输出压缩后的图片
            const preview = document.getElementById('preview');
            preview.innerHTML = '';
            const compressed = new Image();
            compressed.src = canvas.toDataURL('image/jpeg', 0.7);
            preview.appendChild(compressed);
        }
    }
}
</script>
