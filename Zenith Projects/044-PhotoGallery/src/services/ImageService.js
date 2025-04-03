import axios from 'axios';

const API_URL = '/api/images';

const ImageService = {
  getImages: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch images: ${error.message}`);
    }
  },

  uploadImage: async (image) => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      const response = await axios.post(API_URL, formData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  },
};

export default ImageService;