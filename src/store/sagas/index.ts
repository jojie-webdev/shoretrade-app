import { fork, all } from 'redux-saga/effects';

import addAddress from './addAddress';
import addCardToken from './addCardToken';
import addLinkedAccount from './addLinkedAccount';
import addSellerLicense from './addSellerLicense';
import changePassword from './changePassword';
import chargeCard from './chargeCard';
import confirmWeight from './confirmWeight';
import createBulkListing from './createBulkListing';
import createCustomListing from './createCustomListing';
import createListing from './createListing';
import createMarketOffer from './createMarketOffer';
import currentAddress from './currentAddress';
import deleteCard from './deleteCard';
import deleteLinkedAccount from './deleteLinkedAccount';
import editableListing from './editableListing';
import editSelectedListing from './editSelectedListing';
import endListing from './endListing';
import forgotPassword from './forgotPassword';
import getAccountCompletion from './getAccountCompletion';
import getActiveOffers from './getActiveOffers';
import getAddresses from './getAddresses';
import getAllListings from './getAllListings';
import getAllMarketRequest from './getAllMarketRequest';
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
import getMarketInterests from './getMarketInterests';
import getPaymentMethods from './getPaymentMethods';
import getSellerById from './getSellerById';
import getSellerLicense from './getSellerLicense';
import getSellerOrders from './getSellerOrders';
import getShippingQuote from './getShippingQuote';
import getTransactionHistory from './getTransactionHistory';
import getUser from './getUser';
import login from './login';
import logRequest from './logRequest';
import order from './order';
import placeOrder from './placeOrder';
import register from './register';
import resendVerification from './resendVerification';
import resetPassword from './resetPassword';
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
import updateMarketInterests from './updateMarketInterests';
import updateSellerLicense from './updateSellerLicense';
import updateUser from './updateUser';
import uploadBulk from './uploadBulk';
import verify from './verify';

const sagas = [
  addAddress,
  addCardToken,
  addLinkedAccount,
  addSellerLicense,
  changePassword,
  chargeCard,
  confirmWeight,
  createBulkListing,
  createCustomListing,
  createListing,
  createMarketOffer,
  currentAddress,
  deleteCard,
  deleteLinkedAccount,
  editSelectedListing,
  editableListing,
  endListing,
  forgotPassword,
  getAccountCompletion,
  getActiveOffers,
  getAddresses,
  getAllListings,
  getAllMarketRequest,
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
  getMarketInterests,
  getPaymentMethods,
  getSellerById,
  getSellerLicense,
  getSellerOrders,
  getShippingQuote,
  getTransactionHistory,
  getUser,
  login,
  logRequest,
  order,
  placeOrder,
  register,
  resendVerification,
  resetPassword,
  router,
  searchAndCountProductType,
  searchProductType,
  sendMessage,
  updateAddress,
  updateBankDetails,
  uploadBulk,
  updateDefaultCard,
  updateFavoriteSeller,
  updateFavouriteProduct,
  updateListing,
  updateMarketInterests,
  updateSellerLicense,
  updateUser,
  verify,
];

export default function* root() {
  yield all(sagas.map(fork));
}
