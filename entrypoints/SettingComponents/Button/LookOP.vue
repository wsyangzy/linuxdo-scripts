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
.lookop-btn {
  position: relative;
  overflow: hidden;
}

.lookop-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.lookop-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow:
    0 8px 25px rgba(var(--primary-rgb, 79, 70, 229), 0.3),
    0 4px 8px rgba(var(--primary-rgb, 79, 70, 229), 0.15);
}

.lookop-btn:hover::before {
  left: 100%;
}

.lookop-btn:active {
  transform: translateY(-1px) scale(1.02);
  transition: all 0.1s;
}

.lookop-btn.act {
  background: linear-gradient(to right,
      var(--tertiary-low),
      var(--tertiary-high)) !important;
}
</style>