import { SET_DESTINATIONS, SET_HOTELS } from './actions';

const initialState = {
    destinations: [],
    hotels: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_DESTINATIONS:
            return { ...state, destinations: action.destinations };
        case SET_HOTELS:
            return { ...state, hotels: action.hotels };
        default:
            return state;
    }
}