import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_DESTINATIONS, FETCH_HOTELS, setDestinations, setHotels } from './actions';
import { fetchDestinations, fetchHotels } from '../services/api';

function* fetchDestinationsSaga() {
    try {
        const destinations = yield call(fetchDestinations);
        yield put(setDestinations(destinations));
    } catch (error) {
        console.error('Error fetching destinations:', error);
    }
}

function* fetchHotelsSaga(action) {
    try {
        const hotels = yield call(fetchHotels, action.payload);
        yield put(setHotels(hotels));
    } catch (error) {
        console.error('Error fetching hotels:', error);
    }
}

export default function* rootSaga() {
    yield takeLatest(FETCH_DESTINATIONS, fetchDestinationsSaga);
    yield takeLatest(FETCH_HOTELS, fetchHotelsSaga);
}