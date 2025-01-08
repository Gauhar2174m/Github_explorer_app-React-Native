import {createStore} from 'redux';
import rootReducer from './reducer';

// Create Redux store using the favorites reducer 
const store =createStore(rootReducer)

export default store;