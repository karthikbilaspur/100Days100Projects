import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import orderReducer from './orderReducer';
import reviewReducer from './reviewReducer';

const rootReducer = combineReducers({
    menu: menuReducer,
    orders: orderReducer,
    reviews: reviewReducer,
});

export default rootReducer;