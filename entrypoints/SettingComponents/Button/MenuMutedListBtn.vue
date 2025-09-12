<template>
  <div class="item">
    <div class="tit">{{ sort }}. 显示免打扰列表按钮</div>
    <input type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)" />
  </div>
</template>

<script>
export default {
  name: 'MenuMutedListBtn',
  props: ["modelValue", "sort"],
  emits: ["update:modelValue"],
};
</script>