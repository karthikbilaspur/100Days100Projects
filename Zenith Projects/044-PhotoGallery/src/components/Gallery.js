import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from './Image';
import ImageUpload from './ImageUpload';
import ImageService from '../services/ImageService';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const images = await ImageService.getImages();
        setImages(images);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const handleImageUpload = async (image) => {
    setLoading(true);
    try {
      const uploadedImage = await ImageService.uploadImage(image);
      setImages((prevImages) => [...prevImages, uploadedImage]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredImages = images.filter((image) => {
    return image.name.toLowerCase().includes(searchQuery.toLowerCase());
  });


  return (
    <div className="gallery">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        images.map((image) => (
          <Image key={image.id} image={image} />
        ))
      )}
      <ImageUpload onImageUpload={handleImageUpload} />
    </div>
  );
};


return (
  <div>
    <input type="search" value={searchQuery} onChange={handleSearch} />
    {filteredImages.map((image) => (
      <Image key={image.id} image={image} />
    ))}
  </div>
);
}
Gallery.propTypes = {};

export default Gallery;