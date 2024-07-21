import { takeEvery, put, delay } from 'redux-saga/effects';
import { addTodo, setError, clearError } from './todoSlice';

function* addTodoSaga(action) {
    if (action.payload.trim() === '') {
        yield put(setError('Todo text cannot be empty'));
        yield delay(3000);
        yield put(clearError());
    } else {
        yield put(addTodo(action.payload));
    }
}

export default function* rootSaga() {
    yield takeEvery('todos/addTodoRequest', addTodoSaga);
}