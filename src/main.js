import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';
import { LoadingPlugin } from 'vue-loading-overlay';
import Notifications from '@kyvg/vue3-notification'
import Vue3ConfirmDialog from 'vue3-confirm-dialog';
import 'vue3-confirm-dialog/style';

createApp(App)
  .use(LoadingPlugin, {color: 'red'})
  .use(Notifications)
  .use(Vue3ConfirmDialog)
  .use(router)
  
  .mount('#app')
