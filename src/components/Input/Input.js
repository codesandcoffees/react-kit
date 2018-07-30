import React from 'react';
import PropTypes from 'prop-types';

class InputComponent extends React.Component {
  render() {
    const {
      type, value, onChange, min,
    } = this.props;
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        min={min}
      />
    );
  }
}

InputComponent.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputComponent;
