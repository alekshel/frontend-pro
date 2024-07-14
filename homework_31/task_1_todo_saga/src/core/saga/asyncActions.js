import {createAction} from "@reduxjs/toolkit";

export const todoAsyncActins = Object.freeze({
    getTasks: createAction('GET_TASKS'),
    addTask: createAction('POST_ADD_TASK'),
    deleteTask: createAction('DELETE_TASK'),
    updateTask: createAction('UPDATE_TASK'),
    clearData: createAction('CLEAR_DATA'),
})
