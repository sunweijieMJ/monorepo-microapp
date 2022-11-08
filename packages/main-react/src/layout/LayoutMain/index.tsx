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
