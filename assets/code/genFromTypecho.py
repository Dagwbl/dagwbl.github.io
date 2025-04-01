import os
import re

# 输入和输出路径
input_file = "D:/Documents/Database/data/typecho/all_articles.md"  # 源文件路径
output_dir = './markdown_files/'  # 输出目录

# 创建输出目录（如果不存在）
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# 打开源文件
with open(input_file, 'r', encoding='utf-8') as file:
    content = file.read()

# 使用正则表达式匹配每篇文章，忽略 HTML 注释部分
# 匹配模式：以 --- 开头和结尾，并且包含 YAML Front Matter
article_pattern = r'---\s*\ntitle: "([^"]+)"\s*\ndate: "([^"]+)"\s*\nslug: "([^"]+)"\s*\ntags: \[\]\s*\n---\s*(.*?)\s*(?=---|$)'

# 使用正则表达式查找所有文章
articles = re.findall(article_pattern, content, re.DOTALL)

# 遍历每篇文章并保存为独立的 Markdown 文件
for idx, article in enumerate(articles):
    try:
        title, date, slug, text = article

        # 移除 <!--markdown--> 标签
        text = text.replace("<!--markdown-->", "").strip()

        # 如果没有 slug，使用标题的替代（简化版）
        if not slug:
            slug = 'slug'

        # 使用 slug 和 title 作为文件名
        output_file_name = f"typecho-{slug}-{title}.md"
        output_file = os.path.join(output_dir, output_file_name)

        # 保存文章内容到文件
        with open(output_file, 'w', encoding='utf-8') as md_file:
            # 写入 Front Matter 和正文内容
            md_file.write(f"---\n")
            md_file.write(f"title: \"{title}\"\n")
            md_file.write(f"date: \"{date}\"\n")
            md_file.write(f"slug: \"{slug}\"\n")
            md_file.write(f"tags: []\n")
            md_file.write(f"---\n")
            md_file.write(text)
    except Exception as e:
        print(f"Error processing article {idx+1}: {e}")
        continue

    print(f"Article saved: {output_file}")

print(f"All articles have been saved in {output_dir}")
