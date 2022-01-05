import App from './App.svelte';

// 扩展window类型
declare global {
  interface Window {
    env: {
      VITE_BASEURL: string;
      VITE_WEBURL: string;
      VITE_MICROAPPS: string[];
    };
  }
}

const app = new App({
  target: document.querySelector('#main-root'),
});

export default app;
