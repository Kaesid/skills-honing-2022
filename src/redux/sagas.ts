import { all, call, spawn } from "redux-saga/effects";
import { counterSaga } from "../modules/Counters/Counter/counterSaga";

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

// const getProperty = <Type, Key extends keyof Type>(obj: Type, key: Key) => {
//   return obj[key];
// };

function* rootSaga() {
  const sagas = [counterSaga];

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      })
    )
  );
}

export default rootSaga;
