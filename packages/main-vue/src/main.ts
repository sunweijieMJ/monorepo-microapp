import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { i18n } from './plugin';

const app = createApp(App);

app.use(router).use(store).use(i18n).mount('#container');
