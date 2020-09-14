import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';

import addAddress from './addAddress';
import addLinkedAccount from './addLinkedAccount';
import auth from './auth';
import cart from './cart';
import changePassword from './changePassword';
import currentAddress from './currentAddress';
import deleteLinkedAccount from './deleteLinkedAccount';
import forgotPassword from './forgotPassword';
import getAddresses from './getAddresses';
import getAllListings from './getAllListings';
import getBankDetails from './getBankDetails';
import getBuyerOrdersDelivered from './getBuyerOrdersDelivered';
import getBuyerOrdersPlaced from './getBuyerOrdersPlaced';
import getBuyerOrdersTransit from './getBuyerOrdersTransit';
import getBuyerHomepage from './getBuyerHomepage';
import getBuyerSearchFilterData from './getBuyerSearchFilterData';
import getLinkedAccounts from './getLinkedAccounts';
import getListing from './getListing';
import getListingBoxes from './getListingBoxes';
import getListingsByType from './getListingsByType';
import getListingTypesByCategory from './getListingTypesByCategory';
import getSellerById from './getSellerById';
import getSellerOrdersDelivered from './getSellerOrdersDelivered';
import getSellerOrdersPlaced from './getSellerOrdersPlaced';
import getSellerOrdersTransit from './getSellerOrdersTransit';
import getUser from './getUser';
import history from './history';
import login from './login';
import register from './register';
import resendVerification from './resendVerification';
import searchAndCountProductType from './searchAndCountProductType';
import updateAddress from './updateAddress';
import updateBankDetails from './updateBankDetails';
import updateFavoriteSeller from './updateFavoriteSeller';
import updateFavouriteProduct from './updateFavouriteProduct';
import updateUser from './updateUser';
import verify from './verify';

export default (routeHistory: History) =>
  combineReducers({
    router: connectRouter(routeHistory),
    auth,
    login,
    resendVerification,
    verify,
    forgotPassword,
    getUser,
    getAllListings,
    register,
    updateUser,
    getAddresses,
    updateAddress,
    getSellerOrdersPlaced,
    getSellerOrdersTransit,
    getSellerOrdersDelivered,
    getBankDetails,
    updateBankDetails,
    changePassword,
    getBuyerOrdersPlaced,
    getBuyerOrdersTransit,
    getBuyerOrdersDelivered,
    currentAddress,
    getBuyerHomepage,
    getListingTypesByCategory,
    getBuyerSearchFilterData,
    getListingsByType,
    getLinkedAccounts,
    addLinkedAccount,
    addAddress,
    deleteLinkedAccount,
    getSellerById,
    cart,
    getListing,
    getListingBoxes,
    updateFavoriteSeller,
    updateFavouriteProduct,
    searchAndCountProductType,
    history,
  });
