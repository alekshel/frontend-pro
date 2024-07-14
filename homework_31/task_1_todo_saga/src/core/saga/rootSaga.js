import { all, call } from 'redux-saga/effects'
import {todoWatcher} from "./todoWatcher.js";
export function* rootSaga() {
  yield all([
    call(todoWatcher),
  ])
}
