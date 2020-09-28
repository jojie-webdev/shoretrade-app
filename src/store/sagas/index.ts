import { fork, all } from 'redux-saga/effects';

import addAddress from './addAddress';
import addCardToken from './addCardToken';
import addLinkedAccount from './addLinkedAccount';
import changePassword from './changePassword';
import chargeCard from './chargeCard';
import confirmWeight from './confirmWeight';
import createCustomListing from './createCustomListing';
import createListing from './createListing';
import currentAddress from './currentAddress';
import deleteCard from './deleteCard';
import deleteLinkedAccount from './deleteLinkedAccount';
import editableListing from './editableListing';
import editSelectedListing from './editSelectedListing';
import endListing from './endListing';
import forgotPassword from './forgotPassword';
import getAddresses from './getAddresses';
import getAllListings from './getAllListings';
import getBankDetails from './getBankDetails';
import getBuyerHomepage from './getBuyerHomePage';
import getBuyerOrders from './getBuyerOrders';
import getBuyerSearchFilterData from './getBuyerSearchFilterData';
import getCoopUsers from './getCoopUsers';
import getCustomFormData from './getCustomFormData';
import getLinkedAccounts from './getLinkedAccounts';
import getListing from './getListing';
import getListingBoxes from './getListingBoxes';
import getListingFormData from './getListingFormData';
import getListingsByType from './getListingsByType';
import getListingTypesByCategory from './getListingTypesByCategory';
import getPaymentMethods from './getPaymentMethods';
import getSellerById from './getSellerById';
import getSellerOrders from './getSellerOrders';
import getUser from './getUser';
import login from './login';
import placeOrder from './placeOrder';
import register from './register';
import resendVerification from './resendVerification';
import router from './router';
import searchAndCountProductType from './searchAndCountProductType';
import searchProductType from './searchProductType';
import updateAddress from './updateAddress';
import updateBankDetails from './updateBankDetails';
import udpateDefaultCard from './updateDefaultCard';
import updateFavoriteSeller from './updateFavoriteSeller';
import updateFavouriteProduct from './updateFavouriteProduct';
import updateListing from './updateListing';
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
  getCoopUsers,
  router,
  searchProductType,
  editableListing,
  getListingFormData,
  getCustomFormData,
  getBankDetails,
  updateBankDetails,
  changePassword,
  getBuyerOrders,
  getLinkedAccounts,
  addLinkedAccount,
  addAddress,
  deleteLinkedAccount,
  updateFavoriteSeller,
  getSellerById,
  createCustomListing,
  createListing,
  updateListing,
  getBuyerHomepage,
  currentAddress,
  getListingTypesByCategory,
  getBuyerSearchFilterData,
  getListingsByType,
  getListing,
  getListingBoxes,
  updateFavouriteProduct,
  searchAndCountProductType,
  confirmWeight,
  placeOrder,
  getPaymentMethods,
  chargeCard,
  addCardToken,
  udpateDefaultCard,
  deleteCard,
  endListing,
  editSelectedListing,
];

export default function* root() {
  yield all(sagas.map(fork));
}
