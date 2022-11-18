import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
// import { connectRouter, routerMiddleware } from 'connected-react-router';
import authReducer from 'features/auth/authSlice';
import dashboardReducer from 'features/dashboard/dashboardSlice';
import studentReducer from 'features/student/studentSlice';
import createSagaMiddleware from 'redux-saga';
// import { history } from 'utils';
import rootSaga from './rootSaga';

// const rootReducer = combineReducers({
//   router: connectRouter(history),
//   counter: counterReducer,
//   auth: authReducer,
// });

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: { auth: authReducer, dashboard: dashboardReducer, student: studentReducer },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // bỏ kiểm tra các biến serializable
    }).concat(sagaMiddleware),
  // thêm saga vào danh sách middleware của redux-toolkit
});

sagaMiddleware.run(rootSaga); // chạy saga

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
