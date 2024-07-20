import { createSlice } from '@reduxjs/toolkit';

const swapiSlice = createSlice({
    name: 'swapi',
    initialState: {
        people: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchPeopleStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchPeopleSuccess: (state, action) => {
            state.people = action.payload;
            state.loading = false;
        },
        fetchPeopleFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { fetchPeopleStart, fetchPeopleSuccess, fetchPeopleFailure } = swapiSlice.actions;
export const fetchPeople = () => ({ type: 'swapi/fetchPeople' });
export default swapiSlice.reducer;