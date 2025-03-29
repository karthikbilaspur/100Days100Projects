import axios from 'axios';

export const getReviews = () => async (dispatch) => {
    try {
        const response = await axios.get('/api/reviews');
        dispatch({ type: 'GET_REVIEWS', payload: response.data });
    } catch (error) {
        console.error(error);
    }
};