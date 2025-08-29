<template>
  <div class="item">
    <div class="tit">{{ sort }}. 是否自动加载新话题</div>
    <input type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)" />
  </div>
</template>

<script>
import $ from "jquery";
export default {
  props: ["modelValue", "sort"],
  emits: ["update:modelValue"],
  data() {
    return {
      autoExpandIntervalId: null // 添加变量存储定时器 ID
    };
  },
  methods: {
    init() {
      $('#list-area .show-more .alert')[0].click();
    },
  },
  created() {
    if (this.modelValue) {
      this.autoExpandIntervalId = setInterval(() => {
        if ($('#list-area .show-more .alert').length) {
          this.init();
        }
      }, 1000);
    }
  },
  beforeUnmount() {
    // 清除定时器
    if (this.autoExpandIntervalId) {
      clearInterval(this.autoExpandIntervalId);
    }
  },
  // Vue 2 兼容性
  beforeDestroy() {
    // 清除定时器
    if (this.autoExpandIntervalId) {
      clearInterval(this.autoExpandIntervalId);
    }
  }
};
</script>
