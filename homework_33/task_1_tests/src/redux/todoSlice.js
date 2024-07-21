import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        error: null,
    },
    reducers: {
        addTodo: (state, action) => {
            state.items.push({ id: Date.now(), text: action.payload, completed: false });
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const { addTodo, setError, clearError } = todoSlice.actions;
export default todoSlice.reducer;