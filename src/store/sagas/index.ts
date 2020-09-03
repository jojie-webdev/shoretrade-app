import { fork, all } from 'redux-saga/effects';

import addAddress from './addAddress';
import addLinkedAccount from './addLinkedAccount';
import changePassword from './changePassword';
import currentAddress from './currentAddress';
import deleteLinkedAccount from './deleteLinkedAccount';
import forgotPassword from './forgotPassword';
import getAddresses from './getAddresses';
import getAllListings from './getAllListings';
import getBankDetails from './getBankDetails';
import getBuyerHomepage from './getBuyerHomePage';
import getBuyerSearchFilterData from './getBuyerSearchFilterData';
import getLinkedAccounts from './getLinkedAccounts';
import getListing from './getListing';
import getListingBoxes from './getListingBoxes';
import getListingsByType from './getListingsByType';
import getListingTypesByCategory from './getListingTypesByCategory';
import getSellerById from './getSellerById';
import getSellerOrders from './getSellerOrders';
import getUser from './getUser';
import login from './login';
import register from './register';
import resendVerification from './resendVerification';
import updateAddress from './updateAddress';
import updateBankDetails from './updateBankDetails';
import updateFavoriteSeller from './updateFavoriteSeller';
import updateFavouriteProduct from './updateFavouriteProduct';
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
  deleteLinkedAccount,
  updateFavoriteSeller,
  getSellerById,
  getBuyerHomepage,
  currentAddress,
  getListingTypesByCategory,
  getBuyerSearchFilterData,
  getListingsByType,
  getListing,
  getListingBoxes,
  updateFavouriteProduct,
];

export default function* root() {
  yield all(sagas.map(fork));
}
