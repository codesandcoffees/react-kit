import React from 'react';
import PropTypes from 'prop-types';

import './button.css';

class ButtonComponent extends React.Component {
  render() {
    return (
      <button className="btn--custom" onClick={this.props.onClick}>{this.props.label}</button>
    );
  }
}

ButtonComponent.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonComponent;
