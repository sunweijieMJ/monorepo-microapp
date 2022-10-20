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
