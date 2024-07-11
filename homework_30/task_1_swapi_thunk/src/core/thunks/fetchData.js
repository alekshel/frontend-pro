import swapiSlice from "../slices/swapiSlice.js";

const fetchSwapiData = async () => {
    const response = await fetch('https://swapi.dev/api/people/1');
    const data = await response.json();
    return data;
};

export const fetchData = () => async (dispatch, state) => {
    const response = await fetchSwapiData();
    console.log('fetchData', response);
    dispatch(swapiSlice.actions.setResponse(response));
}

export const clearData = () => (dispatch, state) => {
    dispatch(swapiSlice.actions.clear());
}