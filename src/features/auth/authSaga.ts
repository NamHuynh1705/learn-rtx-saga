import { PayloadAction } from '@reduxjs/toolkit';
// import { push } from 'connected-react-router';
import { call, fork, take, delay, put } from 'redux-saga/effects';
import { LoginPayload, authActions, LogoutPayload } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(1000);
    localStorage.setItem('access_token', JSON.stringify(payload));
    // Nếu sử dụng API thì dùng yield call(api, payload)

    yield put(
      authActions.loginSuccess({
        id: 1,
        name: 'Learn Redux-Saga',
      })
    );

    // chuyển về login page
    // yield put(push('/admin'));
    // hàm push của thư viện connected-react-router giúp chuyển hướng đường dẫn
    payload.onNavigate?.();

  } catch (error) {
    console.error(error);
    yield put(authActions.loginFailed(error as string));
  }
}

function* handleLogout(payload: LogoutPayload) {
  yield delay(500);
  localStorage.removeItem('access_token');

  // chuyển về login page
  // yield put(push('/login')); // connected-react-router
   payload.onNavigate?.();
}

function* watchLoginFlow() {
  // đặt 2 action vào trong vòng lặp while true
  // mục đích: để khi logout xong, user có thể chọn login vào lại
  // nếu ko sử dụng vòng lặp vô tận ở đây thì lúc logout xong hàm watchLoginFlow đã bị dừng lại vì bên dưới logout ko còn yield take nào cả
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    
    if (!isLoggedIn) {
      // Nếu chưa đăng nhập mới đc chạy action login
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }
    
    const action: PayloadAction<LogoutPayload> = yield take(authActions.logout.type);
    // sử dụng call (blocking) thay vì fork (non-blocking) để "ĐỢI" handleLogout chạy xong mới tiếp tục hàm
    yield call(handleLogout, action.payload);
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
