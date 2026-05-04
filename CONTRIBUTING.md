# Contributing

Keep changes focused on the extension's single purpose: applying the user's selected Reddit sort and feed view defaults.

## Development

1. Load the folder in Chrome with `chrome://extensions` > `Load unpacked`.
2. Test Reddit community and user profile URLs.
3. Build the store package with:

```bash
./scripts/build_zip.sh
```

## Pull Requests

- Do not add analytics, tracking, remote code, or broad host permissions.
- Keep permissions limited to the implemented feature.
- Do not add content scripts unless the feature cannot be implemented with Chrome extension APIs.
- Update `README.md`, `PRIVACY.md`, and `STORE_LISTING.md` when behavior or permissions change.
