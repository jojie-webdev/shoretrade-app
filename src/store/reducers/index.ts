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
import login from './login';
import register from './register';
import resendVerification from './resendVerification';
import updateAddress from './updateAddress';
import updateBankDetails from './updateBankDetails';
import updateUser from './updateUser';
import verify from './verify';

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
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
  });
