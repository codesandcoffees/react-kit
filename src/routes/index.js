import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import HomeLayout from './HomeLayout/HomeLayout';

import Counter from '../containers/Counter';
import About from '../containers/About';

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

export default () => (
  <HashRouter >
    <Switch>
      <AppRoute exact path="/" layout={HomeLayout} component={Counter} />
      <AppRoute exact path="/about" layout={HomeLayout} component={About} />
    </Switch>
  </HashRouter >
);

AppRoute.propTypes = {
  component: PropTypes.func.isRequired,
  layout: PropTypes.func.isRequired,
};
