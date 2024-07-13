import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    response: {},
}

export default createSlice({
    name: 'swapi',
    initialState,
    reducers: {
        setEndpoint: (state, action) => {
            state.endpoint = action.payload
        },
        setResponse: (state, action) => {
            state.response = action.payload
        },
        clear: (state) => {
            state.response = {}
        },
    }
})
