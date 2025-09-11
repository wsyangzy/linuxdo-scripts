<template>
  <div class="history-btn-container">
    <div class="el-button history-btn" @click.stop="toggleHistoryPopup" title="浏览历史">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-history">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 8l0 4l2 2"/>
        <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 -4v4h4"/>
      </svg>
    </div>
    
    <!-- 历史记录弹窗 -->
    <div 
      class="history-popup history-popup-force"
      :class="{ 
        'popup-visible': isPopupVisible,
        'popup-force-visible': isPopupVisible 
      }"
      v-show="isPopupVisible" 
      @click.stop
      :style="popupPosition"
    >
      <!-- 设置区域 -->
      <div class="history-settings">
        <div class="settings-row">
          <label>记录条数:</label>
          <select 
            v-model.number="maxRecords" 
            @change="handleSelectChange"
            @click.stop
            class="settings-select"
          >
            <option :value="20">20条</option>
            <option :value="50">50条</option>
            <option :value="100">100条</option>
          </select>
          <button class="clear-btn" @click.stop="clearAllHistory">清空记录</button>
        </div>
      </div>

      <!-- 历史记录列表 -->
      <div class="history-content">
        <div v-if="historyList.length === 0" class="empty-state">
          暂无浏览记录
        </div>
        <div v-else class="history-list">
          <div 
            v-for="(item, index) in displayHistoryList" 
            :key="item.id" 
            class="history-item"
            @click="visitPost(item)"
          >
            <div class="history-item-content">
              <div class="history-title" :title="item.title">{{ item.title }}</div>
              <div class="history-info">
                <span class="history-time">{{ formatTime(item.time) }}</span>
                <span class="history-category" v-if="item.category">{{ item.category }}</span>
              </div>
            </div>
            <button 
              class="delete-btn" 
              @click.stop="deleteHistoryItem(index)"
              title="删除记录"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { historyStorage } from '../../utils/historyStorage.js'

export default {
  name: 'HistoryBtn',
  data() {
    return {
      isPopupVisible: false,
      historyList: [],
      maxRecords: 20,
      popupPosition: {
        left: '0px',
        top: '0px'
      },
      popupShowTime: 0  // 记录弹窗显示时间，防止立即关闭
    }
  },
  computed: {
    displayHistoryList() {
      return this.historyList.slice(0, this.maxRecords)
    }
  },
  watch: {
    // 监听历史记录数据变化，重新计算位置
    displayHistoryList(newList, oldList) {
      if (this.isPopupVisible && newList.length !== oldList.length) {
        console.log('History list changed, recalculating position:', {
          oldLength: oldList.length,
          newLength: newList.length
        })
        
        // 延迟重新计算位置，确保DOM更新完成
        this.$nextTick(() => {
          setTimeout(() => {
            this.calculateSafePosition()
            if (this.isPopupVisible) {
              this.forceShowPopup()
            }
          }, 50)
        })
      }
    },
    
    // 监听最大记录数变化
    maxRecords(newVal, oldVal) {
      if (this.isPopupVisible && newVal !== oldVal) {
        console.log('Max records changed, recalculating position:', {
          oldValue: oldVal,
          newValue: newVal
        })
        
        this.$nextTick(() => {
          setTimeout(() => {
            this.calculateSafePosition()
            if (this.isPopupVisible) {
              this.forceShowPopup()
            }
          }, 50)
        })
      }
    }
  },
  mounted() {
    console.log('HistoryBtn component mounted') // 调试信息
    try {
      this.loadHistoryData()
      this.loadSettings()
      // 监听点击外部关闭弹窗 - 使用冒泡模式，允许组件内部事件先处理
      document.addEventListener('click', this.handleClickOutside, false)
      // 监听窗口尺寸变化
      window.addEventListener('resize', this.handleWindowResize)
      // 监听 URL 变化
      this.setupURLChangeListener()
      // 记录当前页面访问
      this.recordCurrentVisit()
      
      // 添加额外的DOM保护机制
      this.setupDOMProtection()
    } catch (error) {
      console.error('HistoryBtn初始化失败:', error)
    }
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false)
    window.removeEventListener('resize', this.handleWindowResize)
    if (this.urlObserver) {
      this.urlObserver.disconnect()
    }
    if (this.domProtectionInterval) {
      clearInterval(this.domProtectionInterval)
    }
  },
  methods: {
    async loadHistoryData() {
      try {
        this.historyList = await historyStorage.getHistory()
      } catch (error) {
        console.error('加载历史记录失败:', error)
        this.historyList = []
      }
    },

    async loadSettings() {
      try {
        const settings = await historyStorage.getSettings()
        // 确保 maxRecords 在可选范围内，否则设置为默认值
        const validOptions = [20, 50, 100]
        this.maxRecords = validOptions.includes(settings.maxRecords) ? settings.maxRecords : 20
      } catch (error) {
        console.error('加载设置失败:', error)
        this.maxRecords = 20
      }
    },

    async saveSettings() {
      try {
        await historyStorage.saveSettings({
          maxRecords: this.maxRecords
        })
      } catch (error) {
        console.error('保存设置失败:', error)
      }
    },

    toggleHistoryPopup() {
      console.log('History button clicked!') // 调试信息
      this.isPopupVisible = !this.isPopupVisible
      console.log('Popup visibility changed to:', this.isPopupVisible) // 新增调试信息
      
      if (this.isPopupVisible) {
        console.log('Opening popup, loading history...') // 调试信息
        
        // 记录显示时间
        this.popupShowTime = Date.now()
        
        // 立即计算并设置安全位置
        this.calculateSafePosition()
        
        // 使用 nextTick 确保 DOM 更新完成后再强制显示和加载数据
        this.$nextTick(() => {
          this.forceShowPopup()
          this.loadHistoryData()
          
          // 如果初次检测没有找到按钮，延迟重新计算位置
          setTimeout(() => {
            this.recalculatePositionIfNeeded()
          }, 100)
          
          // 添加弹窗显示动画
          setTimeout(() => {
            const popup = this.$el.querySelector('.history-popup')
            if (popup) {
              popup.classList.add('popup-enter-active')
            }
          }, 10)
        })
      } else {
        console.log('Closing popup')
        this.hidePopup()
      }
    },

    // 选择器值变化处理
    handleSelectChange(event) {
      console.log('Select value changed:', event.target.value)
      this.saveSettings()
    },

    handleClickOutside(event) {
      // 如果弹窗不可见，不需要处理
      if (!this.isPopupVisible) return
      
      // 防止在弹窗刚显示时立即触发关闭
      if (Date.now() - this.popupShowTime < 100) return
      
      const popup = this.$el?.querySelector('.history-popup')
      const button = this.$el?.querySelector('.history-btn')
      
      // 更安全的元素检查
      if (!popup || !button || !event.target) return
      
      // 检查点击是否在弹窗内部或按钮上
      const clickedInsidePopup = popup.contains(event.target)
      const clickedButton = button.contains(event.target) || button === event.target
      
      console.log('Click outside check:', {
        clickedInsidePopup,
        clickedButton,
        targetElement: event.target?.tagName,
        targetClass: event.target?.className
      })
      
      // 如果点击不在弹窗内部且不是按钮，则关闭弹窗
      if (!clickedInsidePopup && !clickedButton) {
        console.log('Clicking outside, closing popup')
        this.closePopup()
      }
    },

    // 统一的关闭弹窗方法
    closePopup() {
      this.isPopupVisible = false
      this.hidePopup()
    },

    // 强制显示弹窗的方法
    forceShowPopup() {
      const popup = this.$el.querySelector('.history-popup')
      if (!popup) {
        console.error('Popup element not found in DOM!')
        return
      }
      
      // 使用内联样式和最高优先级确保显示
      const forceStyles = [
        'display: block !important',
        'opacity: 1 !important', 
        'visibility: visible !important',
        'pointer-events: auto !important',
        'z-index: 2147483647 !important', // 最大 z-index 值
        'position: fixed !important',
        'transform: translateZ(0) !important',
        'will-change: transform !important',
        'background: rgba(255, 255, 255, 0.98) !important',
        'border: 2px solid #007bff !important', // 调试边框
        'box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3) !important'
      ]
      
      popup.style.cssText = forceStyles.join('; ')
      
      const rect = popup.getBoundingClientRect()
      console.log('Force show popup result:', {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        visible: rect.width > 0 && rect.height > 0,
        display: getComputedStyle(popup).display,
        visibility: getComputedStyle(popup).visibility,
        opacity: getComputedStyle(popup).opacity,
        zIndex: getComputedStyle(popup).zIndex
      })
    },

    // 隐藏弹窗的方法
    hidePopup() {
      const popup = this.$el.querySelector('.history-popup')
      if (popup) {
        console.log('Hiding popup')
        // 清除所有强制样式
        popup.style.cssText = ''
        // 确保隐藏
        popup.style.display = 'none'
        popup.style.opacity = '0'
        popup.style.visibility = 'hidden'
        popup.style.pointerEvents = 'none'
      }
    },

    // 改进的安全位置计算方法 - 解决动态内容和遮挡问题
    calculateSafePosition() {
      try {
        // 动态计算弹窗尺寸
        const baseWidth = 380
        const baseHeight = 160 // 设置区域高度
        const itemHeight = 68   // 每个历史条目的高度
        const maxItems = 8      // 最大显示条目数
        const emptyStateHeight = 180 // 空状态区域高度（包含图标、文字和边距）
        
        // 根据实际历史记录数量计算弹窗高度
        const actualItems = Math.min(this.displayHistoryList.length, maxItems)
        let contentHeight
        
        if (actualItems > 0) {
          // 有历史记录时：每项高度 * 项数 + 内边距
          contentHeight = actualItems * itemHeight + 40
        } else {
          // 空状态时：根据屏幕尺寸调整高度
          const isMobile = window.innerWidth <= 480
          contentHeight = isMobile ? 160 : emptyStateHeight
        }
        
        // 计算总高度，确保不超过屏幕限制
        const totalHeight = baseHeight + contentHeight
        const maxHeight = Math.min(window.innerHeight * 0.8, window.innerWidth <= 480 ? window.innerHeight * 0.7 : window.innerHeight * 0.8)
        const popupHeight = Math.min(totalHeight, maxHeight)
        const popupWidth = Math.min(baseWidth, window.innerWidth * 0.9)
        
        console.log('Popup size calculation:', {
          actualItems,
          contentHeight,
          totalHeight,
          finalHeight: popupHeight,
          isEmpty: actualItems === 0
        })
        
        const margin = 20
        let left, top
        let button = null
        
        // 改进的按钮检测机制
        const findButton = () => {
          const selectors = [
            '.history-btn',
            '.history-btn-container .history-btn',
            '[title="浏览历史"]'
          ]
          
          for (const selector of selectors) {
            const btn = this.$el?.querySelector(selector) || document.querySelector(selector)
            if (btn && btn.offsetWidth > 0 && btn.offsetHeight > 0) return btn
          }
          return null
        }
        
        button = findButton()
        
        if (button) {
          const rect = button.getBoundingClientRect()
          console.log('Button position:', {
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height,
            viewport: { width: window.innerWidth, height: window.innerHeight },
            popupSize: { width: popupWidth, height: popupHeight }
          })
          
          // 智能位置计算 - 避免遮挡按钮
          const positions = [
            // 1. 左侧显示（优先，避免右下角溢出）
            {
              left: rect.left - popupWidth - margin,
              top: Math.max(margin, Math.min(rect.top - popupHeight / 4, window.innerHeight - popupHeight - margin)),
              priority: rect.left >= popupWidth + margin ? 10 : 0,
              description: 'left'
            },
            // 2. 上方显示（避免遮挡按钮）
            {
              left: Math.max(margin, Math.min(
                rect.left + rect.width / 2 - popupWidth / 2, 
                window.innerWidth - popupWidth - margin
              )),
              top: rect.top - popupHeight - margin,
              priority: rect.top >= popupHeight + margin ? 9 : 0,
              description: 'top'
            },
            // 3. 右侧显示
            {
              left: rect.right + margin,
              top: Math.max(margin, Math.min(rect.top - popupHeight / 4, window.innerHeight - popupHeight - margin)),
              priority: (window.innerWidth - rect.right) >= popupWidth + margin ? 8 : 0,
              description: 'right'
            },
            // 4. 下方显示（可能遮挡按钮，优先级较低）
            {
              left: Math.max(margin, Math.min(
                rect.left + rect.width / 2 - popupWidth / 2, 
                window.innerWidth - popupWidth - margin
              )),
              top: rect.bottom + margin,
              priority: (window.innerHeight - rect.bottom) >= popupHeight + margin ? 7 : 0,
              description: 'bottom'
            },
            // 5. 左上角安全区域
            {
              left: margin,
              top: margin,
              priority: 6,
              description: 'top-left'
            },
            // 6. 右上角安全区域
            {
              left: window.innerWidth - popupWidth - margin,
              top: margin,
              priority: 5,
              description: 'top-right'
            },
            // 7. 屏幕中心（最后选择）
            {
              left: (window.innerWidth - popupWidth) / 2,
              top: (window.innerHeight - popupHeight) / 2,
              priority: 4,
              description: 'center'
            }
          ]
          
          // 为每个位置计算遮挡分数（越低越好）
          positions.forEach(pos => {
            // 检查是否会遮挡按钮
            const popupRect = {
              left: pos.left,
              top: pos.top,
              right: pos.left + popupWidth,
              bottom: pos.top + popupHeight
            }
            
            const buttonRect = {
              left: rect.left - 10, // 增加一些缓冲区域
              top: rect.top - 10,
              right: rect.right + 10,
              bottom: rect.bottom + 10
            }
            
            // 计算重叠区域
            const overlapLeft = Math.max(popupRect.left, buttonRect.left)
            const overlapTop = Math.max(popupRect.top, buttonRect.top)
            const overlapRight = Math.min(popupRect.right, buttonRect.right)
            const overlapBottom = Math.min(popupRect.bottom, buttonRect.bottom)
            
            const hasOverlap = overlapLeft < overlapRight && overlapTop < overlapBottom
            if (hasOverlap) {
              pos.priority -= 5 // 降低遮挡按钮位置的优先级
              pos.overlap = true
            }
            
            // 检查边界溢出
            if (pos.left < margin || pos.left + popupWidth + margin > window.innerWidth) {
              pos.priority -= 2
            }
            if (pos.top < margin || pos.top + popupHeight + margin > window.innerHeight) {
              pos.priority -= 2
            }
          })
          
          // 选择优先级最高的位置
          const bestPosition = positions.reduce((best, current) => 
            current.priority > best.priority ? current : best
          )
          
          left = bestPosition.left
          top = bestPosition.top
          
          console.log('Position calculation result:', {
            selectedPosition: bestPosition.description,
            priority: bestPosition.priority,
            overlap: bestPosition.overlap || false,
            allPositions: positions.map(p => ({ 
              desc: p.description, 
              priority: p.priority, 
              overlap: p.overlap || false 
            }))
          })
          
        } else {
          console.warn('Button not found, using safe center position')
          left = (window.innerWidth - popupWidth) / 2
          top = (window.innerHeight - popupHeight) / 2
        }
        
        // 最终边界检查和修正
        left = Math.max(margin, Math.min(left, window.innerWidth - popupWidth - margin))
        top = Math.max(margin, Math.min(top, window.innerHeight - popupHeight - margin))
        
        console.log('Final popup position:', { 
          left, 
          top, 
          width: popupWidth,
          height: popupHeight,
          buttonFound: !!button,
          historyItems: this.displayHistoryList.length,
          finalPosition: { left: left + 'px', top: top + 'px' }
        })
        
        this.popupPosition = {
          left: left + 'px',
          top: top + 'px'
        }
        
        // 更新弹窗的动态高度
        this.$nextTick(() => {
          const popup = this.$el?.querySelector('.history-popup')
          if (popup) {
            popup.style.maxHeight = popupHeight + 'px'
          }
        })
        
      } catch (error) {
        console.error('Position calculation failed:', error)
        // 最终兜底位置：屏幕中心，避免遮挡
        const safeWidth = Math.min(380, window.innerWidth * 0.9)
        const safeHeight = Math.min(520, window.innerHeight * 0.8)
        this.popupPosition = {
          left: ((window.innerWidth - safeWidth) / 2) + 'px',
          top: ((window.innerHeight - safeHeight) / 2) + 'px'
        }
      }
    },

    // 窗口尺寸变化处理
    handleWindowResize() {
      if (this.isPopupVisible) {
        console.log('Window resized, recalculating popup position')
        
        // 防抖处理，避免频繁计算
        clearTimeout(this.resizeTimer)
        this.resizeTimer = setTimeout(() => {
          this.calculateSafePosition()
          if (this.isPopupVisible) {
            this.forceShowPopup()
          }
        }, 100)
      }
    },

    // 延迟重新计算位置（用于按钮检测失败的情况）
    recalculatePositionIfNeeded() {
      // 检查当前位置是否为屏幕中心（说明没有找到按钮）
      const currentLeft = parseInt(this.popupPosition.left)
      const currentTop = parseInt(this.popupPosition.top)
      const screenCenterX = (window.innerWidth - 320) / 2
      const screenCenterY = (window.innerHeight - 420) / 2
      
      // 如果当前位置是屏幕中心（误差在10像素内），尝试重新查找按钮
      if (Math.abs(currentLeft - screenCenterX) < 10 && Math.abs(currentTop - screenCenterY) < 10) {
        console.log('Recalculating position after delay...')
        this.calculateSafePosition()
        
        // 如果位置发生了改变，更新弹窗显示
        if (this.isPopupVisible) {
          this.forceShowPopup()
        }
      }
    },

    // DOM保护机制，确保弹窗在显示状态时不被意外隐藏
    setupDOMProtection() {
      // 每100ms检查一次弹窗状态，确保显示正常
      this.domProtectionInterval = setInterval(() => {
        if (this.isPopupVisible) {
          const popup = this.$el?.querySelector('.history-popup')
          if (popup) {
            const computedStyle = getComputedStyle(popup)
            const rect = popup.getBoundingClientRect()
            
            // 如果弹窗应该显示但实际不可见，则强制修复
            if (computedStyle.display === 'none' || 
                computedStyle.visibility === 'hidden' || 
                computedStyle.opacity === '0' ||
                rect.width === 0 || rect.height === 0) {
              
              console.warn('Popup visibility issue detected, forcing display')
              this.forceShowPopup()
            }
          }
        }
      }, 100)
    },

    updatePopupPosition() {
      // 兼容性保留，内部调用新的计算方法
      this.calculateSafePosition()
    },

    async recordCurrentVisit() {
      try {
        const path = window.location.pathname
        const postId = path.match(/\/t\/(\d+)/)?.[1] || path.match(/\/topic\/(\d+)/)?.[1]
        
        if (!postId) return

        // 等待页面加载完成后获取标题
        setTimeout(async () => {
          const title = document.querySelector('h1')?.textContent?.trim() || 
                       document.querySelector('.header-title .topic-link')?.textContent?.trim() || 
                       document.title
          
          if (!title || title === '话题 - Linux Do') return

          const url = window.location.href
          const category = document.querySelector('.categories-wrapper .badge-category__wrapper:nth-child(1) .badge-category__name')?.textContent?.trim() || ''

          const historyItem = {
            id: postId,
            title: title,
            url: url,
            category: category,
            time: new Date().toISOString()
          }

          await historyStorage.addHistoryItem(historyItem)
          
          // 重新加载历史记录
          if (this.isPopupVisible) {
            this.loadHistoryData()
          }
        }, 1000)
      } catch (error) {
        console.error('记录访问历史失败:', error)
      }
    },

    setupURLChangeListener() {
      let lastUrl = location.href
      
      // 使用 MutationObserver 监听 DOM 变化来检测 SPA 路由变化
      this.urlObserver = new MutationObserver(() => {
        if (location.href !== lastUrl) {
          lastUrl = location.href
          setTimeout(() => {
            this.recordCurrentVisit()
          }, 500)
        }
      })

      this.urlObserver.observe(document.body, { 
        childList: true, 
        subtree: true 
      })

      // 监听浏览器前进后退
      window.addEventListener('popstate', () => {
        setTimeout(() => {
          this.recordCurrentVisit()
        }, 500)
      })
    },

    visitPost(item) {
      if (item.url) {
        window.location.href = item.url
      }
    },

    async deleteHistoryItem(index) {
      if (confirm(`确定删除记录 "${this.historyList[index].title}" 吗？`)) {
        try {
          await historyStorage.removeHistoryItem(index)
          const oldLength = this.historyList.length
          this.loadHistoryData()
          
          // 删除后如果弹窗可见，重新计算位置
          if (this.isPopupVisible) {
            this.$nextTick(() => {
              setTimeout(() => {
                console.log('Item deleted, recalculating position')
                this.calculateSafePosition()
                this.forceShowPopup()
              }, 50)
            })
          }
          
          this.messageToast('记录已删除')
        } catch (error) {
          console.error('删除历史记录失败:', error)
          this.messageToast('删除失败')
        }
      }
    },

    async clearAllHistory() {
      if (confirm('确定要清空所有浏览记录吗？')) {
        try {
          await historyStorage.clearHistory()
          this.historyList = []
          
          // 清空后如果弹窗可见，重新计算位置
          if (this.isPopupVisible) {
            this.$nextTick(() => {
              setTimeout(() => {
                console.log('History cleared, recalculating position')
                this.calculateSafePosition()
                this.forceShowPopup()
              }, 50)
            })
          }
          
          this.messageToast('历史记录已清空')
        } catch (error) {
          console.error('清空历史记录失败:', error)
          this.messageToast('清空失败')
        }
      }
    },

    formatTime(timeStr) {
      const time = new Date(timeStr)
      const now = new Date()
      const diff = now - time
      const minutes = Math.floor(diff / 60000)
      const hours = Math.floor(diff / 3600000)
      const days = Math.floor(diff / 86400000)

      if (minutes < 1) return '刚刚'
      if (minutes < 60) return `${minutes}分钟前`
      if (hours < 24) return `${hours}小时前`
      if (days < 7) return `${days}天前`
      
      return time.toLocaleDateString('zh-CN', {
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    // 提示组件
    messageToast(message) {
      const messageElement = document.createElement("div")
      messageElement.className = "messageToast-text"
      messageElement.innerText = message
      
      const toastContainer = document.getElementById("messageToast")
      if (toastContainer) {
        toastContainer.appendChild(messageElement)
        setTimeout(() => {
          if (messageElement.parentNode) {
            messageElement.remove()
          }
        }, 3000)
      }
    }
  }
}
</script>

<style scoped>
.history-btn-container {
  position: relative;
}

/* 历史按钮现代化设计 */
.history-btn {
  background: linear-gradient(135deg, var(--primary, #4f46e5) 0%, var(--primary-medium, #6366f1) 100%);
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  padding: 12px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 
    0 4px 15px rgba(var(--primary-rgb, 79, 70, 229), 0.2),
    0 2px 4px rgba(var(--primary-rgb, 79, 70, 229), 0.1);
  position: relative;
  overflow: hidden;
}

.history-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.history-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 
    0 8px 25px rgba(var(--primary-rgb, 79, 70, 229), 0.3),
    0 4px 8px rgba(var(--primary-rgb, 79, 70, 229), 0.15);
}

.history-btn:hover::before {
  left: 100%;
}

.history-btn:active {
  transform: translateY(-1px) scale(1.02);
  transition: all 0.1s;
}

/* 优化的弹窗基础样式 */
.history-popup {
  position: fixed !important;
  width: min(380px, 90vw) !important;
  max-height: min(520px, 80vh) !important;
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  border-radius: 20px !important;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.7) !important;
  z-index: 2147483647 !important;
  overflow: hidden !important;
  border: none !important;
  transform: translateZ(0) scale(0.95) !important;
  opacity: 0 !important;
  will-change: transform, opacity !important;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
}

/* 弹窗进入动画 */
.history-popup.popup-enter-active {
  transform: translateZ(0) scale(1) !important;
  opacity: 1 !important;
}

/* 强制显示样式 - 最高优先级 */
.history-popup-force {
  display: block !important;
  visibility: visible !important;
  pointer-events: auto !important;
}

/* 可见状态样式 */
.history-popup.popup-visible,
.history-popup.popup-force-visible {
  display: block !important;
  visibility: visible !important;
  pointer-events: auto !important;
}

/* Vue v-show 强制覆盖 */
.history-popup[style*="display: none"] {
  display: block !important;
}

.history-popup[style*="visibility: hidden"] {
  visibility: visible !important;
}

/* 现代化设置区域 */
.history-settings {
  padding: 20px;
  background: linear-gradient(135deg, rgba(var(--primary-rgb, 79, 70, 229), 0.05) 0%, rgba(var(--primary-rgb, 79, 70, 229), 0.08) 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  position: relative;
}

.history-settings::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 20px;
  right: 20px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent);
}

.settings-row {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

/* 现代化选择器样式 */
.settings-select {
  min-width: 80px;
  padding: 8px 12px;
  border: 2px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.9);
  color: #374151;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-right: 32px;
}

.settings-select:focus {
  outline: none;
  border-color: var(--primary, #4f46e5);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 0 3px rgba(var(--primary-rgb, 79, 70, 229), 0.1);
  transform: scale(1.02);
}

.settings-select:hover {
  border-color: rgba(var(--primary-rgb, 79, 70, 229), 0.3);
  background: rgba(255, 255, 255, 1);
}

/* 选择器选项样式 */
.settings-select option {
  padding: 8px 12px;
  background: #fff;
  color: #374151;
  font-weight: 500;
}

.settings-select option:hover,
.settings-select option:checked {
  background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
  color: var(--primary, #4f46e5);
}

/* 现代化清空按钮 */
.clear-btn {
  padding: 8px 16px;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.2);
  position: relative;
  overflow: hidden;
}

.clear-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.4s;
}

.clear-btn:hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

.clear-btn:hover::before {
  left: 100%;
}

.clear-btn:active {
  transform: translateY(0);
  transition: all 0.1s;
}

/* 优化的内容区域 */
.history-content {
  max-height: min(400px, 60vh);
  overflow-y: auto;
  padding: 8px 0;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #9CA3AF;
  font-size: 15px;
  font-weight: 500;
  background: linear-gradient(135deg, rgba(156, 163, 175, 0.1) 0%, rgba(156, 163, 175, 0.05) 100%);
  margin: 20px;
  border-radius: 15px;
  border: 2px dashed rgba(156, 163, 175, 0.2);
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.empty-state::before {
  content: '📝';
  display: block;
  font-size: 32px;
  margin-bottom: 15px;
  opacity: 0.6;
}

.history-list {
  padding: 0;
}

/* 现代化历史条目设计 */
.history-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  margin: 0 8px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 15px;
  position: relative;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
}

.history-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(135deg, var(--primary, #4f46e5) 0%, var(--primary-medium, #6366f1) 100%);
  border-radius: 0 2px 2px 0;
  opacity: 0;
  transition: all 0.3s;
}

.history-item:hover {
  background: rgba(var(--primary-rgb, 79, 70, 229), 0.08);
  transform: translateX(4px);
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.1),
    0 3px 6px rgba(0, 0, 0, 0.05);
}

.history-item:hover::before {
  opacity: 1;
}

.history-item:active {
  transform: translateX(2px) scale(0.995);
  transition: all 0.1s;
}

.history-item-content {
  flex: 1;
  min-width: 0;
}

.history-title {
  font-size: 15px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.4;
  transition: color 0.3s;
}

.history-item:hover .history-title {
  color: var(--primary, #4f46e5);
}

.history-info {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #6B7280;
  font-weight: 500;
}

.history-time {
  color: #9CA3AF;
  background: rgba(156, 163, 175, 0.1);
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 12px;
}

.history-category {
  background: linear-gradient(135deg, rgba(var(--primary-rgb, 79, 70, 229), 0.15) 0%, rgba(var(--primary-rgb, 79, 70, 229), 0.1) 100%);
  color: var(--primary, #4f46e5);
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid rgba(var(--primary-rgb, 79, 70, 229), 0.1);
}

/* 现代化删除按钮 */
.delete-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(239, 68, 68, 0.1);
  color: rgba(239, 68, 68, 0.7);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  line-height: 1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: scale(0.8);
  font-weight: 600;
}

.history-item:hover .delete-btn {
  opacity: 1;
  transform: scale(1);
}

.delete-btn:hover {
  background: rgba(239, 68, 68, 0.15);
  color: rgba(239, 68, 68, 1);
  transform: scale(1.1) rotate(90deg);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
}

.delete-btn:active {
  transform: scale(0.95) rotate(90deg);
  transition: all 0.1s;
}

/* 精美的滚动条设计 */
.history-content::-webkit-scrollbar {
  width: 8px;
}

.history-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  margin: 8px 0;
}

.history-content::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, rgba(var(--primary-rgb, 79, 70, 229), 0.3) 0%, rgba(var(--primary-rgb, 79, 70, 229), 0.5) 100%);
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
}

.history-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, rgba(var(--primary-rgb, 79, 70, 229), 0.5) 0%, rgba(var(--primary-rgb, 79, 70, 229), 0.7) 100%);
  border-color: rgba(255, 255, 255, 0.3);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .history-popup {
    width: calc(100vw - 20px) !important;
    max-height: calc(100vh - 40px) !important;
    border-radius: 16px !important;
  }
  
  .history-settings {
    padding: 16px;
  }
  
  .settings-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .settings-select {
    min-width: 120px;
  }
  
  .history-item {
    padding: 14px 16px;
    margin: 0 4px;
  }
  
  .history-title {
    font-size: 14px;
  }
  
  .empty-state {
    margin: 10px;
    padding: 30px 15px;
    min-height: 100px;
    font-size: 14px;
  }
  
  .empty-state::before {
    font-size: 28px;
    margin-bottom: 10px;
  }
}

/* 暗色主题适配 */
@media (prefers-color-scheme: dark) {
  .history-popup,
  .history-popup-force {
    background: rgba(17, 24, 39, 0.95) !important;
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
  }
  
  .history-settings {
    background: linear-gradient(135deg, rgba(var(--primary-rgb, 79, 70, 229), 0.1) 0%, rgba(var(--primary-rgb, 79, 70, 229), 0.15) 100%);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .settings-row {
    color: #E5E7EB;
  }
  
  .settings-select {
    background: rgba(31, 41, 55, 0.9);
    border-color: rgba(255, 255, 255, 0.1);
    color: #E5E7EB;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23e5e7eb' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  }
  
  .settings-select:focus {
    background: rgba(31, 41, 55, 1);
    border-color: var(--primary, #4f46e5);
  }
  
  .settings-select:hover {
    background: rgba(31, 41, 55, 1);
    border-color: rgba(var(--primary-rgb, 79, 70, 229), 0.4);
  }
  
  .settings-select option {
    background: #1F2937;
    color: #E5E7EB;
  }
  
  .history-title {
    color: #F3F4F6;
  }
  
  .history-item:hover .history-title {
    color: var(--primary, #6366f1);
  }
  
  .history-item {
    background: rgba(31, 41, 55, 0.6);
  }
  
  .history-item:hover {
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.15);
  }
  
  .empty-state {
    color: #6B7280;
    background: linear-gradient(135deg, rgba(107, 114, 128, 0.1) 0%, rgba(107, 114, 128, 0.05) 100%);
    border-color: rgba(107, 114, 128, 0.2);
  }
  
  .history-time {
    color: #6B7280;
    background: rgba(107, 114, 128, 0.2);
  }
  
  .history-info {
    color: #9CA3AF;
  }
}

/* 额外的强制显示规则 */
.history-popup-force,
.popup-force-visible {
  display: block !important;
  visibility: visible !important;
  pointer-events: auto !important;
  position: fixed !important;
  z-index: 2147483647 !important;
}

/* 防止被其他样式覆盖的额外保护 */
body .history-popup-force {
  display: block !important;
  visibility: visible !important;
}

#linuxdoscripts .history-popup-force {
  display: block !important;
  visibility: visible !important;
}

/* 微交互动画增强 */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.history-btn:focus {
  outline: none;
  box-shadow: 
    0 4px 15px rgba(var(--primary-rgb, 79, 70, 229), 0.2),
    0 0 0 3px rgba(var(--primary-rgb, 79, 70, 229), 0.1);
}

.history-item:focus {
  outline: none;
  background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
  box-shadow: 0 0 0 2px rgba(var(--primary-rgb, 79, 70, 229), 0.2);
}

/* 加载状态样式 */
.history-content.loading {
  position: relative;
}

.history-content.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24px;
  height: 24px;
  margin: -12px 0 0 -12px;
  border: 2px solid rgba(var(--primary-rgb, 79, 70, 229), 0.2);
  border-top: 2px solid var(--primary, #4f46e5);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>