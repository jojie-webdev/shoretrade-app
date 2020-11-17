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
import getMarketEstimate from './getMarketEstimate';
import getPaymentMethods from './getPaymentMethods';
import getSellerById from './getSellerById';
import getSellerOrders from './getSellerOrders';
import getShippingQuote from './getShippingQuote';
import getTransactionHistory from './getTransactionHistory';
import getUser from './getUser';
import login from './login';
import order from './order';
import placeOrder from './placeOrder';
import register from './register';
import resendVerification from './resendVerification';
import router from './router';
import searchAndCountProductType from './searchAndCountProductType';
import searchProductType from './searchProductType';
import sendMessage from './sendMessage';
import updateAddress from './updateAddress';
import updateBankDetails from './updateBankDetails';
import updateDefaultCard from './updateDefaultCard';
import updateFavoriteSeller from './updateFavoriteSeller';
import updateFavouriteProduct from './updateFavouriteProduct';
import updateListing from './updateListing';
import updateUser from './updateUser';
import verify from './verify';

const sagas = [
  addAddress,
  addCardToken,
  addLinkedAccount,
  changePassword,
  chargeCard,
  confirmWeight,
  createCustomListing,
  createListing,
  currentAddress,
  deleteCard,
  deleteLinkedAccount,
  editSelectedListing,
  editableListing,
  endListing,
  forgotPassword,
  getAddresses,
  getAllListings,
  getBankDetails,
  getBuyerHomepage,
  getBuyerOrders,
  getBuyerSearchFilterData,
  getCoopUsers,
  getCustomFormData,
  getLinkedAccounts,
  getListing,
  getListingBoxes,
  getListingFormData,
  getListingTypesByCategory,
  getListingsByType,
  getMarketEstimate,
  getPaymentMethods,
  getSellerById,
  getSellerOrders,
  getShippingQuote,
  getTransactionHistory,
  getUser,
  login,
  order,
  placeOrder,
  register,
  resendVerification,
  router,
  searchAndCountProductType,
  searchProductType,
  sendMessage,
  updateAddress,
  updateBankDetails,
  updateDefaultCard,
  updateFavoriteSeller,
  updateFavouriteProduct,
  updateListing,
  updateUser,
  verify,
];

export default function* root() {
  yield all(sagas.map(fork));
}
