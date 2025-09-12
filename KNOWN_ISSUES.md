# Known Issues / 已知问题

## 🐛 新UI模式悬浮按钮首次点击无响应

### 问题描述
在启用新UI模式（收缩右下角按钮功能）后，首次进入页面并展开悬浮按钮列表时，历史记录、免打扰列表等按钮无法正确响应点击，且缺少悬停动效。只有在某些特定情况下成功点击后，所有按钮才能正常工作。

### 影响范围
- **影响功能**：历史记录按钮、免打扰列表按钮、其他悬浮按钮
- **触发条件**：启用新UI模式（`settingData.checked54 = true`）+ 首次进入页面 + 首次展开按钮列表
- **影响用户**：使用新UI模式的用户

### 技术细节

#### 日志输出示例
```
History button clicked! 
New UI mode check: {
  isNewUIEnabled: true, 
  isMenuOpenFromState: true, 
  isNewUIMode: true, 
  isNewUIActive: true, 
  shouldAllowClick: true, 
  hasActiveMenuItems: false,
  hasMenuItems: true
}
Popup visibility changed to: false
Closing popup
Hiding popup
```

#### 分析结果
1. **状态检查正常**：`shouldAllowClick: true` 表明状态检查逻辑工作正常
2. **DOM状态不一致**：`hasActiveMenuItems: false` 而 `isNewUIActive: true`，显示Vue状态与DOM状态存在不同步
3. **弹窗状态异常**：从 `false` 变为 `false`，说明切换逻辑可能被其他机制干预

#### 已尝试的修复方案
- [x] 实现provide/inject状态传递机制（`App.vue` → `HistoryBtn.vue`）
- [x] 修复状态检查逻辑中的变量引用错误
- [x] 建立双重验证体系（Vue响应式状态 + DOM查询fallback）
- [x] 增强调试日志输出，便于问题追踪
- [x] 优化事件处理时机和防抖机制

### 现状
- **状态传递机制**：✅ 正常工作
- **状态检查逻辑**：✅ 已修复
- **用户体验影响**：❌ 问题仍然存在

### 可能的根本原因
1. **CSS动画系统时机**：`.menu-items.active` 类的应用与Vue状态更新存在时机差异
2. **事件冒泡/捕获冲突**：多层事件监听器可能存在冲突
3. **DOM操作时机**：`forceShowPopup()`等强制显示方法的执行时机问题
4. **Vue生命周期问题**：组件挂载和DOM更新的同步问题

### 临时解决方案
用户可以：
1. 尝试多次点击历史记录按钮直至成功响应
2. 刷新页面后重新操作
3. 临时禁用新UI模式（`settingData.checked54 = false`）

### 优先级
**中等** - 影响新UI模式的用户体验，但不影响核心功能

### 后续计划
- [ ] 深入分析CSS动画系统的初始化时机
- [ ] 检查事件处理器的冲突和优先级
- [ ] 考虑重构按钮组件的生命周期管理
- [ ] 实现更可靠的状态同步机制

---

## 📝 报告新问题

如果您遇到了新的问题，请在 [GitHub Issues](https://github.com/dlzmoe/linuxdo-scripts/issues) 中报告，包含以下信息：

1. **问题描述**：详细描述遇到的问题
2. **复现步骤**：如何重现该问题
3. **期望行为**：您期望的正常行为
4. **环境信息**：浏览器版本、扩展版本等
5. **日志信息**：如有相关控制台日志，请一并提供

---

*最后更新：2025-09-12*