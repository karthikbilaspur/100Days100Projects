const initialState = {
    orders: [],
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ORDERS':
            return { ...state, orders: action.payload };
        default:
            return state;
    }
};

export default orderReducer;