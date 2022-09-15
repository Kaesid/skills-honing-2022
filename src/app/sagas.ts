import { put, takeEvery } from "redux-saga/effects";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
// import { Action } from "@reduxjs/toolkit";
// // worker Saga: will be fired on USER_FETCH_REQUESTED actions
// function* fetchUser(action: Action<number>) {
//   try {
//     const user = yield call(Api.fetchUser, action.payload.userId);
//     yield put({ type: "USER_FETCH_SUCCEEDED", user: user });
//   } catch (e) {
//     yield put({ type: "USER_FETCH_FAILED", message: e.message });
//   }
// }

// /*
//    Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
//    Allows concurrent fetches of user.
//  */
// function* mySaga() {
//   yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
// }
export function* incrementAsync() {
  yield delay(1000);
  yield put({ type: "counter/increment" });
}

export function* mySaga() {
  //   console.log("Hello Sagas!");
  yield takeEvery("counter/incrementDelaySaga", incrementAsync);
}

export default mySaga;
