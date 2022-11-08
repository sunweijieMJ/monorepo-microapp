# monorepo microapp

> 使用 `monorepo`, `qiankun`, `typescript` 等技术搭建的一个微前端模版工程

## 使用文档

- [目录结构](#目录结构)
- [开发环境](#开发环境)
- [常用脚本](#常用脚本)

## 目录结构

```md
├── .husky
├── .vscode
|
├──── packages 源码目录
| ├── main-react
| ├── main-vue
| ├── micro-react
| ├── micro-vue
|
├──── scripts shell 脚本
├──── typings 类型文件
|
|-- .browserslistrc
|-- .cz-config.js
|-- .editorconfig
|-- .eslintignore
|-- .eslintrc.js
|-- .gitignore
|-- .markdownlint.json
|-- .npmrc
|-- .prettierignore
|-- .prettierrc.js
|-- .stylelintignore
|-- .stylelint.js
|-- CHANGELOG.md
|-- commitlint.config.js
|-- cspell.config.js
|-- package.json
|-- pnpm-lock.yaml
|-- pnpm-workspace.yaml
|-- README.md
|-- tsconfig.json
```

## 开发环境

<p align="left">
    <a href="https://npmjs.com/package/node"><img src="https://img.shields.io/badge/node-%3E%3D16.18.0-green" alt="node"></a>
    <a href="https://npmjs.com/package/pnpm"><img src="https://img.shields.io/badge/pnpm-%3E%3D7.5.0-blue" alt="pnpm"></a>
</p>

> 该项目基于 `monorepo` 的架构，`pnpm` 安装依赖，`typescript` 编写代码。

- 使用 `eslint`， `stylelint` 校验代码，`prettier` 格式化代码。需要安装相关的 `vscode` 插件

- 全局安装 `pnpm`

  ```bash
  npm i pnpm -g
  ```

### 微前端待解决的问题

- [x] 微前端主应用与子应用如何构建
- [x] 主应用资源下发给子应用
- [x] 各应用间动态通信，实时监听，同步数据
- [x] 微前端线上部署

## 微前端主应用与子应用如何构建

### 构建主应用

```tsx
import {
  loadMicroApp, // 手动加载一个微应用
} from 'qiankun';
import React, { useEffect } from 'react';
import microApps from '../../config/microApps';
import LayoutAside from '../LayoutAside';
import LayoutHeader from '../LayoutHeader';
import LayoutNav from '../LayoutNav';
import './index.scss';

// loadMicroApp的实例对象
let activeApp: any = null;
let activeName = window.location.pathname.split('/')[1];
const microAppList = microApps;

// 手动加载子应用
const manualLoadMicroApps = (name: string) => {
  const microApp = microAppList.find((item) => item.name === name);

  if (microApp) {
    activeName = name;
    // 切换微应用时，先卸载前一个微应用
    if (activeApp?.getStatus() === 'MOUNTED') {
      // 卸载前一个应用
      activeApp.unmount();
      // 卸载完前一个应用后紧接着加载新的应用，这里用qiankun的loadMicroApp来加载微应用，返回一个实例，可以通过实例上的unmount方法卸载自身。
      activeApp = loadMicroApp(microApp);
      return;
    }

    // 如果微应用是初次加载，那么不用先卸载之前挂载的应用直接加载
    activeApp = loadMicroApp(microApp);
  }
};

const Layout: React.FC = () => {
  useEffect(() => {
    manualLoadMicroApps(window.location.pathname.split('/')[1]);
    // microAppList.forEach((item) => loadMicroApp(item));
  }, []);

  return (
    <div className="layout">
      <LayoutHeader></LayoutHeader>
      <LayoutAside></LayoutAside>
      <LayoutNav></LayoutNav>
      {microAppList.map((item, index) => {
        return (
          <div
            id={item.name}
            key={index}
            className={[
              'micro-app',
              activeName === item.name ? 'active-app' : '',
            ].join(' ')}
          ></div>
        );
      })}
    </div>
  );
};

export default Layout;
```

> 在 `LayoutMain/index.tsx` 中，增加一个渲染子应用的容器

```typescript
const Layout: React.FC = () => {
  useEffect(() => {
    manualLoadMicroApps(window.location.pathname.split('/')[1]);
  }, []);

  return (
    <div className="layout">
      <LayoutHeader></LayoutHeader>
      <LayoutAside></LayoutAside>
      <LayoutNav></LayoutNav>
      {microAppList.map((item, index) => {
        return (
          <div
            id={item.name}
            key={index}
            className={[
              'micro-app',
              activeName === item.name ? 'active-app' : '',
            ].join(' ')}
          ></div>
        );
      })}
    </div>
  );
};
```

> 主应用的 `vue.config.js`

```javascript
const port = 7000;
module.exports = {
  // publicPath: process.env.VUE_APP_ROOT_PATH || '/',
  devServer: {
    hot: true,
    port,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
```

**注意** 主应用设置 `publicPath: '/'` 会造成子应用配置的 `publicPath` 失效，导致无限循环刷新页面。

### 构建子应用

> 构建一个 `react` 子应用工程

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import './public-path';

// eslint-disable-next-line no-underscore-dangle
const POWERED_BY_QIANKUN = window.__POWERED_BY_QIANKUN__;

const root = ReactDOM.createRoot(
  document.querySelector('#micro-react-root') as HTMLElement
);

function render() {
  root.render(
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  );
}

export async function bootstrap() {
  console.log('react bootstrap');
}

export async function mount() {
  console.log('react mount');
  render();
}

export async function update() {
  console.log('react update');
  render();
}

export async function unmount() {
  console.log('react unmount');
  root.unmount();
}

// 单独开发环境
if (!POWERED_BY_QIANKUN) mount();
```

> 构建一个 `vue` 子应用工程

```typescript
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import routes from './router';

let router: any = null;
let instance: any = null;
// eslint-disable-next-line no-underscore-dangle
const POWERED_BY_QIANKUN = window.__POWERED_BY_QIANKUN__;

// render
function render() {
  router = createRouter({
    history: createWebHistory('/'),
    routes,
  });

  instance = createApp(App).use(router).mount('#micro-vue-root');
}

export async function bootstrap() {
  console.log('vue bootstrap');
}

export async function mount() {
  console.log('vue mount');
  render();
}

export async function update() {
  console.log('vue update');
  render();
}

export async function unmount() {
  console.log('vue unmount');
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}

// 单独开发环境
if (!POWERED_BY_QIANKUN) mount();
```

> 子应用的 `craco.config.js`

```javascript
const { name } = require('./package.json');

const port = 3002;
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      if (!isDev) {
        webpackConfig.output = {
          ...webpackConfig.output,
          // 微前端打包配置
          library: `${name}-[name]`,
          libraryTarget: `umd`,
        };
      }

      return webpackConfig;
    },
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
```

> `src/config/window/vue.ts`, 引入`window`上的`vue`并导出

```javascript
const vue = window.vue;

export default vue;
```

## 主应用资源下发给子应用

实际项目中，父子应用之间会公用一些方法，组件。可以把公共的方法和组件放在主应用中，下发到子应用以供使用

> 主应用的 `main.js`

```javascript
import CustomComponent from '@/components/custom';
import storage from '@/utils/storage';
import filters from '@/utils/filters';
import * as directives from '@/utils/directives';

// 定义传入子应用的数据
const msg = {
  storage,
  filters,
  directives,
  CustomComponent,
};

// 注册子应用
registerMicroApps([
  {
    name: 'qiankun-test1',
    entry: '//localhost:7001',
    container: '#micro-app',
    activeRule: genActiveRule('/test1'),
    props: msg,
  },
]);
```

> 子应用的 `main.js` 接受 `props`

```javascript
export async function bootstrap({ storage, filters, directives, CustomComponent }) {
    // 子应用全局挂载storage
    Vue.prototype.$storage = storage;
    // 注册全局过滤器
    for (const key in filters) {
        Vue.filter(key, (...args: Array<unknown>) => {
            return filters[key](...args);
        });
    }
    // 挂载全局指令
    Object.keys(directives).forEach(key => {
        Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key]);
    });
    // 注册主应用下发的组件
    Vue.use(CustomComponent);
}
```

## 各应用间动态通信, 实时监听, 同步数据

> `qiankun` 官方也提供了 `api` 去解决这个问题，不过使用起来不是很方便，我使用的是 `rxjs` 去解决应用间通信的需求

1. 主应用中安装并引入 `rxjs`，并实例化

```javascript
import { Subject } from 'rxjs';
const pager = new Subject();

// 在主应用注册呼机监听器，监听来自其他应用的广播
pager.subscribe((v) => {
  console.log(v);
});

export default pager;
```

2. 然后在主应用 `main.js` 中引入呼机，将呼机下发给子应用

```javascript
import pager from '@/util/pager';

// 注册子应用
registerMicroApps([
  {
    name: 'qiankun-test1',
    entry: '//localhost:7001',
    container: '#micro-app',
    activeRule: genActiveRule('/test1'),
    props: { pager }, // 将pager传递给子应用
  },
]);
```

3. 在子应用中注册呼机

```javascript
export async function bootstrap({ pager }) {
  // 子应用注册呼机, 监听其他应用的广播
  pager.subscribe((v) => {
    console.log(v);
  });
  // 将呼机挂载在vue实例
  Vue.prototype.$pager = pager;
}
```

4. 在各应用中使用呼机动态传递信息

```javascript
// 在某个应用里调用.next方法呼叫其他应用
this.$pager.next({
  from: 'qiankun-test1',
  data: 'test1 呼叫其他菜鸡',
});
```

## 微前端线上部署

> 以上做了这么多，能够部署到服务器上才算成功。我这里用的是 `nginx`

```yml
server {
listen          3000;
server_name     localhost;
root            /Users/sunweijie/monorepo-microapp/packages/main-react/dist/;

location / {
add_header Access-Control-Allow-Origin *;
add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

index index.html index.htm;

try_files $uri $uri/ /index.html;
}
}

server {
listen          3001;
server_name     localhost;
root            /Users/sunweijie/monorepo-microapp/packages/micro-vue/dist/;

location / {
try_files $uri $uri/ /index.html;
}
}

server {
listen          3002;
server_name     localhost;
root            /Users/sunweijie/monorepo-microapp/packages/micro-react/dist/;

location / {
try_files $uri $uri/ /index.html;
}
}
```

## 常用脚本

- 安装依赖

  ```bash
  pnpm i
  ```

- 启动应用

  ```bash
  pnpm start
  ```

- 格式化代码

  ```bash
  pnpm format
  ```

- `lint` 校验代码

  ```bash
  pnpm lint
  ```

- 生成 `CHANGELOG.md`

  ```bash
  pnpm changelog
  ```

- `commit` 代码

  ```bash
  git cz
  # 或者
  pnpm cz
  ```
