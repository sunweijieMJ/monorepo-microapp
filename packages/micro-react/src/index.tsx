import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import './public-path';

declare global {
  interface Window {
    __POWERED_BY_QIANKUN__: boolean;
    __INJECTED_PUBLIC_PATH_BY_QIANKUN__: string;
  }
}

const POWERED_BY_QIANKUN = window.__POWERED_BY_QIANKUN__;

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <Router />
    </React.StrictMode>,
    document.querySelector('#react-root')
  );
}

export async function bootstrap() {
  console.log('bootstrap');
}

export async function mount() {
  render();
}

export async function unmount() {
  ReactDOM.unmountComponentAtNode(
    document.querySelector('#react-root') as Element
  );
}

// 单独开发环境
if (!POWERED_BY_QIANKUN) mount();
