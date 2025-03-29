const initialState = {
    reviews: [],
};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_REVIEWS':
            return { ...state, reviews: action.payload };
        default:
            return state;
    }
};

export default reviewReducer;