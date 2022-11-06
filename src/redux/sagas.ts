import { all, call, spawn } from "redux-saga/effects";
import { redirectWithSagaJustForFun } from "../components/HomePage/homeSaga";

function* rootSaga() {
  const sagas = [redirectWithSagaJustForFun];

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
