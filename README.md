# Monorepo Microapp

> 基于 `monorepo` 架构搭建的一个微前端模版工程

## 使用文档

- [目录结构](#目录结构)
- [开发环境](#开发环境)
- [微前端要点](#微前端要点)
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

- 使用 `eslint`， `stylelint` 校验代码，`prettier` 格式化代码，`i18n Ally` 翻译多语言。需要安装相关的 `vscode` 插件

  1. [`eslint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  2. [`stylelint`](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
  3. [`prettier`](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  4. [`i18n Ally`](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally)

- 全局安装 `pnpm`

  ```bash
  npm i pnpm -g
  ```

## 微前端要点

- [x] 构建主应用
- [x] 构建子应用
- [x] 应用间通信
- [x] 资源共享
- [x] 内存溢出
- [x] 打包部署

### 构建主应用

- 需要一个渲染子应用的 `div` 容器
- 初始化的时候手动加载子应用

```tsx
import classnames from 'classnames';
import _ from 'lodash';
import {
  addGlobalUncaughtErrorHandler, // 添加全局未捕获异常处理器
  loadMicroApp, // 手动加载一个微应用
  prefetchApps, // 预加载子应用
  registerMicroApps, // 注册子应用方法
  runAfterFirstMounted, // 第一个微应用 mount
  setDefaultMountApp, // 设默认启用的子应用
  start,
} from 'qiankun';
import type { MicroApp } from 'qiankun';
import React, { useEffect } from 'react';
import type { MenuList } from '../../config/menuList';
import microApps from '../../config/microApps';
import LayoutAside from '../LayoutAside';
import LayoutHeader from '../LayoutHeader';
import LayoutNav from '../LayoutNav';
import './index.scss';

let activeApp: MicroApp | null = null;
let activeName = window.location.pathname.split('/')[1];
const microAppList = microApps;

// 手动加载子应用
const manualLoadMicroApps = (name: string) => {
  const microApp = _.find(microAppList, (item) => item.name === name);

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

// 自动加载子应用
const autoLoadMicroApps = (menuList: MenuList[]) => {
  let defaultPath = menuList[0].routePath;

  // 预加载子应用
  prefetchApps(microAppList);

  // 注册子应用
  registerMicroApps(microAppList);

  // 设置默认子应用
  const activePath = window.location.pathname.split('/')[1];
  if (activePath) {
    defaultPath = `/${activePath}`;
  }
  setDefaultMountApp(defaultPath);

  // 启动微服务
  start({
    prefetch: true,
  });

  // 第一个微应用 mount 后需要调用的方法
  runAfterFirstMounted(() => console.log('runAfterFirstMounted'));

  // 设置全局未捕获异常处理器
  addGlobalUncaughtErrorHandler((event) => console.log(event));
};

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
            className={classnames('micro-app', {
              'active-app': activeName === item.name,
            })}
          ></div>
        );
      })}
    </div>
  );
};

export default Layout;
```

**注意** 主应用设置 `publicPath: '/'` 会造成子应用配置的 `publicPath` 失效，导致无限循环刷新页面。

### 构建子应用

- 使用 `create-react-app` 构建一个 `react` 子应用工程
- 改造 `index.tsx` 入口文件

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
    https: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
```

### 应用间通信

> `qiankun` 官方提供了 `api` 去解决这个问题。这里只做基本演示，也可以用其他中间件去处理应用通信的问题。例如 `rxjs`，`vuex`，`redux`

- 主应用

```javascript
import { initGlobalState, MicroAppStateActions } from 'qiankun';

// 初始化 state
const actions: MicroAppStateActions = initGlobalState(state);

actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log(state, prev);
});
actions.setGlobalState(state);
actions.offGlobalStateChange();
```

- 子应用

```javascript
// 从生命周期 mount 中获取通信方法，使用方式和 master 一致
export function mount(props) {
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  });

  props.setGlobalState(state);
}
```

### 资源共享

1.共享模块

- 该项目采用的是 `monorepo` 架构来共享依赖
- 也可采用 `npm` `Webpack Externals` `Webpack DLL` 等方式来共享模块

2.共享资源

- `props` 传递
- `window` 传递

### 内存溢出

> `qiankun` 会将微应用的 `JS/CSS` 内容都记录在全局变量中，如果一直重复的挂载应用没有卸载，会导致内存占用过多，导致页面卡顿

- 微应用卸载的时候清空微应用注册的附加内容及 `DOM` 元素
- 设置自动销毁时间，去销毁那些长时间挂载的应用
- 设置最大运行应用数量，超过规定的数量的时候吧第一个应用销毁

### 打包部署

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
  ```
