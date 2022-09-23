import { put, takeEvery } from "redux-saga/effects";

const delay = (ms: number) => new Promise<void>(res => setTimeout(res, ms));

function* incrementAsync() {
  yield delay(1000);
  yield put({ type: "counter/increment" });
}

function* counterSaga() {
  yield takeEvery("counter/incrementDelaySaga", incrementAsync);
}

export { counterSaga };
