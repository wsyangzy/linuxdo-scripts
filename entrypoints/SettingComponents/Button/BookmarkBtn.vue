<template>
  <div>
    <div class="el-button bookmark-btn linxudoscripts-bookmark1" @click="bookmark" title="收藏">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bookmark">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 4h6a2 2 0 0 1 2 2v14l-5 -3l-5 3v-14a2 2 0 0 1 2 -2"/>
      </svg>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      silentBookmark: false,
      bookmarkIntervalId: null, // 添加变量存储定时器 ID
    };
  },
  methods: {
    // 提示组件
    messageToast(message) {
      const messageElement = document.createElement("div");
      messageElement.className = "messageToast-text";
      messageElement.innerText = message;
      document.getElementById("messageToast").appendChild(messageElement);
      setTimeout(() => {
        messageElement.remove();
      }, 3000);
    },

    bookmark() {
      if ($(".header-title .topic-link").text().trim() == "") {
        this.messageToast("请将页面往下滑动一点点，再点击收藏！");
        return false;
      }
      var bookmarkDatatitle = $(".header-title .topic-link").text().trim();
      var bookmarkDatacate = $(
        ".categories-wrapper .badge-category__wrapper:nth-child(1) .badge-category__name"
      )
        .text()
        .trim();
      var bookmarkDatatags = $("#topic-title .discourse-tags .discourse-tag.box")
        .map(function () {
          return $(this).text().trim();
        })
        .get();
      var bookmarkDataurl =
        "https://linux.do" + $(".header-title .topic-link").attr("href");

      var newBookmark = {
        url: bookmarkDataurl,
        title: bookmarkDatatitle,
        cate: bookmarkDatacate,
        tags: bookmarkDatatags,
        timestamp: new Date().getTime(),
        sort: 999, // 默认排序值
      };

      const browserAPI = typeof browser !== "undefined" ? browser : chrome;

      // 获取当前书签列表
      browserAPI.storage.local.get(["bookmarks"], (result) => {
        let bookmarks = result.bookmarks || [];

        // 检查是否已经收藏过相同 URL 的内容
        const existingIndex = bookmarks.findIndex((item) => item.url === newBookmark.url);

        if (existingIndex !== -1) {
          // 如果已存在，更新收藏
          bookmarks[existingIndex] = newBookmark;
          this.messageToast(
            "已更新收藏" + (this.silentBookmark ? "" : "，请前往收藏夹查看。")
          );
        } else {
          // 新增收藏
          bookmarks.push(newBookmark);
          this.messageToast(
            "收藏成功" + (this.silentBookmark ? "" : "，请前往收藏夹查看。")
          );
        }

        // 保存更新后的书签列表
        browserAPI.storage.local.set({
          bookmarks: bookmarks,
          bookmarkData: newBookmark, // 保持向后兼容
        });
      });

      // 只有在非无感收藏模式下才跳转到收藏页面
      if (!this.silentBookmark) {
        // 发送消息到后台脚本
        browserAPI.runtime.sendMessage({ action: "open_bookmark_page" });
      }
    },
  },
  created() {
    // 获取无感收藏设置
    const silentBookmarkSetting = localStorage.getItem("linuxdoSilentBookmark");
    if (silentBookmarkSetting !== null) {
      this.silentBookmark = silentBookmarkSetting === "true";
    }

    if (this.modelValue) {
      this.bookmark();
    }
  },
  beforeUnmount() {
    // 清除定时器
    if (this.bookmarkIntervalId) {
      clearInterval(this.bookmarkIntervalId);
    }
  },
  // Vue 2 兼容性
  beforeDestroy() {
    // 清除定时器
    if (this.bookmarkIntervalId) {
      clearInterval(this.bookmarkIntervalId);
    }
  },
};
</script>

<style scoped>
.el-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  margin-top: 10px;
  font-size: 13px;
  font-weight: 500;
  color: #fff;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-medium) 100%);
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.2);
  overflow: hidden;
}

.el-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.el-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(var(--primary-rgb), 0.3);
}

.el-button:hover::before {
  opacity: 1;
}

.el-button:active {
  transform: scale(0.98);
  box-shadow: 0 2px 10px rgba(var(--primary-rgb), 0.2);
}

.el-button svg {
  margin: 0;
  position: relative;
  z-index: 1;
  transition: transform 0.2s ease;
}

.el-button:hover svg {
  transform: scale(1.1);
}
</style>
