[Simplified Chinese](README.md) | [English](README_EN.md)

```
  _     _                  ____          ____            _       _       
 | |   (_)_ __  _   ___  _|  _ \  ___   / ___|  ___ _ __(_)_ __ | |_ ___ 
 | |   | | '_ \| | | \ \/ / | | |/ _ \  \___ \ / __| '__| | '_ \| __/ __|
 | |___| | | | | |_| |>  <| |_| | (_) |  ___) | (__| |  | | |_) | |_\__ \
 |_____|_|_| |_|\__,_/_/\_\____/ \___/  |____/ \___|_|  |_| .__/ \__|___/
                                                          |_|            
```

<div align="center">
  <a href="https://github.com/anghunk/linuxdo-scripts">
    <img src="https://github.com/anghunk/linuxdo-scripts/blob/main/public/icon/128.png?raw=true" alt="Logo" width="80" height="80">
  </a>

  <h1>LinuxDo Scripts</h1>

  <p>
    <a href="https://discord.gg/n2pErsD7Kg">Discord</a>
    ·
    <a href="https://linuxdo-scripts.zishu.me">Documentation</a>
    ·
    <a href="https://github.com/anghunk/linuxdo-scripts/issues/new/choose">Report an Issue</a>
    ·
    <a href="https://github.com/anghunk/linuxdo-scripts/releases/latest">Latest Release</a>
  </p>

  <p>
    <img src="https://img.shields.io/github/v/release/anghunk/linuxdo-scripts?logo=github&label=Version">
    <img src="https://img.shields.io/github/stars/anghunk/linuxdo-scripts?logo=github&style=flat&label=Stars">
    <img src="https://img.shields.io/chrome-web-store/users/fbgblmjbeebanackldpbmpacppflgmlj?style=flat&logo=googlechrome&label=ChromeWebStore">
    <img src="https://img.shields.io/badge/License-Apache%202.0-blue?logo=apache">
    <img src="https://img.shields.io/github/last-commit/anghunk/linuxdo-scripts?logo=github&label=Last Commit">
  </p>
</div>

## 📖 I. Project Introduction

LinuxDo Scripts is a feature-rich browser extension designed to enhance your experience on the LinuxDo forum. It integrates a wide range of practical functionalities, from basic interface optimization to advanced AI assistance, making your forum browsing and interaction smoother and more efficient.

Forum Discussion Thread: [linuxdo enhanced plugin, continuously updated, feedback welcome (browser extension, Tampermonkey is invalid and no longer updated) - LINUX DO](https://linux.do/t/topic/170951)

### 1. Core Highlights
- 🎨 **Interface Beautification** - Multiple theme skins, personalized customization
- 🤖 **AI Intelligence** - Topic summarization, intelligent reply generation
- 📚 **Content Management** - Favorites, user tags, content filtering
- ⚡ **Experience Optimization** - Quick operations, automation features
- 🔧 **Highly Customizable** - Supports custom CSS, quick replies, etc.

![Main Image](https://github.com/user-attachments/assets/1b0039de-3f3e-420b-9a91-6bc651e8c8e5)

<details>
<summary>More Screenshots</summary>
  
![Usage](https://github.com/user-attachments/assets/514b92b7-deb3-4eee-80cd-c2203f4661b8)
![Favorites Enhancement](https://github.com/user-attachments/assets/0523929c-c825-40b8-817e-1f9ea06a01ea)
![Share Post](https://github.com/user-attachments/assets/07728ccc-4032-431d-bf70-e32b7a8e2289)

</details>

## 📥 II. Quick Installation

### 1. Supported Browsers

| Browser                          | Installation Link                                                                                     | Notes     |
| -------------------------------- | --------------------------------------------------------------------------------------------- | -------- |
| **Chrome / Edge / Arc / Brave** | [Chrome Web Store](https://chromewebstore.google.com/detail/fbgblmjbeebanackldpbmpacppflgmlj) | Recommended     |
| **Firefox**                     | [Firefox Addons](https://addons.mozilla.org/zh-CN/firefox/addon/linux_do-scripts/)            | Full Support |
| **Domestic Users**                    | [Crx Store](https://www.crxsoso.com/webstore/detail/fbgblmjbeebanackldpbmpacppflgmlj)          | No VPN Needed |

### 2. Installation Steps
1. Click the installation link for your browser above.
2. Click "Add to Browser" in the extension store.
3. Confirm installation permissions.
4. Visit the [LinuxDo Forum](https://linux.do) to start using.

## ✨ III. Features

<details>
<summary>🔍 Browse Experience Optimization</summary>

- ⏰ Display creation time in the topic list
- 🏢 Show floor count and original poster identifier
- 🆕 Open topics in a new tab
- 👀 Directly preview details and comments in the topic list
- 📝 Optimize display of mixed Chinese and English text
- 🖼️ Optimize signature image display to prevent corruption
- 🌙 Automatically switch to dark mode
- 📱 Optimize for ultra-wide displays

</details>

<details>
<summary>📚 Content Management</summary>

- ⭐ Comprehensive favorites functionality
- 🏷️ User tagging system
- 🚫 Force block topics from specified users
- 👑 Toggle "Show Original Poster Only"
- 🔍 Keyword and tag filtering
- 📅 Block old posts by time

</details>

<details>
<summary>💬 Interaction Enhancement</summary>

- ⚡ Quick topic replies (supports custom templates)
- 😊 Optimize reply box emojis
- 📊 Query user level information
- 👍 Quick like button
- 🔄 Automatically expand replies

</details>

<details>
<summary>🤖 AI Smart Assistant</summary>

- 📋 AI topic summarization
- 💡 Intelligent reply generation
- 🤝 AI-assisted posting
- 🎯 Intelligent content analysis

</details>

<details>
<summary>🎨 Personalization</summary>

- 🎭 Multiple forum theme skins
- 😀 Switch forum emoji styles
- 🎨 Support for custom CSS styles
- ☁️ Cloud synchronization of settings
- 🖼️ Customize forum Logo
- 📑 Customize tab icons and titles

</details>

<details>
<summary>🔧 Utility Tools</summary>

- 📸 Convert topics to image shares
- 📄 Export forum articles
- ⬆️ Scroll to top / Jump to first post
- 🔕 Quickly mute posts
- 🎯 View your own reply floor

</details>


## 🛠️ IV. Development Guide

### 1. Environment Requirements
- **Node.js**: `v22.12.0`

### 2. Local Development

```bash
# 1. Clone the project
git clone https://github.com/anghunk/linuxdo-scripts.git
cd linuxdo-scripts

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

### 3. Loading the Extension
1. Open the browser's extension management page:
   - Chrome: `chrome://extensions/`
   - Firefox: `about:addons`
2. Enable "Developer mode".
3. Click "Load unpacked extension".
4. Select the `.output/chrome-mv3` folder in the project's root directory.

### 4. Development Guidelines
- 🧩 **Component-based Development**: Each feature as an independent component to avoid conflicts.
- 🔄 **Commit Process**: PR → Code Review → Merge
- 📚 **Documentation Update**: New features require synchronized documentation updates.

## 🤝 V. Contributing

### 1. Ways to Contribute
- 🐛 [Report a Bug](https://github.com/anghunk/linuxdo-scripts/issues/new?template=bug_report.yml)
- 💡 [Suggest a Feature](https://github.com/anghunk/linuxdo-scripts/issues/new?template=feature_report.yml)
- 🔧 [Submit Code](https://github.com/anghunk/linuxdo-scripts/pulls)
- 🙍‍♂️ [Join the Discussion](https://discord.gg/n2pErsD7Kg)

### 2. Contributors
![Contributors](https://contrib.rocks/image?repo=anghunk/linuxdo-scripts)

### 3. Reference Projects

- https://linux.do/t/topic/850824 - Shi Huang Jiang's emoji pack feature

## 📄 VI. Other Information

### 1. Star History

[![Star History Chart](https://api.star-history.com/svg?repos=anghunk/linuxdo-scripts&type=Timeline)](https://www.star-history.com/#anghunk/linuxdo-scripts&Timeline)

### 2. License

This project is licensed under the [Apache License 2.0](https://github.com/anghunk/linuxdo-scripts/blob/main/LICENSE).

**You are free to:**
- ✅ Use, copy, modify, and distribute this software.
- ✅ Use for commercial purposes.
- ✅ Re-license under the terms of the license.

**However, you must:**
- 📋 Retain the original copyright notice.
- 📋 Indicate any modifications made to the original code.

### 3. Disclaimer

- This project is **free and open-source**. It does not guarantee absolute perfection or error-freeness.
- Please assess risks yourself before use and comply with relevant laws and regulations.
- Any form of misuse is strictly prohibited.
- For any infringement issues, please contact [anghunk](https://github.com/anghunk) for prompt resolution.

---

![](https://invidget.wdh.app/n2pErsD7Kg)

<div align="center">
  <p>If this project has been helpful to you, please consider giving us a ⭐ Star!</p>
  <p>Made with ❤️ by <a href="https://github.com/anghunk">anghunk</a> and <a href="https://github.com/anghunk/linuxdo-scripts/graphs/contributors">contributors</a></p>
</div>
