import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import '@/assets/sass/style.scss';
import 'remixicon/fonts/remixicon.css';

const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

createApp(App).use(pinia).use(router).mount('#app');
