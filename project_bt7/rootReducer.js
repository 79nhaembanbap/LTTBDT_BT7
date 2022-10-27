import { createStore, combineReducers } from 'redux';
import countReducer from './redux/reducer/countReducer';

const rootReducer = combineReducers({


    count: countReducer,
});
export const store = createStore(rootReducer);