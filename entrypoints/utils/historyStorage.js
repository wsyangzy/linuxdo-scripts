/**
 * 浏览历史存储管理工具
 * 使用 Chrome Extension Storage API 进行数据持久化
 */

class HistoryStorage {
  constructor() {
    this.storageKey = 'linuxdo_post_history'
    this.settingsKey = 'linuxdo_history_settings'
    this.browserAPI = typeof browser !== 'undefined' ? browser : chrome
  }

  /**
   * 获取浏览历史记录
   * @returns {Promise<Array>} 历史记录数组
   */
  async getHistory() {
    return new Promise((resolve) => {
      this.browserAPI.storage.local.get([this.storageKey], (result) => {
        const history = result[this.storageKey] || []
        // 确保历史记录按时间倒序排列
        const sortedHistory = history.sort((a, b) => new Date(b.time) - new Date(a.time))
        resolve(sortedHistory)
      })
    })
  }

  /**
   * 获取设置
   * @returns {Promise<Object>} 设置对象
   */
  async getSettings() {
    return new Promise((resolve) => {
      this.browserAPI.storage.local.get([this.settingsKey], (result) => {
        const defaultSettings = {
          maxRecords: 10,
          autoRecord: true
        }
        resolve({ ...defaultSettings, ...(result[this.settingsKey] || {}) })
      })
    })
  }

  /**
   * 保存设置
   * @param {Object} settings - 设置对象
   * @returns {Promise<void>}
   */
  async saveSettings(settings) {
    return new Promise((resolve) => {
      this.browserAPI.storage.local.set({
        [this.settingsKey]: settings
      }, resolve)
    })
  }

  /**
   * 添加历史记录项
   * @param {Object} item - 历史记录项
   * @param {string} item.id - 帖子ID
   * @param {string} item.title - 帖子标题
   * @param {string} item.url - 帖子URL
   * @param {string} item.category - 帖子分类
   * @param {string} item.time - 访问时间（ISO字符串）
   * @returns {Promise<void>}
   */
  async addHistoryItem(item) {
    try {
      const [history, settings] = await Promise.all([
        this.getHistory(),
        this.getSettings()
      ])

      // 检查是否已存在相同的帖子ID，如果存在则删除旧记录
      const existingIndex = history.findIndex(h => h.id === item.id)
      if (existingIndex !== -1) {
        history.splice(existingIndex, 1)
      }

      // 在数组开头添加新记录
      history.unshift({
        id: item.id,
        title: item.title,
        url: item.url,
        category: item.category || '',
        time: item.time
      })

      // 限制记录数量
      const maxRecords = Math.min(settings.maxRecords || 10, 50)
      if (history.length > maxRecords) {
        history.splice(maxRecords)
      }

      // 保存到存储
      await this.saveHistory(history)
    } catch (error) {
      console.error('添加历史记录失败:', error)
      throw error
    }
  }

  /**
   * 保存历史记录数组
   * @param {Array} history - 历史记录数组
   * @returns {Promise<void>}
   */
  async saveHistory(history) {
    return new Promise((resolve) => {
      this.browserAPI.storage.local.set({
        [this.storageKey]: history
      }, resolve)
    })
  }

  /**
   * 删除指定索引的历史记录
   * @param {number} index - 要删除的记录索引
   * @returns {Promise<void>}
   */
  async removeHistoryItem(index) {
    try {
      const history = await this.getHistory()
      if (index >= 0 && index < history.length) {
        history.splice(index, 1)
        await this.saveHistory(history)
      }
    } catch (error) {
      console.error('删除历史记录失败:', error)
      throw error
    }
  }

  /**
   * 清空所有历史记录
   * @returns {Promise<void>}
   */
  async clearHistory() {
    try {
      await this.saveHistory([])
    } catch (error) {
      console.error('清空历史记录失败:', error)
      throw error
    }
  }

  /**
   * 根据关键词搜索历史记录
   * @param {string} keyword - 搜索关键词
   * @returns {Promise<Array>} 匹配的历史记录
   */
  async searchHistory(keyword) {
    try {
      const history = await this.getHistory()
      if (!keyword || keyword.trim() === '') {
        return history
      }

      const lowerKeyword = keyword.toLowerCase().trim()
      return history.filter(item => 
        item.title.toLowerCase().includes(lowerKeyword) ||
        (item.category && item.category.toLowerCase().includes(lowerKeyword))
      )
    } catch (error) {
      console.error('搜索历史记录失败:', error)
      return []
    }
  }

  /**
   * 获取指定时间范围内的历史记录
   * @param {number} days - 天数，获取最近N天的记录
   * @returns {Promise<Array>} 历史记录数组
   */
  async getHistoryByDays(days = 7) {
    try {
      const history = await this.getHistory()
      const cutoffTime = new Date()
      cutoffTime.setDate(cutoffTime.getDate() - days)

      return history.filter(item => new Date(item.time) > cutoffTime)
    } catch (error) {
      console.error('获取时间范围历史记录失败:', error)
      return []
    }
  }

  /**
   * 导出历史记录为JSON
   * @returns {Promise<string>} JSON字符串
   */
  async exportHistory() {
    try {
      const [history, settings] = await Promise.all([
        this.getHistory(),
        this.getSettings()
      ])

      const exportData = {
        version: '1.0',
        exportTime: new Date().toISOString(),
        settings: settings,
        history: history
      }

      return JSON.stringify(exportData, null, 2)
    } catch (error) {
      console.error('导出历史记录失败:', error)
      throw error
    }
  }

  /**
   * 从JSON导入历史记录
   * @param {string} jsonData - JSON数据字符串
   * @param {boolean} merge - 是否与现有数据合并，默认为false（替换）
   * @returns {Promise<void>}
   */
  async importHistory(jsonData, merge = false) {
    try {
      const importData = JSON.parse(jsonData)
      
      if (!importData.history || !Array.isArray(importData.history)) {
        throw new Error('无效的导入数据格式')
      }

      let newHistory = importData.history
      
      if (merge) {
        // 合并模式：合并现有历史记录
        const existingHistory = await this.getHistory()
        const combinedHistory = [...existingHistory]
        
        // 添加导入的记录，避免重复
        for (const item of newHistory) {
          if (!combinedHistory.find(h => h.id === item.id && h.url === item.url)) {
            combinedHistory.push(item)
          }
        }
        
        // 按时间排序
        newHistory = combinedHistory.sort((a, b) => new Date(b.time) - new Date(a.time))
      }

      // 保存历史记录
      await this.saveHistory(newHistory)

      // 如果有设置数据，也一并导入
      if (importData.settings && typeof importData.settings === 'object') {
        await this.saveSettings(importData.settings)
      }

    } catch (error) {
      console.error('导入历史记录失败:', error)
      throw error
    }
  }

  /**
   * 获取存储使用情况统计
   * @returns {Promise<Object>} 统计信息
   */
  async getStorageStats() {
    try {
      const [history, settings] = await Promise.all([
        this.getHistory(),
        this.getSettings()
      ])

      const historySize = JSON.stringify(history).length
      const settingsSize = JSON.stringify(settings).length

      return {
        historyCount: history.length,
        historySize: historySize,
        settingsSize: settingsSize,
        totalSize: historySize + settingsSize,
        oldestRecord: history.length > 0 ? history[history.length - 1].time : null,
        newestRecord: history.length > 0 ? history[0].time : null
      }
    } catch (error) {
      console.error('获取存储统计失败:', error)
      return {
        historyCount: 0,
        historySize: 0,
        settingsSize: 0,
        totalSize: 0,
        oldestRecord: null,
        newestRecord: null
      }
    }
  }
}

// 创建单例实例
export const historyStorage = new HistoryStorage()

// 兼容性：也可以直接导出类
export { HistoryStorage }