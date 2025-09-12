<template>
  <div class="el-button" @click="openMutedList" title="免打扰列表">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bell-off">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M9.346 5.353c.21 -.129 .428 -.246 .654 -.353a2 2 0 1 1 4 0c2.4 1.195 4 3.562 4 6.31c0 .603 .033 1.204 .102 1.8"/>
      <path d="M17 17h-13a4 4 0 0 0 2 -3.8c0 -1.018 .062 -2.108 .145 -3.22"/>
      <path d="M9 17v1a3 3 0 0 0 6 0v-1"/>
      <path d="M3 3l18 18"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'MutedListBtn',
  methods: {
    openMutedList() {
      // 在新窗口打开免打扰列表页面
      window.open('/latest?state=muted', '_blank');
    },
    
    // 提示组件
    messageToast(message) {
      const messageElement = document.createElement("div");
      messageElement.className = "messageToast-text";
      messageElement.innerText = message;
      
      const toastContainer = document.getElementById("messageToast");
      if (toastContainer) {
        toastContainer.appendChild(messageElement);
        setTimeout(() => {
          if (messageElement.parentNode) {
            messageElement.remove();
          }
        }, 3000);
      }
    }
  }
};
</script>

<style scoped>
/* 移除自定义样式，使用全局 .el-button 样式以保持一致性 */
</style>