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