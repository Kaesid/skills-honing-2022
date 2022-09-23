import createSagaMiddleware from "redux-saga";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../modules/Counters/Counter/counterSlice";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({}).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
