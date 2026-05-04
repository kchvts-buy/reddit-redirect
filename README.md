# Default Sort for Reddit

Default Sort for Reddit is a small Chrome extension for keeping Reddit community and profile pages on the sort and feed view you actually use.

It applies defaults only when a plain Reddit community or profile URL opens. If you change sorting inside Reddit with the site UI, the extension leaves that manual choice alone.

## Features

- Default community sort: Top, New, Hot, Best, or Rising
- Default user profile sort: Top, New, or Hot
- Top range selector: Hour, Day, Week, Month, Year, or All
- Feed view selector: Card or Compact
- Chrome side panel settings UI
- Enable/disable from the extension icon context menu
- Local-only settings, no tracking, no remote servers

## How It Works

The extension uses Manifest V3 `declarativeNetRequest` dynamic rules. Those rules redirect only matching Reddit URLs like:

```text
https://www.reddit.com/r/example/
https://www.reddit.com/user/example/
```

The rules do not match already sorted URLs, so Reddit interface clicks such as `Hot`, `New`, `Top`, or `Rising` are not forced back to the extension setting.

## Permissions

- `declarativeNetRequest`: applies the selected defaults by redirecting matching Reddit URLs.
- `storage`: saves settings locally in Chrome.
- `sidePanel`: shows the settings UI in Chrome's side panel.
- `contextMenus`: adds the enable/disable action to the extension icon menu.
- `https://reddit.com/*` and `https://*.reddit.com/*`: limits redirect rules to Reddit.

## Local Install

1. Open `chrome://extensions`.
2. Enable `Developer mode`.
3. Click `Load unpacked`.
4. Select this repository folder.

## Build

Build a Chrome Web Store zip:

```bash
./scripts/build_zip.sh
```

The package is written to `dist/default-sort-for-reddit-1.2.0.zip`.

## Privacy

Default Sort for Reddit does not collect, transmit, sell, or share user data. Settings are stored only in `chrome.storage.local`.

Read the full policy in [PRIVACY.md](PRIVACY.md).

## Store Listing

Chrome Web Store copy, permission justifications, and screenshot checklist are in [STORE_LISTING.md](STORE_LISTING.md).

## Disclaimer

This extension is not affiliated with, endorsed by, or sponsored by Reddit.
