import { fork, all } from 'redux-saga/effects';

import forgotPassword from './forgotPassword';
import login from './login';
import register from './register';
import resendVerification from './resendVerification';
import verify from './verify';

const sagas = [login, verify, resendVerification, forgotPassword, register];

export default function* root() {
  yield all(sagas.map(fork));
}
