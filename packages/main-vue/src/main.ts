import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { i18n } from './plugin';
// import store from './store';

const app = createApp(App);

app.use(router).use(i18n).mount('#container');
