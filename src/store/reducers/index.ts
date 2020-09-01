import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';

import auth from './auth';
import changePassword from './changePassword';
import currentAddress from './currentAddress';
import forgotPassword from './forgotPassword';
import getAddresses from './getAddresses';
import getAllListings from './getAllListings';
import getBuyerHomepage from './getBuyerHomepage';
import getSellerOrdersDelivered from './getSellerOrdersDelivered';
import getSellerOrdersPlaced from './getSellerOrdersPlaced';
import getSellerOrdersTransit from './getSellerOrdersTransit';
import getUser from './getUser';
import login from './login';
import register from './register';
import resendVerification from './resendVerification';
import updateAddress from './updateAddress';
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
    changePassword,
    currentAddress,
    getBuyerHomepage,
  });
