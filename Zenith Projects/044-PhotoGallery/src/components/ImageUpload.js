import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImageEditor from 'react-image-editor';

const ImageUpload = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [editedImage, setEditedImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      setError('Please select an image');
      return;
    }

    setUploading(true);
    try {
      await onImageUpload(image);
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="image-upload">
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
      {error ? <p>Error: {error}</p> : null}
    </div>
          
  );
};

return (
  <div>
    <input type="file" onChange={handleImageChange} />
    {image && (
      <ImageEditor
        image={image}
        onEditImage={handleEditImage}
      />
    )}
    {editedImage && (
      <button onClick={() => uploadImage(editedImage)}>
        Upload Edited Image
      </button>
    )}
  </div>
);
};


ImageUpload.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default ImageUpload;