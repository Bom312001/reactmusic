// định nghĩa các saga để xử lý các action được gửi từ components.
// login là saga để xử lý action 'LOGIN' gửi từ component đăng nhập. loginApi là function để gọi API đăng nhập.
// watchLogin là saga để theo dõi action LOGIN.
// rootSaga là saga chính để chứa các saga con.

import { call, put, takeEvery } from 'redux-saga/effects';
import { loginApi } from '../api/api';
// import axios from 'axios';

function* login(action) {
    try {
        yield put({ type: 'LOGIN_REQUEST' });
        const response = yield call(loginApi, action.payload);

        if (response.status === 200) {
            localStorage.setItem('access_token', 'fake_token');
            yield put({ type: 'LOGIN_SUCCESS' });
        } else {
            yield put({ type: 'LOGIN_FAILURE', payload: 'Incorrect username or password' });
        }
    } catch (error) {
        yield put({ type: 'LOGIN_FAILURE', payload: error.message });
    }
}

function* watchLogin() {
    yield takeEvery('LOGIN', login);
}

export default watchLogin;

// export default function* rootSaga() {
//   yield call([
//     watchLogin(),
//   ]);
// }
