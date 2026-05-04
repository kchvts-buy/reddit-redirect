const CONTEXT_MENU_ID = 'toggle-enabled';

async function updateExtensionState() {
  const res = await chrome.storage.local.get([
    'enabled',
    'sortMode',
    'timeRange',
    'applySubreddits',
    'applyUser',
    'feedViewType'
  ]);
  const isEnabled = res.enabled !== false;
  const sort = res.sortMode || 'top/';
  const time = res.timeRange || 'week';
  const feedViewType = res.feedViewType || 'cardView';
  const subredditSortSuffix = res.applySubreddits !== false ? getSubredditSuffix(sort, time) : '';
  const userSortSuffix = res.applyUser !== false ? getUserSuffix(sort, time) : '';
  const subredditSuffix = withFeedView(subredditSortSuffix, feedViewType);
  const userSuffix = withFeedView(userSortSuffix, feedViewType);
  const removeRuleIds = [1, 2];

  chrome.action.setBadgeText({ text: "" });
  chrome.action.setIcon({ path: getIconPaths(isEnabled ? '' : '-off') });

  const buildRule = (id, pathPrefix, namePattern, suffix) => ({
    id,
    priority: 1,
    action: {
      type: "redirect",
      redirect: { regexSubstitution: `\\1/${pathPrefix}/\\2/${suffix}` }
    },
    condition: {
      regexFilter: `^(https?://(?:[^/]+\\.)?reddit\\.com)/${pathPrefix}/(${namePattern})/?$`,
      resourceTypes: ["main_frame", "xmlhttprequest"]
    }
  });

  const rules = [];
  rules.push(buildRule(1, 'r', '[a-zA-Z0-9_]+', subredditSuffix));
  rules.push(buildRule(2, 'user', '[a-zA-Z0-9_-]+', userSuffix));

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds,
    addRules: isEnabled ? rules : []
  });

  await updateContextMenu(isEnabled);
}

async function updateContextMenu(isEnabled) {
  const title = isEnabled ? 'Disable Default Sort for Reddit' : 'Enable Default Sort for Reddit';

  try {
    await chrome.contextMenus.update(CONTEXT_MENU_ID, { title });
    return;
  } catch (err) {}

  try {
    await chrome.contextMenus.create({
      id: CONTEXT_MENU_ID,
      title,
      contexts: ['action']
    });
  } catch (err) {
    try {
      await chrome.contextMenus.update(CONTEXT_MENU_ID, { title });
    } catch (updateErr) {}
  }
}

function getUserSuffix(sort, time) {
  if (sort === 'top/') return `?sort=top&t=${time}`;
  if (sort === 'new/') return '?sort=new';
  if (sort === 'hot/') return '?sort=hot';
  return '';
}

function getSubredditSuffix(sort, time) {
  return sort === 'top/' ? `${sort}?t=${time}` : sort;
}

function withFeedView(suffix, feedViewType) {
  if (!suffix) return `?feedViewType=${feedViewType}`;
  return `${suffix}${suffix.includes('?') ? '&' : '?'}feedViewType=${feedViewType}`;
}

function getIconPaths(suffix) {
  return {
    16: `icons/icon16${suffix}.png`,
    32: `icons/icon32${suffix}.png`,
    48: `icons/icon48${suffix}.png`,
    128: `icons/icon128${suffix}.png`
  };
}

chrome.runtime.onInstalled.addListener(updateExtensionState);
chrome.runtime.onStartup.addListener(updateExtensionState);
chrome.storage.onChanged.addListener(updateExtensionState);

if (chrome.sidePanel) {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {});
}

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId !== CONTEXT_MENU_ID) return;

  const res = await chrome.storage.local.get('enabled');
  await chrome.storage.local.set({ enabled: res.enabled === false });
});
