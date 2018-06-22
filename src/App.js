import React from 'react';
import { Provider } from 'react-redux';
import { injectGlobal } from 'styled-components';

import Routes from './routes';
import store from './store';

export default () => (
  <Provider store={store} >
    <Routes />
  </Provider>
);

// Global style
// eslint-disable-next-line
injectGlobal`
  body {
    font-size: 16px;
  }
`;


// this is a test
// try conflict
// this is another test
// lain napud na conflict
