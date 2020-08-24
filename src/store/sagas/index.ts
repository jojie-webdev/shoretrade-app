import { fork, all } from 'redux-saga/effects';

import forgotPassword from './forgotPassword';
import getAllListings from './getAllListings';
import getSellerOrders from './getSellerOrders';
import getUser from './getUser';
import login from './login';
import register from './register';
import resendVerification from './resendVerification';
import verify from './verify';

const sagas = [
  login,
  verify,
  resendVerification,
  forgotPassword,
  getUser,
  getAllListings,
  register,
  getUser,
  getSellerOrders,
];

export default function* root() {
  yield all(sagas.map(fork));
}
