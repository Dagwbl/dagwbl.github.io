---
description: Translate diary between Chinese and English (bidirectional)
agent: build
model: google/gemini-3-flash-preview
---

Translate the diary file for English learning practice.

## Overview

The input file has **no language suffix** (e.g., `2026-03-30.md`). Based on content detection:
1. **Rename** the original file to add `.zh.md` or `.en.md` suffix
2. **Create** the translated file with the opposite language suffix

## Usage

```
/translate @content/diary/2026/March/2026-03-30.md
```

## Detection Heuristic

Check the body (content after frontmatter `---`) for CJK Unified Ideographs (`\p{Script=Han}`):
- Contains Chinese → treat as Chinese input
- Otherwise → treat as English input

## Workflow

### For Chinese Input (e.g., `2026-03-30.md` with Chinese body)

```
2026-03-30.md  →  2026-03-30.zh.md  +  2026-03-30.en.md
```

1. **Detect**: Body contains Chinese characters
2. **Rename**: `2026-03-30.md` → `2026-03-30.zh.md`
3. **Read**: Copy frontmatter and body from the original
4. **Translate**: Convert Chinese body to natural English
5. **Create**: New file `2026-03-30.en.md` with:
   - Same frontmatter (byte-for-byte, no language field)
   - English translation as primary content
   - Original Chinese wrapped in encrypt shortcode

### For English Input (e.g., `2026-03-30.md` with English body)

```
2026-03-30.md  →  2026-03-30.en.md  +  2026-03-30.zh.md
```

1. **Detect**: Body is primarily English
2. **Rename**: `2026-03-30.md` → `2026-03-30.en.md`
3. **Polish**: Grammar check and correction
4. **Create**: New file `2026-03-30.zh.md` with:
   - Same frontmatter (byte-for-byte, no language field)
   - Chinese translation as primary content
   - Original English wrapped in encrypt shortcode
   - Grammar Corrections section showing before/after

## Output File Format

### Chinese Input → English Output (`*.en.md`)

```markdown
---
title: 2026-03-30
date: 2026-03-30T21:30:19-06:00
categories:
  - diary
... (all original frontmatter, unchanged)
---

English translation here...

---

Original (Chinese):
{{< encrypt >}}
中文原文...
{{< /encrypt >}}
```

### English Input → Chinese Output (`*.zh.md`)

```markdown
---
title: 2026-03-30
date: 2026-03-30T21:30:19-06:00
categories:
  - diary
... (all original frontmatter, unchanged)
---

Chinese translation here...

---

## Grammar Corrections

Only correct actual grammar errors (subject-verb agreement, tense, word choice, etc.). 
**Do NOT correct hashtags** (e.g., "#Shiva" is intentional formatting for social media tags, NOT a grammar error).

- Original: "I havent wrote"
  Corrected: "I haven't written"

---

Original (English):
{{< encrypt >}}
English original...
{{< /encrypt >}}
```

## Constraints

- **Frontmatter**: Copy EXACTLY, no modifications, no `language:` field
- **Translations**: Keep natural and idiomatic
- **Encrypt format**: `{{< encrypt >}}...content...{{< /encrypt >}}`
- **Do NOT**: Commit to git or push to remote

## Verification

After running, verify:
1. Original file renamed with correct suffix (`.zh.md` or `.en.md`)
2. Translated file created with opposite suffix
3. Frontmatter unchanged in both files
4. Encrypt shortcode present and correct
