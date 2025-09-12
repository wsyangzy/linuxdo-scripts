<template>
  <div>
    <div class="el-button bookmark-folder-btn" @click="gobookmarkfolder" title="收藏夹">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-folder-heart">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M11 19h-5a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v2.5"/>
        <path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 .006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.284z"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 点击按钮，向后台发送打开收藏夹页面的请求
    gobookmarkfolder() {
      const browserAPI = typeof browser !== "undefined" ? browser : chrome;
      browserAPI.runtime.sendMessage({ action: "open_bookmark_page" });
    },
  },
};
</script>

<style scoped>
.bookmark-folder-btn {
  position: relative;
  overflow: hidden;
}

.bookmark-folder-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.bookmark-folder-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow:
    0 8px 25px rgba(var(--primary-rgb, 79, 70, 229), 0.3),
    0 4px 8px rgba(var(--primary-rgb, 79, 70, 229), 0.15);
}

.bookmark-folder-btn:hover::before {
  left: 100%;
}

.bookmark-folder-btn:active {
  transform: translateY(-1px) scale(1.02);
  transition: all 0.1s;
}
</style>
