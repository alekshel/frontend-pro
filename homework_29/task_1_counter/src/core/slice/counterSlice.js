import { createSlice } from "@reduxjs/toolkit";

export const counter = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            state.value = state.value+1;
        },
        decrement: (state) => {
            state.value = state.value-1;
        }
    }
})
