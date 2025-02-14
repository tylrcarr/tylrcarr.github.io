// src/redux/sagas/index.ts

import {all, fork} from 'redux-saga/effects';
import {markersSaga} from "./markersSaga";

export default function* rootSaga() {
    yield all([
        fork(markersSaga),
        // Add other sagas here
    ]);
}
