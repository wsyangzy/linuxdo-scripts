<template>
  <div class="backtotop">
    <div
      class="el-button backtotop-btn"
      style="font-size: 18px"
      @click="scrollToTop"
      type="primary"
      title="返回顶部"
    >
    <svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-up-dashed"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5v6m0 3v1.5m0 3v.5" /><path d="M18 11l-6 -6" /><path d="M6 11l6 -6" /></svg>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped>
.backtotop-btn {
  position: relative;
  overflow: hidden;
}

.backtotop-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.backtotop-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow:
    0 8px 25px rgba(var(--primary-rgb, 79, 70, 229), 0.3),
    0 4px 8px rgba(var(--primary-rgb, 79, 70, 229), 0.15);
}

.backtotop-btn:hover::before {
  left: 100%;
}

.backtotop-btn:active {
  transform: translateY(-1px) scale(1.02);
  transition: all 0.1s;
}
</style>
