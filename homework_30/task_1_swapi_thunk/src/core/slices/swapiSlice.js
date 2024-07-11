import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    response: {},
}

export default createSlice({
    name: 'swapi',
    initialState,
    reducers: {
        setResponse: (state, action) => {
            state.response = action.payload
        },
        clear: (state) => {
            state.response = {}
        },
    }
})
