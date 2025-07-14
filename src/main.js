import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';
import { LoadingPlugin } from 'vue-loading-overlay';
import Notifications from '@kyvg/vue3-notification'

createApp(App)
  .use(LoadingPlugin, {color: 'red'})
  .use(Notifications)
  .use(router)
  .mount('#app')
