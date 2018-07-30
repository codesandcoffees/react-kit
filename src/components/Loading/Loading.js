import React from 'react';
import PropTypes from 'prop-types';

const LoadingComponent = (props) => {
  const { isLoading, error, timedOut } = props;
  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  } if (error) {
    return (
      <div>
        Something went wrong...
      </div>
    );
  } if (timedOut) {
    return (
      <div>
        Request timed out...
        {' '}
      </div>
    );
  }
  return null;
};

LoadingComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  timedOut: PropTypes.bool.isRequired,
};

LoadingComponent.defaultProps = {
  error: null,
};

export default LoadingComponent;
