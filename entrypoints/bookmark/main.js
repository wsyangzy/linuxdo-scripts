import { createApp } from 'vue';
import App from './App.vue';

import ArcoVue from '@arco-design/web-vue';
import { Message } from '@arco-design/web-vue';
import '@arco-themes/vue-indigo-sky/css/arco.css'; // 自定义主题 vue-indigo-sky

import './style.less';

const app = createApp(App);

// 配置 Arco Design
app.use(ArcoVue);

// 配置全局属性，让组件可以访问 $message
app.config.globalProperties.$message = Message;

app.mount('#app');
