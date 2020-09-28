import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';

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
import getPaymentMethods from './getPaymentMethods';
import getSellerById from './getSellerById';
import getSellerOrdersDelivered from './getSellerOrdersDelivered';
import getSellerOrdersPlaced from './getSellerOrdersPlaced';
import getSellerOrdersTransit from './getSellerOrdersTransit';
import getUser from './getUser';
import history from './history';
import login from './login';
import placeOrder from './placeOrder';
import register from './register';
import resendVerification from './resendVerification';
import searchAndCountProductType from './searchAndCountProductType';
import searchProductType from './searchProductType';
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
        confirmWeight,
        placeOrder,
        getCoopUsers,
        editableListing,
        searchProductType,
        getListingFormData,
        getCustomFormData,
        updateListing,
        createListing,
        createCustomListing,
        getBuyerOrdersPlaced,
        getBuyerOrdersTransit,
        getBuyerOrdersDelivered,
        getPaymentMethods,
        chargeCard,
        addCardToken,
        updateDefaultCard,
        deleteCard,
        endListing,
      }).sort()
    )
  );
