import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';
import { LoadingPlugin } from 'vue-loading-overlay';
createApp(App)
  .use(LoadingPlugin, {color: 'red'})
  .use(router)
  .mount('#app')
