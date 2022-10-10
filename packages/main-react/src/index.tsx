import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';

const root = ReactDOM.createRoot(
  document.querySelector('#main-react') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
