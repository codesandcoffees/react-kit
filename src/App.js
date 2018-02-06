import React from 'react';
import { Provider } from 'react-redux';

import './App.scss';
import Routes from './routes';
import store from './store';

export default () => (
  <Provider store={store} >
    <Routes />
  </Provider>
);
