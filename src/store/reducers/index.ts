import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import getAccountCompletion from 'store/reducers/getAccountCompletion';

import addAddress from './addAddress';
import addCardAndPay from './addCardAndPay';
import addCardToken from './addCardToken';
import addLinkedAccount from './addLinkedAccount';
import addSellerLicense from './addSellerLicense';
import auth from './auth';
import cart from './cart';
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
import editableListing from './editableListing';
import editableMarketRequest from './editableMarketRequest';
import endListing from './endListing';
import forgotPassword from './forgotPassword';
import getActiveOffers from './getActiveOffers';
import getAddresses from './getAddresses';
import getAllBuyerListings from './getAllBuyerListings';
import getAllListings from './getAllListings';
import getAllMarketRequest from './getAllMarketRequest';
import getAllMarketRequestFilters from './getAllMarketRequestFilters';
import getAvailableCrates from './getAvailableCrates';
import getBankDetails from './getBankDetails';
import getBuyerHomepage from './getBuyerHomepage';
import getBuyerOrdersDelivered from './getBuyerOrdersDelivered';
import getBuyerOrdersPlaced from './getBuyerOrdersPlaced';
import getBuyerOrdersTransit from './getBuyerOrdersTransit';
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
import getSellerLicense from './getSellerLicense';
import getSellerOrdersDelivered from './getSellerOrdersDelivered';
import getSellerOrdersPlaced from './getSellerOrdersPlaced';
import getSellerOrdersTransit from './getSellerOrdersTransit';
import getShippingQuote from './getShippingQuote';
import getTransactionHistory from './getTransactionHistory';
import getUser from './getUser';
import history from './history';
import login from './login';
import logout from './logout';
import logRequest from './logRequest';
import marketOfferNegotiate from './marketOfferNegotiate';
import marketRequestAcceptOffer from './marketRequestAcceptOffer';
import marketRequestNegotiation from './marketRequestNegotiation';
import modifyBulkUpload from './modifyBulkUpload';
import notify from './notify';
import order from './order';
import placeOrder from './placeOrder';
import readMarketNotification from './readMarketNotification';
import register from './register';
import resendVerification from './resendVerification';
import resetPassword from './resetPassword';
import searchAndCountProductType from './searchAndCountProductType';
import searchProductType from './searchProductType';
import sellerDashboardDate from './sellerDashboardDate';
import sendDispute from './sendDispute';
import sendMessage from './sendMessage';
import socketCredit from './socketCredit';
import socketGetAllListings from './socketGetAllListings';
import socketGetListing from './socketGetListing';
import socketGetListingsByType from './socketGetListingsByType';
import socketHomePage from './socketHomePage';
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

export default (routeHistory: History) =>
  combineReducers(
    Object.fromEntries(
      Object.entries({
        addAddress,
        addCardAndPay,
        addCardToken,
        addLinkedAccount,
        addSellerLicense,
        auth,
        cart,
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
        getBuyerOrdersDelivered,
        getBuyerOrdersPlaced,
        getBuyerOrdersTransit,
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
        getSellerOrdersDelivered,
        getSellerOrdersPlaced,
        getSellerOrdersTransit,
        getShippingQuote,
        getTransactionHistory,
        getNotifications,
        getUser,
        history,
        logRequest,
        login,
        logout,
        marketRequestAcceptOffer,
        marketOfferNegotiate,
        marketRequestNegotiation,
        modifyBulkUpload,
        notify,
        order,
        placeOrder,
        readMarketNotification,
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
        updateMarketInterests,
        updateSellerLicense,
        updateUser,
        uploadBulk,
        verify,
        getPaymentMode,
        sendDispute,
        socketCredit,
        socketHomePage,
        socketGetAllListings,
        socketGetListing,
        socketGetListingsByType,
        getNotificationsSettings,
        editableMarketRequest,
        updateNotificationSettings,
      }).sort()
    )
  );
