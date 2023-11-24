const MENU_ITEM_ID = "fast-norikae";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MENU_ITEM_ID,
    title: "選択した駅で乗換案内",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (tab && tab.id && info.menuItemId === MENU_ITEM_ID && info.selectionText) {
    const url = new URL("https://transit.yahoo.co.jp/search/result");
    url.searchParams.set("from", info.selectionText);
    url.searchParams.set("to", "東京");
    chrome.tabs.create({
      url: url.toString(),
    });
  }
});
