import classnames from 'classnames';
import _ from 'lodash';
import { loadMicroApp } from 'qiankun';
import type { MicroApp } from 'qiankun';
import React, { useEffect } from 'react';
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
