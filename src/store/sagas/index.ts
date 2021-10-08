import { fork, all } from 'redux-saga/effects';

/* PLOP_INJECT_IMPORT */
import addAddress from './addAddress';
import addCardAndPay from './addCardAndPay';
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
import createMarketRequest from './createMarketRequest';
import currentAddress from './currentAddress';
import deleteCard from './deleteCard';
import deleteLinkedAccount from './deleteLinkedAccount';
import deleteMarketRequest from './deleteMarketRequest';
import deleteMarketRequestOffer from './deleteMarketRequestOffer';
import deleteNotification from './deleteNotification';
import editableListing from './editableListing';
import editSelectedListing from './editSelectedListing';
import endListing from './endListing';
import forgotPassword from './forgotPassword';
import getAccountCompletion from './getAccountCompletion';
import getActiveOffers from './getActiveOffers';
import getAddresses from './getAddresses';
import getAllBuyerListings from './getAllBuyerListings';
import getAllListings from './getAllListings';
import getAllMarketRequest from './getAllMarketRequest';
import getAllMarketRequestFilters from './getAllMarketRequestFilters';
import getAvailableCrates from './getAvailableCrates';
import getBankDetails from './getBankDetails';
import getBuyerHomepage from './getBuyerHomePage';
import getBuyerOrders from './getBuyerOrders';
import getBuyerSearchFilterData from './getBuyerSearchFilterData';
import getCoopUsers from './getCoopUsers';
import getCrates from './getCrates';
import getCustomFormData from './getCustomFormData';
import getLinkedAccounts from './getLinkedAccounts';
import getListing from './getListing';
import getListingBoxes from './getListingBoxes';
import getListingFormData from './getListingFormData';
import getListingsByType from './getListingsByType';
import getListingTypesByCategory from './getListingTypesByCategory';
import getMarketEstimate from './getMarketEstimate';
import getMarketInterests from './getMarketInterests';
import getMarketNotification from './getMarketNotification';
import getMarketRequestBuyerFilters from './getMarketRequestBuyerFilters';
import getNotifications from './getNotifications';
import getNotificationsSettings from './getNotificationsSettings';
import getPaymentMethods from './getPaymentMethods';
import getPaymentMode from './getPaymentMode';
import getSellerById from './getSellerById';
import getSellerDashboardSales from './getSellerDashboardSales';
import getSellerDashboardTopCategories from './getSellerDashboardTopCategories';
import getSellerLicense from './getSellerLicense';
import getSellerOrders from './getSellerOrders';
import getShippingQuote from './getShippingQuote';
import getTransactionHistory from './getTransactionHistory';
import getUser from './getUser';
import login from './login';
import logout from './logout';
import logRequest from './logRequest';
import marketOfferNegotiate from './marketOfferNegotiate';
import marketRequestAcceptOffer from './marketRequestAcceptOffer';
import marketRequestNegotiation from './marketRequestNegotiation';
import marketRequestOfferConfirm from './marketRequestOfferConfirm';
import modifyBulkUpload from './modifyBulkUpload';
import order from './order';
import placeOrder from './placeOrder';
import readMarketNotification from './readMarketNotification';
import readNotification from './readNotification';
import register from './register';
import resendVerification from './resendVerification';
import resetPassword from './resetPassword';
import router from './router';
import searchAndCountProductType from './searchAndCountProductType';
import searchProductType from './searchProductType';
import sellerDashboardDate from './sellerDashboardDate';
import sendDispute from './sendDispute';
import sendMessage from './sendMessage';
import socketChannel from './socketChannel';
import updateAddress from './updateAddress';
import updateBankDetails from './updateBankDetails';
import updateDefaultCard from './updateDefaultCard';
import updateFavoriteSeller from './updateFavoriteSeller';
import updateFavouriteProduct from './updateFavouriteProduct';
import updateListing from './updateListing';
import updateMarketInterests from './updateMarketInterests';
import updateNotificationSettings from './updateNotificationSettings';
import updateSellerLicense from './updateSellerLicense';
import updateUser from './updateUser';
import uploadBulk from './uploadBulk';
import verify from './verify';

const sagas = [
  /* PLOP_INJECT_INSTANCE */
  getSellerDashboardTopCategories,
  getSellerDashboardSales,
  addAddress,
  addCardAndPay,
  addCardToken,
  addLinkedAccount,
  addSellerLicense,
  changePassword,
  chargeCard,
  confirmWeight,
  createBulkListing,
  createCustomListing,
  createMarketRequest,
  createListing,
  createMarketOffer,
  currentAddress,
  deleteCard,
  deleteLinkedAccount,
  deleteMarketRequest,
  deleteNotification,
  deleteMarketRequestOffer,
  editSelectedListing,
  editableListing,
  endListing,
  forgotPassword,
  getAccountCompletion,
  getActiveOffers,
  getAddresses,
  getAllBuyerListings,
  getAllListings,
  getAllMarketRequest,
  getAllMarketRequestFilters,
  getBankDetails,
  getBuyerHomepage,
  getBuyerOrders,
  getBuyerSearchFilterData,
  getCoopUsers,
  getCrates,
  getAvailableCrates,
  getCustomFormData,
  getLinkedAccounts,
  getListing,
  getListingBoxes,
  getListingFormData,
  getListingTypesByCategory,
  getListingsByType,
  getMarketEstimate,
  getMarketInterests,
  getMarketNotification,
  getMarketRequestBuyerFilters,
  getPaymentMethods,
  getSellerById,
  getSellerLicense,
  getSellerOrders,
  getShippingQuote,
  getTransactionHistory,
  getUser,
  logRequest,
  login,
  logout,
  marketOfferNegotiate,
  marketRequestAcceptOffer,
  marketRequestOfferConfirm,
  marketRequestNegotiation,
  modifyBulkUpload,
  order,
  placeOrder,
  readNotification,
  readMarketNotification,
  register,
  resendVerification,
  resetPassword,
  router,
  searchAndCountProductType,
  searchProductType,
  sendMessage,
  updateAddress,
  updateBankDetails,
  updateDefaultCard,
  updateFavoriteSeller,
  updateNotificationSettings,
  updateFavouriteProduct,
  updateListing,
  updateMarketInterests,
  updateSellerLicense,
  updateUser,
  uploadBulk,
  verify,
  getPaymentMode,
  sendDispute,
  getNotifications,
  getNotificationsSettings,
  socketChannel,
  sellerDashboardDate,
];

export default function* root() {
  yield all(sagas.map(fork));
}
