import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ image }) => {
  return (
    <div className="image">
      <img src={image.url} alt={image.name} />
      <p>{image.name}</p>
    </div>
  );
};

Image.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Image;