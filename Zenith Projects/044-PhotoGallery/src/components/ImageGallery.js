import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const ImageGallery = ({ images }) => {
  return (
    <Carousel>
      {images.map((image) => (
        <div key={image.id}>
          <img src={image.url} alt={image.name} />
          <p>{image.name}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default ImageGallery;