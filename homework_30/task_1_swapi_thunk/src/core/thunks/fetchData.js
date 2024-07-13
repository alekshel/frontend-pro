import swapiSlice from "../slices/swapiSlice.js";

const fetchSwapiData = async (endpoint) => {
    const response = await fetch(`https://swapi.dev/api/${ endpoint }`);
    return await response.json();
};

export const fetchData = (endpoint) => async (dispatch) => {
    const response = await fetchSwapiData(endpoint);
    dispatch(swapiSlice.actions.setResponse(response));
}

export const clearData = () => (dispatch) => {
    dispatch(swapiSlice.actions.clear());
}