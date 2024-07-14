import {put, call} from 'redux-saga/effects';
import axios from 'axios';
import todoSlice from "../redux/slice.js";

const defaultUrl = 'https://dummyjson.com/todos';
const defaultUserId = 13;

function* callGetTasks() {
    yield put(todoSlice.actions.setLoader(true))
    const res = yield call(axios.get, `${defaultUrl}?limit=5`);
    if (res.status === 200) {
        yield put(todoSlice.actions.setData(res.data.todos))
    }
    yield put(todoSlice.actions.setLoader(false))
}

function* callAddTask(action) {
    yield put(todoSlice.actions.setLoader(true))
    const res = yield call(axios.post, `${defaultUrl}/add`, {
        ...action.payload,
        userId: defaultUserId,
    });
    if (res.status === 201) {
        yield put(todoSlice.actions.addTask(res.data))
    }
    yield put(todoSlice.actions.setLoader(false))
}

function* callDeleteTask(action) {
    yield put(todoSlice.actions.setLoader(true))
    try {
        const res = yield call(axios.delete, `${defaultUrl}/${action.payload}`);
        if (res.status === 200) {
            yield put(todoSlice.actions.deleteTask(action.payload))
        }
    } catch (e) {
        console.info(e)
        yield put(todoSlice.actions.deleteTask(action.payload))
    }
    yield put(todoSlice.actions.setLoader(false))
}

function* callUpdateTask(action) {
    yield put(todoSlice.actions.setLoader(true))
    try {
        const res = yield call(axios.put, `${defaultUrl}/${action.payload.id}`, {
            todo: action.payload.todo,
            completed: action.payload.completed,
        });
        if (res.status === 200) {
            yield put(todoSlice.actions.updateTask(res.data))
        }
    } catch (e) {
        console.info(e)
        yield put(todoSlice.actions.updateTask(action.payload))
    }
    yield put(todoSlice.actions.setLoader(false))
}

function* callClearData(action) {
    yield put(todoSlice.actions.setLoader(true))

    for (const task of action.payload) {
        try {
            yield call(axios.delete, `${defaultUrl}/${task.id}`);
        } catch (e) {
            console.info(e)
        }
        yield put(todoSlice.actions.deleteTask(task.id))
    }

    yield put(todoSlice.actions.setLoader(false))
}

export {
    callGetTasks,
    callAddTask,
    callDeleteTask,
    callUpdateTask,
    callClearData,
}
