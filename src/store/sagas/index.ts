import { fork, all } from 'redux-saga/effects';

import changePassword from './changePassword';
import currentAddress from './currentAddress';
import forgotPassword from './forgotPassword';
import getAddresses from './getAddresses';
import getAllListings from './getAllListings';
import getBuyerHomepage from './getBuyerHomePage';
import getListingTypesByCategory from './getListingTypesByCategory';
import getSellerOrders from './getSellerOrders';
import getUser from './getUser';
import login from './login';
import register from './register';
import resendVerification from './resendVerification';
import updateAddress from './updateAddress';
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
  changePassword,
  getBuyerHomepage,
  currentAddress,
  getListingTypesByCategory,
];

export default function* root() {
  yield all(sagas.map(fork));
}
