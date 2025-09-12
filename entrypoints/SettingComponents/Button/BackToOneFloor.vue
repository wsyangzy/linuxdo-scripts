<template>
  <div class="backtotop">
    <div class="el-button backtoone-btn" @click="scrollToOne" type="primary" title="直达一楼">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-number-1">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M13 20v-16l-5 5"/>
      </svg>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  methods: {
    scrollToOne() {
      if ($("h1.header-title a").length > 0) {
        const regex = /^(https:\/\/linux\.do\/t\/topic\/\d+)(\/\d+)?(\?.*)?$/;
        const match = window.location.href.match(regex)[1];
        console.log("Redirecting to:", match);
        window.location.href = match;
      }
    },
  },
};
</script>

<style scoped>
.backtoone-btn {
  position: relative;
  overflow: hidden;
}

.backtoone-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.backtoone-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow:
    0 8px 25px rgba(var(--primary-rgb, 79, 70, 229), 0.3),
    0 4px 8px rgba(var(--primary-rgb, 79, 70, 229), 0.15);
}

.backtoone-btn:hover::before {
  left: 100%;
}

.backtoone-btn:active {
  transform: translateY(-1px) scale(1.02);
  transition: all 0.1s;
}
</style>
