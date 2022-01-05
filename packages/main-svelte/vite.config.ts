import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import path from 'path';

const port = 3000;
const timeStamp = Date.now();

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }): unknown => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [
      svelte({
        preprocess: sveltePreprocess({
          scss: {
            prependData: '@use "src/assets/scss/_base.scss" as *;',
          },
        }),
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "src/assets/scss/_base.scss" as *;',
        },
      },
    },
    server: {
      host: 'localhost',
      port,
      strictPort: true,
      https: false,
      proxy: {
        '^/(userDomain|masterdataDomain|taskDomain)': {
          target: 'http://dev.backendapi.aid.connext.net.cn/', // 开发
          // target: 'http://test.backendapi.aid.connext.net.cn/' // 测试
        },
      },
    },
    build: {
      assetsDir: 'static/assets',
      rollupOptions: {
        output: {
          entryFileNames: `static/js/[name].${process.env.VITE_Version}.t${timeStamp}.js`,
          chunkFileNames: `static/js/[name].${process.env.VITE_Version}.t${timeStamp}.js`,
          assetFileNames: `static/js/[name].${process.env.VITE_Version}.t${timeStamp}.[ext]`,
        },
      },
    },
  });
};
