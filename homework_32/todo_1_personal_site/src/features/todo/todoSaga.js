import { call, put, takeLatest } from 'redux-saga/effects';
import { addTodo, toggleTodo } from './todoSlice';

// Імітація асинхронного збереження TODO в базу даних
function* saveTodoToDatabase(action) {
    try {
        // Тут би був реальний API-запит до бекенду
        yield call(() => new Promise(resolve => setTimeout(resolve, 500)));

        // Якщо збереження пройшло успішно, диспатчимо дію для оновлення стану
        yield put(addTodo(action.payload));
    } catch (error) {
        console.error('Помилка при збереженні TODO:', error);
        // Тут можна диспатчити дію для обробки помилки, якщо потрібно
    }
}

// Імітація асинхронного оновлення статусу TODO в базі даних
function* updateTodoStatusInDatabase(action) {
    try {
        // Тут би був реальний API-запит до бекенду
        yield call(() => new Promise(resolve => setTimeout(resolve, 500)));

        // Якщо оновлення пройшло успішно, диспатчимо дію для оновлення стану
        yield put(toggleTodo(action.payload));
    } catch (error) {
        console.error('Помилка при оновленні статусу TODO:', error);
        // Тут можна диспатчити дію для обробки помилки, якщо потрібно
    }
}

export function* watchAddTodo() {
    yield takeLatest('todo/addTodoAsync', saveTodoToDatabase);
}

export function* watchToggleTodo() {
    yield takeLatest('todo/toggleTodoAsync', updateTodoStatusInDatabase);
}