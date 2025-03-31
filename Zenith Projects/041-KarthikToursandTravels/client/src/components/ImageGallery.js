import React from 'react';
import ImageGallery from 'react-image-gallery';


const images = [
  {
    original: 'https://example.com/image1.jpg',
    thumbnail: 'https://example.com/thumbnail1.jpg',
    description: 'Image 1 caption',
  },
  {
    original: 'https://example.com/image2.jpg',
    thumbnail: 'https://example.com/thumbnail2.jpg',
    description: 'Image 2 caption',
  },
  // Add more images here
];


const ImageGalleryComponent = () => {
  return (
    <ImageGallery
      items={images}
      showNav={true}
      showThumbnails={true}
      showFullscreenButton={true}
      showPlayButton={true}
    />
  );
};


export default ImageGalleryComponent;