const statusCb = document.getElementById('status');
const sortButtons = Array.from(document.querySelectorAll('[data-sort]'));
const timeSel = document.getElementById('timeRange');
const timeSection = document.getElementById('timeSection');
const applySubredditsButton = document.getElementById('applySubreddits');
const applyUserButton = document.getElementById('applyUser');
const feedViewButtons = Array.from(document.querySelectorAll('[data-feed-view]'));

chrome.storage.local.get([
  'enabled',
  'sortMode',
  'timeRange',
  'applySubreddits',
  'applyUser',
  'feedViewType'
], (res) => {
  const sortMode = res.sortMode || 'top/';
  const feedViewType = res.feedViewType || 'cardView';

  statusCb.checked = res.enabled !== false;
  timeSel.value = res.timeRange || 'week';
  setApplyState(applySubredditsButton, res.applySubreddits !== false);
  setApplyState(applyUserButton, res.applyUser !== false);
  setSortMode(sortMode);
  setFeedViewType(feedViewType);
  toggleUI(sortMode);
});

statusCb.onchange = () => chrome.storage.local.set({ enabled: statusCb.checked });
sortButtons.forEach((button) => {
  button.onclick = () => {
    const sortMode = button.dataset.sort;
    chrome.storage.local.set({ sortMode });
    setSortMode(sortMode);
    toggleUI(sortMode);
  };
});
timeSel.onchange = () => chrome.storage.local.set({ timeRange: timeSel.value });
applySubredditsButton.onclick = () => {
  const nextValue = !isApplySelected(applySubredditsButton);
  setApplyState(applySubredditsButton, nextValue);
  chrome.storage.local.set({ applySubreddits: nextValue });
};
applyUserButton.onclick = () => {
  const nextValue = !isApplySelected(applyUserButton);
  setApplyState(applyUserButton, nextValue);
  chrome.storage.local.set({ applyUser: nextValue });
};
feedViewButtons.forEach((button) => {
  button.onclick = () => {
    const feedViewType = button.dataset.feedView;
    chrome.storage.local.set({ feedViewType });
    setFeedViewType(feedViewType);
  };
});

function setSortMode(val) {
  sortButtons.forEach((button) => {
    const isSelected = button.dataset.sort === val;
    button.classList.toggle('selected', isSelected);
    button.setAttribute('aria-pressed', String(isSelected));
  });
}

function setFeedViewType(val) {
  feedViewButtons.forEach((button) => {
    const isSelected = button.dataset.feedView === val;
    button.classList.toggle('selected', isSelected);
    button.setAttribute('aria-pressed', String(isSelected));
  });
}

function setApplyState(button, isSelected) {
  button.classList.toggle('selected', isSelected);
  button.setAttribute('aria-pressed', String(isSelected));
}

function isApplySelected(button) {
  return button.getAttribute('aria-pressed') === 'true';
}

function toggleUI(val) {
  if (val === 'top/') timeSection.classList.remove('hidden');
  else timeSection.classList.add('hidden');

  const hideUserButton = val === 'best/' || val === 'rising/';
  applyUserButton.classList.toggle('hidden', hideUserButton);
  applySubredditsButton.classList.toggle('wide', hideUserButton);
}
