import React from 'react';
import { Provider } from 'react-redux';

import Routes from './routes';
import store from './store';
import './App.css';

export default () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);
