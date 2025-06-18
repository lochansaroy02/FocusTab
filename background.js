const YOUTUBE_URL = "https://www.youtube.com";

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "enforceYouTube") {
        enforce();
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    enforce();
});

chrome.tabs.onCreated.addListener((tab) => {
    enforce();
});

function enforce() {
    chrome.storage.local.get(["active", "startTime", "duration"], (res) => {
        if (!res.active) return;

        const now = Date.now();
        const elapsedMinutes = (now - res.startTime) / (1000 * 60);
        if (elapsedMinutes >= res.duration) {
            chrome.storage.local.set({ active: false });
            return;
        }

        chrome.tabs.query({}, (tabs) => {
            tabs.forEach((tab, idx) => {
                if (!tab.url.startsWith(YOUTUBE_URL)) {
                    chrome.tabs.update(tab.id, { url: YOUTUBE_URL });
                }
                if (idx > 0) {
                    chrome.tabs.remove(tab.id); // allow only 1 tab
                }
            });
        });
    });
}
