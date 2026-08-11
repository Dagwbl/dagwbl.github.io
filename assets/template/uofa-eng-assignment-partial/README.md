# uofa-eng-assignment

A Quarto partial template for University of Alberta engineering assignments.

Originally an Overleaf/LaTeX template, now converted to Quarto using template-partials for modern publishing workflows.

## Using

Copy the template files (`title.tex`, `logo.png`, and `template.qmd`) to your project directory.

Use the following YAML header in your `.qmd` file:

```yaml
---
title: "Assignment Title"
format:
  pdf:
    template-partials:
      - title.tex
    pdf-engine: lualatex
    fig-pos: H
author: "Your Full Name"
student-id: "Your Student ID"
course: "Course Name (Course Code)"
assignment: "Assignment Number"
date: "YYYY-MM-DD"  # Optional
logo: "path/to/custom/logo.png"  # Optional
---
```

Then render your document:

```bash
quarto render your-file.qmd
```

## Template Fields

The template uses Pandoc's native metadata variables:

- `author`: Your full name
- `student-id`: Your student ID number
- `course`: Full course name and code
- `assignment`: Assignment number or title
- `date`: (Optional) Assignment date
- `logo`: (Optional) Custom path to a logo image file (defaults to `logo.png`)

## Features

- Custom title page with student information and logo
- Template-partials architecture for better modularity and customization
- Uses native Pandoc template variables (no custom filters needed)
- Custom logo support via metadata
- Support for mathematical equations (via amsmath, amsfonts, amssymb)
- Support for Greek Unicode characters in text mode
- Code syntax highlighting (Quarto's default)
- Compatible with all standard Quarto/Pandoc markdown features

## Custom Logo

To use a custom logo instead of the default UofA Engineering logo, add the `logo` field to your YAML header:

```yaml
---
logo: "path/to/your/logo.png"
---
```

The path can be:
- Relative to your document (e.g., `images/logo.png`)
- Absolute path (e.g., `/home/user/logos/logo.png`)

## Template Architecture

This is a partial template that uses Quarto's template-partials system. The main template partial is `title.tex`, which contains the custom title page formatting. The template uses Pandoc's native variable syntax (e.g., `$author$`, `$student-id$`) to directly access YAML metadata, making it simple and standard.

## Files

- `title.tex` - LaTeX template partial for the title page (uses Pandoc template variables)
- `logo.png` - UofA Engineering logo
- `template.qmd` - Example document with hints and placeholders

## Example

See [template.qmd](template.qmd) for a complete example with hints and placeholders.

## Original LaTeX Template

The original Overleaf template can be found at:
https://www.overleaf.com/latex/templates/homework-assignment-university-of-alberta-engineering/nhjgtbxrfwqc
