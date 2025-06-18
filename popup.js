let countdownInterval;

document.getElementById("getLink").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentUrl = tabs[0].url;
        document.getElementById("link").value = currentUrl;
    });
});

document.getElementById("start").addEventListener("click", () => {
    const url = document.getElementById("link").value.trim();
    const duration = parseInt(document.getElementById("duration").value); // in minutes
    const password = document.getElementById("password").value;

    if (!url) {
        alert("please enter url")
    }

    const startTime = Date.now();
    const totalSeconds = duration * 60;

    chrome.storage.local.set({
        active: true,
        startTime,
        duration,
        url,
        password
    }, () => {
        chrome.runtime.sendMessage({ action: "enforceURL" }); // enforce on start
        startCountdown(totalSeconds);
    });
});

document.getElementById("stop").addEventListener("click", () => {
    const inputPassword = document.getElementById("password").value;

    chrome.storage.local.get(["password"], (res) => {
        if (inputPassword === res.password) {
            chrome.storage.local.set({ active: false });
            clearInterval(countdownInterval);
            updateTimerUI(0, 1);
        } else {
            alert("Incorrect password.");
        }
    });
});

function startCountdown(totalSeconds) {
    let timeLeft = totalSeconds;
    clearInterval(countdownInterval);

    updateTimerUI(timeLeft, totalSeconds);

    countdownInterval = setInterval(() => {
        timeLeft--;

        updateTimerUI(timeLeft, totalSeconds);

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            chrome.storage.local.set({ active: false });
        }
    }, 1000);
}

function updateTimerUI(timeLeft, totalSeconds) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("time-display").textContent =
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const percent = ((totalSeconds - timeLeft) / totalSeconds) * 100;
    document.getElementById("progress-bar").style.width = `${percent}%`;
}

// Resume countdown if popup reopened
window.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(["active", "startTime", "duration"], (res) => {
        if (res.active) {
            const now = Date.now();
            const elapsed = Math.floor((now - res.startTime) / 1000);
            const total = res.duration * 60;
            const remaining = Math.max(0, total - elapsed);
            startCountdown(remaining);
        }
    });
});
