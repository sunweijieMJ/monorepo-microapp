import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import './public-path';

// eslint-disable-next-line no-underscore-dangle
const POWERED_BY_QIANKUN = window.__POWERED_BY_QIANKUN__;
let root: ReactDOM.Root | null = null;

function render(container?: ShadowRoot) {
  if (container) {
    root = ReactDOM.createRoot(
      container.querySelector('#micro-react-root') as HTMLElement
    );
  } else {
    root = ReactDOM.createRoot(
      document.querySelector('#micro-react-root') as HTMLElement
    );
  }

  root.render(
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  );
}

export async function bootstrap() {
  console.log('react bootstrap');
}

export async function mount(props?: any) {
  console.log('react mount');
  render(props?.container);
}

export async function update(props?: any) {
  console.log('react update');
  render(props?.container);
}

export async function unmount() {
  console.log('react unmount');
  root?.unmount();
}

// 单独开发环境
if (!POWERED_BY_QIANKUN) mount();
