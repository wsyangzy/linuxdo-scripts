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
  <a href="https://github.com/ezyshu/linuxdo-scripts">
    <img src="https://github.com/ezyshu/linuxdo-scripts/blob/main/public/icon/128.png?raw=true" alt="Logo" width="80" height="80">
  </a>

  <h1>LinuxDo Scripts</h1>

  <p>
    <a href="https://discord.gg/n2pErsD7Kg">Discord</a>
    ·
    <a href="https://linuxdo-scripts.zishu.me">Documentation</a>
    ·
    <a href="https://github.com/ezyshu/linuxdo-scripts/issues/new/choose">Report an Issue</a>
    ·
    <a href="https://github.com/ezyshu/linuxdo-scripts/releases/latest">Latest Release</a>
  </p>

  <p>
    <img src="https://img.shields.io/github/v/release/ezyshu/linuxdo-scripts?logo=github&label=Version">
    <img src="https://img.shields.io/github/stars/ezyshu/linuxdo-scripts?logo=github&style=flat&label=Stars">
    <img src="https://img.shields.io/chrome-web-store/users/fbgblmjbeebanackldpbmpacppflgmlj?style=flat&logo=googlechrome&label=ChromeWebStore">
    <img src="https://img.shields.io/badge/License-Apache%202.0-blue?logo=apache">
    <img src="https://img.shields.io/github/last-commit/ezyshu/linuxdo-scripts?logo=github&label=Last%20Commit">
  </p>
</div>

## 📖 Project Overview

LinuxDo Scripts is a feature-rich browser extension designed to enhance the user experience on the LinuxDo forum. It integrates a wide range of practical features, from basic interface optimizations to advanced AI assistance, making your forum browsing and interaction smoother and more efficient.

Forum Discussion Thread: [linuxdo 增强插件，持续更新欢迎反馈（浏览器扩展，油猴已失效不再更新）- LINUX DO](https://linux.do/t/topic/170951)

### ✨ Key Highlights
- 🎨 **UI Beautification** - Multiple theme skins, personalized customization
- 🤖 **AI Intelligence** - Topic summarization, smart reply generation
- 📚 **Content Management** - Bookmarks, user tags, content filtering
- ⚡ **Experience Optimization** - Quick actions, automation features
- 🔧 **Highly Customizable** - Supports custom CSS, quick reply templates, and more

![Main image](https://github.com/user-attachments/assets/13b83ca0-3927-4261-8e29-15e152de4846)

<details>
<summary>📸 More Screenshots</summary>
  
![Settings Panel](https://github.com/user-attachments/assets/880539ab-7a56-4b2f-aaaa-218ee4f8e699)
![Feature Demo](https://github.com/user-attachments/assets/6ee3d75c-b4ff-489d-942d-1526a9793f4f)
![UI Optimization](https://github.com/user-attachments/assets/2d106967-bb7d-49c8-af5a-9a551904cb5d)
  
</details>

## 📥 Quick Installation

### 🌐 Supported Browsers

| Browser                         | Installation Link                                                                             | Note            |
| ------------------------------- | --------------------------------------------------------------------------------------------- | --------------- |
| **Chrome / Edge / Arc / Brave** | [Chrome Web Store](https://chromewebstore.google.com/detail/fbgblmjbeebanackldpbmpacppflgmlj) | Recommended     |
| **Firefox**                     | [Firefox Addons](https://addons.mozilla.org/zh-CN/firefox/addon/linux_do-scripts/)            | Fully Supported |
| **Mainland China Users**        | [Crx Store](https://www.crxsoso.com/webstore/detail/fbgblmjbeebanackldpbmpacppflgmlj)         | No VPN Required |

### 🚀 Installation Steps
1. Click the installation link for your browser above
2. Click "Add to Browser" in the extension store
3. Confirm installation permissions
4. Visit the [LinuxDo Forum](https://linux.do) to start using

## ✨ Features

### 🔍 Browsing Experience Optimization
- ⏰ Show topic creation time in lists
- 🏢 Display floor numbers and OP badge
- 🆕 Open topics in new tabs
- 👀 Preview details and comments directly in topic lists
- 📝 Optimized display for mixed Chinese and English
- 🖼️ Improved signature image display to prevent broken images
- 🌙 Auto switch to dark mode
- 📱 Ultra-wide monitor optimization

### 📚 Content Management
- ⭐ Comprehensive bookmark functionality
- 🏷️ User tag system
- 🚫 Force block topics from specified users
- 👑 Toggle to view only OP's posts
- 🔍 Keyword and tag filtering
- 📅 Block old posts by date

### 💬 Interaction Enhancement
- ⚡ Quick reply to topics (supports custom templates)
- 😊 Optimized emoji in comment boxes
- 📊 User level information query
- 👍 Quick like button
- 🔄 Auto-expand replies

### 🤖 AI Assistant
- 📋 AI topic summarization
- 💡 Smart reply generation
- 🤝 AI-assisted replies
- 🎯 Intelligent content analysis

### 🎨 Personalization
- 🎭 Multiple forum theme skins
- 😀 Switch forum emoji styles
- 🎨 Custom CSS support
- ☁️ Cloud sync for settings data
- 🖼️ Custom forum logo
- 📑 Custom tab icon and title

### 🛠️ Practical Tools
- 📸 Convert topics to images for sharing
- 📄 Export forum articles
- ⬆️ Back to top / jump to first floor
- 🔕 Quick mute for posts
- 🎯 View your own reply floors

## 🛠️ Development Guide

### 📋 Environment Requirements
- **Node.js**: `v22.12.0`
- **Package Manager**: npm

### 🚀 Local Development

```bash
# 1. Clone the project
git clone https://github.com/ezyshu/linuxdo-scripts.git
cd linuxdo-scripts

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

### 📦 Load the Extension
1. Open your browser's extension management page
   - Chrome: `chrome://extensions/`
   - Firefox: `about:addons`
2. Enable "Developer Mode"
3. Click "Load unpacked extension"
4. Select the `.output/chrome-mv3` folder in the project root directory

### 🏗️ Project Structure
```
linuxdo-scripts/
├── entrypoints/          # Entry files
├── components/           # Vue components
├── public/               # Static assets
├── docs/                 # Documentation
├── i18n/                 # Internationalization files
└── package.json          # Project configuration
```

### 💡 Development Guidelines
- 🧩 **Component-based development**: Each feature is an independent component to avoid conflicts
- 📝 **Code standards**: Follow ESLint configuration
- 🔄 **Submission process**: PR → Code review → Merge
- 📚 **Documentation updates**: New features must be documented

## 🤝 Contributing

### 🎯 How to Contribute
- 🐛 [Report Bugs](https://github.com/ezyshu/linuxdo-scripts/issues/new?template=bug_report.yml)
- 💡 [Feature Suggestions](https://github.com/ezyshu/linuxdo-scripts/issues/new?template=feature_report.yml)
- 🔧 [Submit Code](https://github.com/ezyshu/linuxdo-scripts/pulls)
- 🙍‍♂️ [Join Discussions](https://discord.gg/n2pErsD7Kg)

### 👥 Contributors
![Contributors](https://contrib.rocks/image?repo=ezyshu/linuxdo-scripts)

## 📊 Project Statistics

### ⭐ Star History
[![Star History Chart](https://api.star-history.com/svg?repos=ezyshu/linuxdo-scripts&type=Timeline)](https://www.star-history.com/#ezyshu/linuxdo-scripts&Timeline)

## 📄 License

This project is licensed under the [Apache License 2.0](https://github.com/ezyshu/linuxdo-scripts/blob/main/LICENSE).

**You are free to:**
- ✅ Use, copy, modify, and distribute this software
- ✅ Use for commercial purposes
- ✅ Re-license under the terms of the license

**You must:**
- 📋 Retain the original copyright notice
- 📋 Indicate any changes made to the original code

## ⚠️ Disclaimer

- This project is **free and open-source** and does not guarantee absolute perfection or freedom from errors
- Please assess risks yourself before use and comply with relevant laws and regulations
- Any form of abuse is strictly prohibited
- For infringement issues, please contact [ezyshu](https://github.com/ezyshu) for prompt resolution

---

<div align="center">
  <p>If you find this project helpful, please consider giving us a ⭐ Star!</p>
  <p>Made with ❤️ by <a href="https://github.com/ezyshu">ezyshu</a> and <a href="https://github.com/ezyshu/linuxdo-scripts/graphs/contributors">contributors</a></p>
</div>
