import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import getAccountCompletion from 'store/reducers/getAccountCompletion';

import addAddress from './addAddress';
import addCardToken from './addCardToken';
import addLinkedAccount from './addLinkedAccount';
import auth from './auth';
import cart from './cart';
import changePassword from './changePassword';
import chargeCard from './chargeCard';
import confirmWeight from './confirmWeight';
import createCustomListing from './createCustomListing';
import createListing from './createListing';
import currentAddress from './currentAddress';
import deleteCard from './deleteCard';
import deleteLinkedAccount from './deleteLinkedAccount';
import editableListing from './editableListing';
import endListing from './endListing';
import forgotPassword from './forgotPassword';
import getAddresses from './getAddresses';
import getAllListings from './getAllListings';
import getBankDetails from './getBankDetails';
import getBuyerHomepage from './getBuyerHomepage';
import getBuyerOrdersDelivered from './getBuyerOrdersDelivered';
import getBuyerOrdersPlaced from './getBuyerOrdersPlaced';
import getBuyerOrdersTransit from './getBuyerOrdersTransit';
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
import getSellerOrdersDelivered from './getSellerOrdersDelivered';
import getSellerOrdersPlaced from './getSellerOrdersPlaced';
import getSellerOrdersTransit from './getSellerOrdersTransit';
import getShippingQuote from './getShippingQuote';
import getTransactionHistory from './getTransactionHistory';
import getUser from './getUser';
import history from './history';
import login from './login';
import logRequest from './logRequest';
import order from './order';
import placeOrder from './placeOrder';
import register from './register';
import resendVerification from './resendVerification';
import resetPassword from './resetPassword';
import searchAndCountProductType from './searchAndCountProductType';
import searchProductType from './searchProductType';
import sellerDashboardDate from './sellerDashboardDate';
import sendMessage from './sendMessage';
import updateAddress from './updateAddress';
import updateBankDetails from './updateBankDetails';
import updateDefaultCard from './updateDefaultCard';
import updateFavoriteSeller from './updateFavoriteSeller';
import updateFavouriteProduct from './updateFavouriteProduct';
import updateListing from './updateListing';
import updateUser from './updateUser';
import verify from './verify';

export default (routeHistory: History) =>
  combineReducers(
    Object.fromEntries(
      Object.entries({
        addAddress,
        addCardToken,
        addLinkedAccount,
        auth,
        cart,
        changePassword,
        chargeCard,
        confirmWeight,
        createCustomListing,
        createListing,
        currentAddress,
        deleteCard,
        deleteLinkedAccount,
        editableListing,
        endListing,
        forgotPassword,
        getAccountCompletion,
        getAddresses,
        getAllListings,
        getBankDetails,
        getBuyerHomepage,
        getBuyerOrdersDelivered,
        getBuyerOrdersPlaced,
        getBuyerOrdersTransit,
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
        getSellerOrdersDelivered,
        getSellerOrdersPlaced,
        getSellerOrdersTransit,
        getShippingQuote,
        getTransactionHistory,
        getUser,
        history,
        login,
        logRequest,
        order,
        placeOrder,
        register,
        resendVerification,
        resetPassword,
        router: connectRouter(routeHistory),
        searchAndCountProductType,
        searchProductType,
        sellerDashboardDate,
        sendMessage,
        updateAddress,
        updateBankDetails,
        updateDefaultCard,
        updateFavoriteSeller,
        updateFavouriteProduct,
        updateListing,
        updateUser,
        verify,
      }).sort()
    )
  );
