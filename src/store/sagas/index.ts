import { fork, all } from 'redux-saga/effects';

import addAddress from './addAddress';
import addLinkedAccount from './addLinkedAccount';
import changePassword from './changePassword';
import forgotPassword from './forgotPassword';
import getAddresses from './getAddresses';
import getAllListings from './getAllListings';
import getBankDetails from './getBankDetails';
import getLinkedAccounts from './getLinkedAccounts';
import getSellerOrders from './getSellerOrders';
import getUser from './getUser';
import login from './login';
import register from './register';
import resendVerification from './resendVerification';
import updateAddress from './updateAddress';
import updateBankDetails from './updateBankDetails';
import updateUser from './updateUser';
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
  updateUser,
  getAddresses,
  updateAddress,
  getSellerOrders,
  getBankDetails,
  updateBankDetails,
  changePassword,
  getLinkedAccounts,
  addLinkedAccount,
  addAddress,
];

export default function* root() {
  yield all(sagas.map(fork));
}
