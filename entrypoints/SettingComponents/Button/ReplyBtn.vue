<template>
  <div class="replaybtn">
    <div class="el-button reply-btn" @click="replaybtn" type="primary" title="回复">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-message-circle">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1z"/>
      </svg>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  methods: {
    replaybtn() {
      $('button[title="开始撰写此话题的回复"]')[0].click()
    },
  },
}
</script>

<style scoped>
.reply-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.reply-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow:
    0 8px 25px rgba(var(--primary-rgb, 79, 70, 229), 0.3),
    0 4px 8px rgba(var(--primary-rgb, 79, 70, 229), 0.15);
}

.reply-btn:hover::before {
  left: 100%;
}

.reply-btn:active {
  transform: translateY(-1px) scale(1.02);
  transition: all 0.1s;
}
</style>
