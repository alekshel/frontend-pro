import { combineReducers } from 'redux';
import todoReducer from '../features/todo/todoSlice';
import swapiReducer from '../features/swapi/swapiSlice';

const rootReducer = combineReducers({
    todo: todoReducer,
    swapi: swapiReducer,
});

export default rootReducer;