# 🔐 FocusTab – One Tab. Zero Distractions.

A powerful Chrome extension that locks the browser to a single tab with a custom URL, restricts all other browsing activity, and includes a password-protected timed session. Designed to help you stay focused or ensure controlled web access.

---

## 🚀 Features

- ✅ Single Tab Browsing  
  Automatically closes all other tabs, allowing only one active tab.

- 🌐 Custom URL Lock  
  Enter any URL (e.g., YouTube, Udemy, Docs) to lock the session to that page.

- ⏳ Timed Sessions  
  Choose from predefined session durations: 10, 20, 30, or 45 minutes.

- 🔐 Password Protected  
  A session can only be ended with the correct password.

- 📎 Fetch Current URL Button  
  Instantly fetch the active tab’s URL to use it as the lock URL.

- 🚫 Auto Redirect & Tab Kill  
  If user tries to switch or open new tabs, they are auto-redirected and closed.

---

## 🛠️ Installation Guide (Developer Mode)

Since this extension is in development, follow these steps to load it manually:

### 1. Clone or Download

git clone https://github.com/your-username/youtube-lock-extension.git

Or download the ZIP and extract it.

---

### 2. Enable in Chrome

- Open Chrome and go to:  
  chrome://extensions

- Enable Developer mode (top right corner)

- Click on "Load unpacked"

- Select the folder you downloaded or extracted (e.g., youtube-lock-extension/)

---

## 🧠 How to Use

1. Click the extension icon in your browser toolbar.
2. Enter the custom URL you want to lock (e.g., https://www.youtube.com).
3. Click "Get Link" to auto-fill with your current tab’s URL (optional).
4. Choose a duration for the session.
5. Enter a password to secure the session.
6. Click "Start Session" – the browser is now locked to one tab with that URL!
7. To stop the session before time ends, re-open the popup and enter your password.

---

## 📸 Screenshots

Coming Soon...

---

## 🔒 Password Info

- Password is stored in Chrome's local storage (not synced).
- It is not hashed in the current dev version — so avoid sensitive passwords.
- Future versions may add encrypted password storage.

---

## 🧪 Development Status

This extension is currently in development. Upcoming features include:

- 🌙 Dark Mode UI
- 🧾 Support for multiple allowed URLs (whitelist)
- 🔑 Hashed password storage
- 📱 Mobile device support
- 📊 Analytics/timer UI for remaining session time

---

## 💡 Advanced Usage Tip

Want a stricter environment?

- Launch Chrome in Kiosk Mode:  
  chrome --kiosk https://your-locked-url.com

- Pair with extensions that block Chrome settings or disable extension removal.

---

## 🤝 Contributing

Have ideas or found bugs? Contributions are welcome!

1. Fork the repo
2. Make your changes
3. Submit a pull request 🚀

---

## 📄 License

MIT License.  
Free for personal and commercial use.

---

## 🙏 Credits

Crafted with ❤️ for developers, parents, teachers, and focused learners.
