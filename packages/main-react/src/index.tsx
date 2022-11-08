import React from 'react';
import ReactDOM from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import Locale from './plugins/locale';
import configureStore from './plugins/redux';
import Router from './router';
import './index.scss';

const store = configureStore();

const root = ReactDOM.createRoot(
  document.querySelector('#main-react') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider
        locale={Locale.locale}
        messages={Locale.messages[Locale.locale]}
      >
        <Router />
      </IntlProvider>
    </Provider>
  </React.StrictMode>
);
