<template>
  <div>
    <div class="el-button" @click="gobookmarkfolder" title="收藏夹">收藏夹</div>
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
