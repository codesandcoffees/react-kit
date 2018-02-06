import React from 'react';
import PropTypes from 'prop-types';

import './homeLayout.css';

import Navbar from '../../components/Navbar';

class HomeLayout extends React.Component {
  render() {
    return (
      <div className="homeLayout">
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

HomeLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default HomeLayout;
