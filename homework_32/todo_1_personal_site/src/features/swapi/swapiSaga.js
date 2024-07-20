import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchPeopleStart, fetchPeopleSuccess, fetchPeopleFailure } from './swapiSlice';

function* fetchPeopleSaga() {
    try {
        yield put(fetchPeopleStart());
        const response = yield call(fetch, 'https://swapi.dev/api/people/');
        const data = yield call([response, 'json']);
        yield put(fetchPeopleSuccess(data.results));
    } catch (error) {
        yield put(fetchPeopleFailure(error.message));
    }
}

export function* watchFetchPeople() {
    yield takeLatest('swapi/fetchPeople', fetchPeopleSaga);
}
