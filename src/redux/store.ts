import createSagaMiddleware from "redux-saga";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../modules/Counters/Counter/counterSlice";
import paintReducer from "../modules/PaintPage/paintSlice";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    paint: paintReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
