#!/usr/bin/env python3
"""Fetch Mastodon posts for accounts listed in data/mastodon/accounts.yaml
Saves combined timeline to data/mastodon/timeline.json

Usage:
  python assets/code/fetch_mastodon.py
"""
import json
import os
import re
import sys
from datetime import datetime, timezone

import requests
import yaml

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
DATA_DIR = os.path.join(ROOT, 'data', 'mastodon')
ACCOUNTS_FILE = os.path.join(DATA_DIR, 'accounts.yaml')
OUTPUT_FILE = os.path.join(DATA_DIR, 'timeline.json')

os.makedirs(DATA_DIR, exist_ok=True)

URL_RE = re.compile(r"https?://([^/]+)/@([^/]+)/?")

HEADERS = {
    'User-Agent': 'hugo-mastodon-fetcher/1.0 (+https://example.com)'
}


def parse_account(entry):
    entry = entry.strip()
    m = URL_RE.match(entry)
    if m:
        instance, username = m.group(1), m.group(2)
        return f"{username}@{instance}", instance
    if '@' in entry:
        # might already be user@instance
        username, instance = entry.split('@', 1)
        return entry, instance
    raise ValueError(f"Can't parse account entry: {entry}")


def lookup_account(acct, instance):
    url = f"https://{instance}/api/v1/accounts/lookup"
    params = {'acct': acct}
    r = requests.get(url, params=params, headers=HEADERS, timeout=15)
    r.raise_for_status()
    return r.json()


def fetch_statuses(account_id, instance, limit=20):
    url = f"https://{instance}/api/v1/accounts/{account_id}/statuses"
    params = {
        'limit': limit,
        'exclude_reblogs': 'true',
        'exclude_replies': 'false'
    }
    r = requests.get(url, params=params, headers=HEADERS, timeout=15)
    r.raise_for_status()
    return r.json()


def main():
    if not os.path.exists(ACCOUNTS_FILE):
        print(f"Missing accounts file: {ACCOUNTS_FILE}")
        sys.exit(1)

    with open(ACCOUNTS_FILE, 'r', encoding='utf-8') as f:
        accounts_list = yaml.safe_load(f) or []

    posts = []

    for entry in accounts_list:
        try:
            acct, instance = parse_account(entry)
        except ValueError as e:
            print(e)
            continue
        print(f"Lookup {acct} on {instance}...", file=sys.stderr)
        try:
            acc = lookup_account(acct, instance)
        except Exception as e:
            print(f"Failed lookup for {acct}@{instance}: {e}", file=sys.stderr)
            continue

        account_info = {
            'id': acc.get('id'),
            'display_name': acc.get('display_name') or acc.get('username'),
            'username': acc.get('username'),
            'acct': acc.get('acct'),
            'avatar': acc.get('avatar_static') or acc.get('avatar')
        }

        try:
            statuses = fetch_statuses(acc.get('id'), instance, limit=40)
        except Exception as e:
            print(f"Failed to fetch statuses for {acct}: {e}", file=sys.stderr)
            continue

        for s in statuses:
            posts.append({
                'id': s.get('id'),
                'url': s.get('url'),
                'created_at': s.get('created_at'),
                'content': s.get('content'),
                'account': account_info
            })

    # sort by created_at desc
    def parse_dt(x):
        try:
            return datetime.fromisoformat(x.replace('Z', '+00:00'))
        except Exception:
            return datetime.min

    posts.sort(key=lambda p: parse_dt(p.get('created_at') or ''), reverse=True)

    out = {'generated_at': datetime.now(timezone.utc).isoformat(), 'posts': posts}

    # Load previous timeline if present and compare 'posts' arrays.
    prev = None
    if os.path.exists(OUTPUT_FILE):
        try:
            with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
                prev = json.load(f)
        except Exception as e:
            print(f"Failed to read existing timeline: {e}", file=sys.stderr)
            prev = None

    prev_posts = prev.get('posts') if isinstance(prev, dict) else None

    if prev_posts == posts:
        # No content changes (ignore generated_at); skip writing to keep git clean.
        print('No content changes in posts array. Skipping write.')
        print('Previous posts count:', len(prev_posts) if prev_posts is not None else 'unknown')
        print('New posts count:', len(posts))
        # Print small sample to help debugging
        def sample(p):
            try:
                return [{'id': x.get('id'), 'created_at': x.get('created_at')} for x in p[:3]]
            except Exception:
                return p[:3]
        if prev_posts:
            print('Previous sample:', sample(prev_posts))
        print('New sample:', sample(posts))
        return

    # Write updated timeline
    try:
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(out, f, ensure_ascii=False, indent=2)
        print(f"Saved {len(posts)} posts to {OUTPUT_FILE}")
    except Exception as e:
        print(f"Failed to write timeline: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
