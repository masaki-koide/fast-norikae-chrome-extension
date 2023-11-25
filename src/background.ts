const MENU_ITEM_ID = "fast-norikae";
const STORAGE_KEY = "nearest_station";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MENU_ITEM_ID,
    title: "選択した駅で乗換案内",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (tab && tab.id && info.menuItemId === MENU_ITEM_ID && info.selectionText) {
    const selectionText = info.selectionText;
    chrome.storage.sync.get([STORAGE_KEY], (result) => {
      const nearestStation = result[STORAGE_KEY];
      const url = new URL("https://transit.yahoo.co.jp/search/result");
      url.searchParams.set("from", nearestStation);
      url.searchParams.set("to", selectionText);
      chrome.tabs.create({
        url: url.toString(),
      });
    });
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "save") {
    chrome.storage.sync.set({ [STORAGE_KEY]: message.data.nearestStation });
  }
});
