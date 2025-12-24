# Mastodon fetcher

This script fetches public posts from Mastodon accounts listed in `data/mastodon/accounts.yaml` and writes a combined JSON to `data/mastodon/timeline.json` for Hugo to consume.

Quick start (Windows PowerShell):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r assets/code/requirements.txt
python assets/code/fetch_mastodon.py
```

Preview your site:

```powershell
# from repository root
hugo server -D
```

Shortcode usage in content or templates:

`{{< mastodon_timeline >}}`

After confirming the local result, I'll add a GitHub Actions workflow to run the fetch on deploy if you want.
