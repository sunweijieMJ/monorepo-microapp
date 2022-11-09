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
import React, { useEffect } from 'react';
import type { MenuList } from '../../config/menuList';
import menuList from '../../config/menuList';
import microApps from '../../config/microApps';
import LayoutAside from '../LayoutAside';
import LayoutHeader from '../LayoutHeader';
import LayoutNav from '../LayoutNav';
import './index.scss';

const microAppList = microApps;
// 当前激活应用名称
let activeMicroAppName = '';
// 子应用上限
const microAppLimit = 10;

// 获取当前激活的子应用
const getActiveMicroApp = (
  defaultPath = `/${window.location.pathname.split('/')[1]}`
) => {
  const activeMicroApp = _.find(microAppList, (item) =>
    Array.isArray(item.activeRule)
      ? item.activeRule.includes(defaultPath)
      : item.activeRule === defaultPath
  );

  return activeMicroApp;
};

// 手动加载子应用
const manualLoadMicroApps = (defaultPath?: string, singular = false) => {
  const microApp = getActiveMicroApp(defaultPath);
  if (window.activeMicroApp?.name === microApp?.name || !microApp) return;

  // 单实例模式
  if (singular) {
    // 卸载前一个子应用
    if (window.activeMicroApp?.getStatus() === 'MOUNTED') {
      window.activeMicroApp.unmount();
      window.activeMicroApp = null;
      window.activatedMicroApp = [];
      activeMicroAppName = '';
    }

    // 加载新的子应用
    const newMicroApp = {
      name: microApp.name,
      ...loadMicroApp(microApp, { singular: true }),
    };
    newMicroApp.mountPromise.then(() => {
      activeMicroAppName = microApp.name;
    });

    window.activeMicroApp = newMicroApp;
    window.activatedMicroApp = [window.activeMicroApp];
  } else {
    const activeMicroApp = _.find(
      window.activatedMicroApp,
      (item) => item.name === microApp.name
    );

    // 判断当前子应用是否加载过
    if (activeMicroApp) {
      window.activeMicroApp = activeMicroApp;
      activeMicroApp.mountPromise.then(() => {
        activeMicroAppName = microApp.name;
      });
    } else {
      const newMicroApp = {
        name: microApp.name,
        ...loadMicroApp(microApp),
      };
      newMicroApp.mountPromise.then(() => {
        activeMicroAppName = microApp.name;
      });

      window.activeMicroApp = newMicroApp;
      window.activatedMicroApp.push(window.activeMicroApp);
      // 超出数量限制，卸载第一个
      if (window.activatedMicroApp.length > microAppLimit) {
        window.activatedMicroApp.shift()?.unmount();
      }
    }
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
    // 设置默认子应用
    let defaultPath = '';
    let pathname = window.location.pathname;

    if (pathname.split('/')[1]) {
      defaultPath = `/${pathname.split('/')[1]}`;
    }
    if (!defaultPath && menuList.length) defaultPath = menuList[0].routePath;

    // 重置子应用数组
    if (!window.activatedMicroApp?.length) window.activatedMicroApp = [];

    manualLoadMicroApps(defaultPath);
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
              'active-app': activeMicroAppName === item.name,
            })}
          ></div>
        );
      })}
    </div>
  );
};

export default Layout;
