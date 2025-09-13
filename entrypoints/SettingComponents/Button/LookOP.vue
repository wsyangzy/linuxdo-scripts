<template>
  <div class="lookopbtn">
    <div class="el-button lookop-btn" :class="{ act: status }" @click="lookop" title="只看楼主">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-crown">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z"/>
      </svg>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      status: false,
    };
  },
  methods: {
    lookop() {
      this.status = !this.status;
      $(".post-stream").toggleClass("lookopwrapactive");
    },
  },
  created() {
    $("head").append(`<style>
.post-stream.lookopwrapactive .topic-post{display:none !important;}
.post-stream.lookopwrapactive .topic-post.topic-owner{display: block !important;}
    </style>`);
  },
};
</script>

<style lang="less" scoped>
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

/* 激活状态样式 */
.el-button.act {
  background: linear-gradient(135deg, var(--tertiary-low) 0%, var(--tertiary-high) 100%) !important;
}
</style>