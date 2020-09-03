import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';

import addAddress from './addAddress';
import addLinkedAccount from './addLinkedAccount';
import auth from './auth';
import changePassword from './changePassword';
import deleteLinkedAccount from './deleteLinkedAccount';
import forgotPassword from './forgotPassword';
import getAddresses from './getAddresses';
import getAllListings from './getAllListings';
import getBankDetails from './getBankDetails';
import getLinkedAccounts from './getLinkedAccounts';
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
    getLinkedAccounts,
    addLinkedAccount,
    addAddress,
    deleteLinkedAccount,
    getSellerById,
    searchAndCountProductType,
    history,
  });
