# Chrome Web Store Listing Draft

## Name

Default Sort for Reddit

## Short Description

Apply your preferred default sort and feed view when opening Reddit communities and user profiles.

## Detailed Description

Default Sort for Reddit keeps Reddit community and profile pages on the sort and feed view you prefer.

Choose a default sort for communities, choose supported sorting for user profiles, and select Card or Compact feed view. The extension applies those choices only when opening plain Reddit community or profile URLs.

If you manually change sorting through Reddit's own interface, the extension does not force the page back to your saved default. It does not continuously monitor or rewrite Reddit query parameters.

Features:

- Default community sort: Top, New, Hot, Best, or Rising
- Default user profile sort: Top, New, or Hot
- Top range selector: Hour, Day, Week, Month, Year, or All
- Feed view selector: Card or Compact
- Chrome side panel settings UI
- Enable/disable from the extension icon context menu
- Local-only settings with no analytics, tracking, or remote servers

This extension is not affiliated with, endorsed by, or sponsored by Reddit.

## Category

Productivity

## Language

English

## Single Purpose

Apply the user's selected default Reddit sort and feed view to plain Reddit community and user profile URLs without overriding manual filter changes made in Reddit's interface.

## Permission Justifications

`declarativeNetRequest`: Required to redirect matching plain Reddit community and profile URLs to the selected default sort and feed view. The rules do not match already sorted URLs, so manual Reddit filter changes are not overridden.

`storage`: Required to store extension settings locally in Chrome.

`sidePanel`: Required to display the settings interface in Chrome's side panel.

`contextMenus`: Required to provide an enable/disable item in the extension toolbar context menu.

Host permissions for `https://reddit.com/*` and `https://*.reddit.com/*`: Required so redirect rules can apply only to Reddit URLs. The extension does not use these permissions to read page content or continuously monitor URL parameters.

## Privacy Practices

The extension does not collect or transmit user data.

Privacy dashboard answers:

- Sells or transfers user data: No
- Uses user data for unrelated purposes: No
- Uses user data for creditworthiness or lending: No
- Collects personally identifiable information: No
- Collects health information: No
- Collects financial/payment information: No
- Collects authentication information: No
- Collects personal communications: No
- Collects location: No
- Collects web history: No
- Collects user activity: No
- Collects website content: No

## Screenshot Checklist

Chrome Web Store requires screenshots before submission. Suggested screenshots:

- Side panel with extension enabled and sort controls visible
- Feed view controls
- Reddit community page after applying a default sort
- Extension icon context menu showing enable/disable

## Promo Image Notes

Use the Reddit-orange filter icon and a clean Chrome-style UI background. Avoid using Reddit branding in a way that implies affiliation.

## Review Notes

No login is required. To test:

1. Install the extension.
2. Open the side panel from the extension icon.
3. Choose a sort and feed view.
4. Open `https://www.reddit.com/r/chrome/`.
5. Confirm the URL receives the selected sort/feed parameters.
6. Change sorting manually inside Reddit and confirm the extension does not override that manual choice.
