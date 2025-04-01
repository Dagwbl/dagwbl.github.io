import os
import re
import yaml

def update_md_files(directory):
    yaml_pattern = re.compile(r'^---\n(.*?)\n---\n', re.DOTALL)

    for root, dirs, files in os.walk(directory):
        for file in files:
            print(f"Processing file: {file}")
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r+', encoding='utf-8') as f:
                    content = f.read()

                    # Split YAML and content
                    match = yaml_pattern.match(content)
                    if match:
                        yaml_content = match.group(1)
                        body = content[match.end():]
                    else:
                        yaml_content = ''
                        body = content

                    # Process YAML
                    data = yaml.safe_load(yaml_content) or {}

                    # Remove existing categories to re-add at the end
                    categories = data.pop('categories', [])
                    if 'typecho' not in categories:
                        categories.append('typecho')
                    data['categories'] = categories

                    # Generate YAML with proper formatting
                    new_yaml = yaml.dump(
                        data,
                        default_flow_style=False,
                        sort_keys=False,
                        indent=2,
                        allow_unicode=True  # <-- Add this line to prevent escaping
                    ).strip()

                    # Rebuild content with proper spacing
                    new_content = f'---\n{new_yaml}\n---\n{body}'

                    # Write back
                    f.seek(0)
                    f.write(new_content)
                    f.truncate()
            # break

# Usage
target_directory = 'content\\posts\\typecho'
update_md_files(target_directory)
