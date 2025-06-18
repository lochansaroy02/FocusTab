document.getElementById("start").addEventListener("click", () => {
    const duration = parseInt(document.getElementById("duration").value);
    const password = document.getElementById("password").value;
    if (!password) return alert("Please enter password!");

    chrome.storage.local.set({
        active: true,
        password,
        startTime: Date.now(),
        duration
    });

    chrome.runtime.sendMessage({ action: "enforceYouTube" });
    document.getElementById("status").innerText = "Session Started!";
});

document.getElementById("stop").addEventListener("click", () => {
    const entered = document.getElementById("password").value;

    chrome.storage.local.get(["password"], (res) => {
        if (res.password === entered) {
            chrome.storage.local.set({ active: false });
            document.getElementById("status").innerText = "Session Stopped.";
        } else {
            alert("Incorrect password!");
        }
    });
});
