[简体中文](README.md) | [English](README_EN.md)

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
    <a href="https://linuxdo-scripts.zishu.me">使用文档</a>
    ·
    <a href="https://github.com/ezyshu/linuxdo-scripts/issues/new/choose">问题反馈</a>
    ·
    <a href="https://github.com/ezyshu/linuxdo-scripts/releases/latest">最新版本</a>
  </p>

  <p>
  <img src="https://img.shields.io/github/v/release/ezyshu/linuxdo-scripts?logo=github">
  <img src="https://img.shields.io/github/stars/ezyshu/linuxdo-scripts?logo=github&style=flat">
  <img src="https://img.shields.io/chrome-web-store/users/fbgblmjbeebanackldpbmpacppflgmlj?style=flat&logo=googlechrome&label=Chrome%20Web%20Store">
  <img src="https://img.shields.io/badge/License-AGPLv3-important?logo=gnu">
  </p>
</div>

<!-- <img src="https://profile-counter.glitch.me/linuxdo-scripts/count.svg" style="display:none"> -->

LinuxDo Scripts 是一个功能丰富的浏览器扩展，旨在提升 LinuxDo 论坛的使用体验。它集成了多项实用功能，从基础的界面优化到高级的 AI 辅助功能，让您的论坛浏览和互动体验更加流畅和高效。

![image](https://github.com/user-attachments/assets/13b83ca0-3927-4261-8e29-15e152de4846)

<details>
<summary>操作指示/相关截图</summary>
  
![image](https://github.com/user-attachments/assets/880539ab-7a56-4b2f-aaaa-218ee4f8e699)
![image](https://github.com/user-attachments/assets/6ee3d75c-b4ff-489d-942d-1526a9793f4f)
![image](https://github.com/user-attachments/assets/2d106967-bb7d-49c8-af5a-9a551904cb5d)
  
</details>

## 📥 1. 安装使用

### 浏览器支持
- **Chrome / Edge / Arc / Brave**：[Chrome Web Store](https://chromewebstore.google.com/detail/fbgblmjbeebanackldpbmpacppflgmlj)
- **国内用户**：[Crx 商店](https://www.crxsoso.com/webstore/detail/fbgblmjbeebanackldpbmpacppflgmlj)
- **Firefox**：[Firefox Addons](https://addons.mozilla.org/zh-CN/firefox/addon/linux_do-scripts/)


## ✨ 2. 主要特性

### 🔍 浏览体验优化
- 话题列表显示创建时间
- 显示楼层数
- 新标签页打开话题
- 在话题列表直接预览详情及评论
- 中英文混排优化显示
- 优化签名图显示，防止图裂
- 自动切换黑夜模式

### 📚 内容管理
- 完善的收藏夹功能
- 用户标签功能
- 强制屏蔽（拉黑）指定用户的话题
- 只看楼主切换功能

### 💬 互动增强
- 话题快捷回复（支持自定义）
- 评论框表情优化
- 楼层抽奖功能
- 等级信息查询

### 🤖 AI 智能
- AI 话题总结
- 智能生成回复
- AI 辅助回帖

### 🎨 个性化
- 切换论坛主题皮肤
- 切换论坛表情风格
- 支持自定义 CSS 样式
- 设置面板数据同步

## 🛠️ 3. 开发指南

### 环境要求
```
node: v22.12.0
```

### 本地开发
1. 克隆仓库并安装依赖：
```shell
git clone https://github.com/ezyshu/linuxdo-scripts
npm install
```

2. 启动开发服务：
```shell
npm run dev
```

3. 加载扩展：
- 打开本地 `.output` 文件夹
- 将 `chrome-mv3` 文件夹拖拽到 `chrome://extensions/` 中

### 开发说明
- 采用组件化开发模式
- 每个新功能以独立组件形式开发，避免冲突
- 提交 PR 后将进行代码审核，无重大问题将尽快合并

## 🚀 4. 贡献者

![Contributor](https://contrib.rocks/image?repo=ezyshu/linuxdo-scripts)

## 🤝 5. 贡献指南

欢迎提出新的功能想法和改进建议！您可以通过以下方式参与项目：
- 提交 Issue 报告问题或提出建议
- 提交 Pull Request 贡献代码
- 加入 Discord 社区参与讨论

## ⭐️ 6. Star History

[![Star History Chart](https://api.star-history.com/svg?repos=ezyshu/linuxdo-scripts&type=Timeline)](https://www.star-history.com/#ezyshu/linuxdo-scripts&Timeline)

## 📄 7. 许可证
 
本项目采用 [Apache License 2.0](https://github.com/ezyshu/linuxdo-scripts/blob/main/LICENSE) 协议开源。

您可以自由地分享和修改本项目，但必须标明原作者和来源。

## 📖 8. 免责声明

本项目免费且开放源代码，但不保证其绝对完善无误，请您在决定使用前自行评估风险。同时，务必遵守所有适用法律法规，严禁任何形式的滥用行为。

如果有任何侵权行为，请联系 [ezyshu](https://github.com/ezyshu)，将会及时处理。
