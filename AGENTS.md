# AGENTS.md - Jeapo's Blog

This is a **Hugo-based blog** using the PaperMod theme. It supports bilingual content (English/Chinese) with posts organized in `content/posts/`.

---

## 1. Build / Test / Deploy Commands

### Local Development

```bash
# Start Hugo dev server with drafts (Windows PowerShell)
hugo server -D

# Or use the cross-platform start script (auto-detects OS)
./start.sh

# Production preview (without drafts)
hugo server -F
```

### Production Build

```bash
# Production build (uses hugo.production.yaml)
hugo -F --gc --minify --config hugo.production.yaml
```

### Python Scripts

```bash
# Fetch Mastodon timeline
python assets/code/fetch_mastodon.py

# Create Python virtual environment first if needed:
python -m venv .venv
.venv/Scripts\Activate.ps1  # Windows
pip install requests pyyaml
```

### GitHub Actions

The `.github/workflows/DeployWebsite.yaml` workflow:
- Runs on push to `main` branch
- Scheduled daily at 15:00 UTC (fetches Mastodon)
- Builds with Hugo 0.154.0 + Dart Sass
- Deploys to GitHub Pages

---

## 2. Code Style Guidelines

### Hugo Templates (Go Templates)

```html
<!-- Hugo shortcode pattern -->
<div class="bilibili">
    {{- if .IsNamedParams -}}
        <iframe src="..."></iframe>
    {{- else -}}
        <iframe src="..."></iframe>
    {{- end -}}
</div>
```

- Use `{{- ` with hyphen to trim whitespace
- Named parameters: `.Get "param"` / `.IsNamedParams`
- Positional parameters: `.Get 0` / `.Get 1`

### Hugo Frontmatter (YAML)

Every content file requires this frontmatter structure:

```yaml
---
title: "Page Title"
date: 2025-01-01T12:00:00+08:00
categories: [note, English]
tags: ["english"]
language: en
showToc: true
TocOpen: false
draft: false
math: false
hidemeta: false
comments: true
description: "Page description."
disableHLJS: false
disableShare: false
hideSummary: false
searchHidden: true
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
UseHugoToc: true
ShowRssButtonInSectionTermList: true
---
```

### Bilingual Content

- Chinese posts: `content/posts/note/post-name.md`
- English translations: `content/posts/note/post-name.en.md`
- Set `language: en` in frontmatter for English versions
- Original Chinese posts don't need explicit language field (defaults to `zh`)

### CSS Conventions

```css
/* Custom CSS extends PaperMod theme */
/* Location: assets/css/extended/ */

:root {
    --gap: 24px;
}

body {
    font-family: 'Helvetica-EN', 'Times New Roman', 'LXGW WenKai Screen', ...;
}

/* Mobile-first responsive */
@media screen and (max-width: 768px) {
    :root {
        --gap: 14px;
    }
}
```

- CSS variables for theming
- Mobile-first approach
- Use `!important` sparingly

### JavaScript Conventions

```javascript
// CommonJS module pattern
const util = require('util');
const child_process = require('child_process');

// Async/await for operations
async function executeCommand() {
    const { stdout, stderr } = await exec('hugo new posts/' + fileName);
    // ...
}

module.exports = async function(context, req) {
    await executeCommand();
};
```

- No TypeScript (plain JavaScript only for this project)
- CommonJS `require()` / `module.exports`
- No semicolons in some utility scripts
- Use `const` primarily, `let` when reassignment needed

### Python Conventions

```python
#!/usr/bin/env python3
"""Module docstring describing purpose."""
import json
import os
from datetime import datetime, timezone

def parse_account(entry: str) -> tuple[str, str]:
    """Parse Mastodon account entry."""
    ...

if __name__ == '__main__':
    main()
```

- Python 3.11+ features
- Type hints in function signatures
- snake_case for variables and functions
- Docstrings for modules and public functions

---

## 3. Project Structure

```
D:\blog\
├── hugo.yaml              # Main Hugo config
├── hugo.production.yaml    # Production config overrides
├── archetypes/             # Content templates
│   ├── default.md
│   └── posts.md
├── assets/
│   ├── css/               # SCSS/CSS files
│   │   └── extended/       # Custom PaperMod overrides
│   └── code/               # Utility scripts (JS/Python)
├── content/
│   ├── posts/             # Blog posts
│   │   ├── note/          # Notes category
│   │   ├── essay/         # Essays category
│   │   ├── poem/          # Poems category
│   │   └── typecho/       # Imported from Typecho
│   ├── diary/             # Diary section
│   └── letter/            # Letter section
├── layouts/
│   ├── _default/          # Base templates
│   ├── partials/          # Reusable template parts
│   └── shortcodes/        # Custom Hugo shortcodes
├── static/
│   ├── component/         # Standalone web components
│   │   ├── letter/        # Letter component
│   │   ├── tomodoro/      # Pomodoro timer
│   │   └── minesweeper/   # Minesweeper game
│   └── js/                # Global JavaScript
├── themes/                # Hugo themes (submodule)
└── i18n/                  # Translations (en.yaml, zh.yaml)
```

---

## 4. Key Conventions

### Creating New Posts

```bash
# Use Hugo to scaffold
hugo new posts/note/my-new-post.md

# Then manually add .en.md translation
cp content/posts/note/my-new-post.md content/posts/note/my-new-post.en.md
# Edit frontmatter: set language: en, translate title
# Remove content, replace with English version
```

### Adding Components

Components in `static/component/` are standalone web apps:
- Should be self-contained with own CSS/JS
- Accessible via URL: `/component/<component-name>/`
- Example: `/component/tomodoro/`

### CSS Customization

Override PaperMod in `assets/css/extended/custom.css`. Theme uses CSS variables defined in `themes/PaperMod/assets/css/core/theme-vars.css`.

### Shortcodes Available

| Shortcode | Usage | Description |
|-----------|-------|-------------|
| `{{< bilibili "BV号" >}}` | Video embed | Bilibili videos |
| `{{< mastodon_timeline >}}` | Timeline | Mastodon feed |
| `{{< audio >}}` | Audio player | Audio playback |
| `{{< chat >}}` | Chat component | Interactive chat |

---

## 5. Important Paths

- **Hugo config**: `hugo.yaml` (bilingual EN/CN menus)
- **Custom CSS**: `assets/css/extended/custom.css`
- **Content archetypes**: `archetypes/posts.md`
- **Shortcodes**: `layouts/shortcodes/*.html`
- **Mastodon fetch**: `assets/code/fetch_mastodon.py`
- **GitHub workflow**: `.github/workflows/DeployWebsite.yaml`

---

## 6. Build Output

- `publishDir: "../hugo_public"` (local builds)
- GitHub Actions outputs to `./public`
- `resourceDir: "../hugo_resources"` (Hugo resources cache)

---

## 7. Environment Notes

- Hugo 0.154.0 (specified in CI)
- Dart Sass required for SCSS compilation
- Python 3.11+ for fetch scripts
- No Node.js build step needed for Hugo (static CSS)
- Theme: PaperMod v7 (submodule in `themes/PaperMod`)
