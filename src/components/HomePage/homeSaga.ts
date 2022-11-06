import { takeEvery } from "redux-saga/effects";
import { RoutesPath } from "../../constants/routes";
import { redirectToCanvasActionName } from "./constants";
import { ISagaAction } from "./interface";

function* redirectWithSaga(action: ISagaAction) {
  yield action.navigate(RoutesPath.CANVAS);
}

function* redirectWithSagaJustForFun() {
  yield takeEvery(redirectToCanvasActionName, redirectWithSaga);
}

export { redirectWithSagaJustForFun };
