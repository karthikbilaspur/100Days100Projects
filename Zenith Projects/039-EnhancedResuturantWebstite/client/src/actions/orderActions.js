import axios from 'axios';

export const getOrders = () => async (dispatch) => {
    try {
        const response = await axios.get('/api/orders');
        dispatch({ type: 'GET_ORDERS', payload: response.data });
    } catch (error) {
        console.error(error);
    }
};