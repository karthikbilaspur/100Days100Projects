import { createStore } from 'redux';
import gameReducer from './reducers/gameReducer';

const store = createStore(gameReducer);

export default store;