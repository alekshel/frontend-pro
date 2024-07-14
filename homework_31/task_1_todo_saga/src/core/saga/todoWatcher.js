import {takeEvery} from 'redux-saga/effects';
import {todoAsyncActins} from "./asyncActions.js";
import {callGetTasks, callAddTask, callDeleteTask, callUpdateTask, callClearData} from "./todoWorkers.js";

export function* todoWatcher() {
    yield takeEvery(todoAsyncActins.getTasks.type, callGetTasks)
    yield takeEvery(todoAsyncActins.addTask.type, callAddTask)
    yield takeEvery(todoAsyncActins.deleteTask.type, callDeleteTask)
    yield takeEvery(todoAsyncActins.updateTask.type, callUpdateTask)
    yield takeEvery(todoAsyncActins.clearData.type, callClearData)
}
