import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
        loading: false,
        error: null,
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push({
                id: Date.now(),
                text: action.payload,
                completed: false,
            });
            state.loading = false;
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { addTodo, toggleTodo, setLoading, setError } = todoSlice.actions;

// Асинхронні дії для взаємодії з сагами
export const addTodoAsync = (todoText) => ({ type: 'todo/addTodoAsync', payload: todoText });
export const toggleTodoAsync = (todoId) => ({ type: 'todo/toggleTodoAsync', payload: todoId });

export default todoSlice.reducer;