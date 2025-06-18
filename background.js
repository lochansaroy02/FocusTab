chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "enforceURL") {
        enforce();
    }
});

chrome.tabs.onUpdated.addListener(() => enforce());
chrome.tabs.onCreated.addListener(() => enforce());

function enforce() {
    chrome.storage.local.get(["active", "startTime", "duration", "url"], (res) => {
        if (!res.active) return;

        const now = Date.now();
        const elapsed = (now - res.startTime) / (1000 * 60);
        if (elapsed >= res.duration) {
            chrome.storage.local.set({ active: false });
            return;
        }

        chrome.tabs.query({}, (tabs) => {
            tabs.forEach((tab, idx) => {
                try {
                    const currentOrigin = new URL(tab.url).origin;
                    const allowedOrigin = new URL(res.url).origin;

                    if (currentOrigin !== allowedOrigin) {
                        chrome.tabs.update(tab.id, { url: res.url });
                    }
                } catch (e) {
                    console.error("Invalid tab.url or res.url", e);
                }
                if (idx > 0) {
                    chrome.tabs.remove(tab.id);
                }
            });
        });
    });
}
