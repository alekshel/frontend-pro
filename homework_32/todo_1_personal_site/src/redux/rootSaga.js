import { all } from 'redux-saga/effects';
import { watchFetchPeople } from '../features/swapi/swapiSaga';

export default function* rootSaga() {
    yield all([
        watchFetchPeople(),
    ]);
}