import { createApp } from 'vue';
import App from './App.vue';
import { i18n } from './plugin';
import router from './router';
import store from './store';

const app = createApp(App);

app.use(router).use(store).use(i18n).mount('#main-vue');
