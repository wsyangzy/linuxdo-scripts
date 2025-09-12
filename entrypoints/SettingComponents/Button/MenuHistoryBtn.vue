<template>
  <div class="item" :sort="sort">
    <div class="tit">
      <span>{{ sort }}. 浏览历史记录</span>
      <div class="label">{{ labelText }}</div>
    </div>
    <input 
      type="checkbox" 
      :checked="modelValue" 
      @change="handleToggle"
    />
  </div>
</template>

<script>
export default {
  name: 'MenuHistoryBtn',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    sort: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:modelValue'],
  computed: {
    labelText() {
      return this.modelValue ? '在右下角显示浏览历史按钮' : '显示浏览历史按钮'
    }
  },
  methods: {
    handleToggle(event) {
      this.$emit('update:modelValue', event.target.checked)
    }
  }
}
</script>

<style scoped>
.label {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
  line-height: 1.3;
}
</style>