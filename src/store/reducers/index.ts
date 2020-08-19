import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';

import auth from './auth';
import forgotPassword from './forgotPassword';
import getUser from './getUser';
import login from './login';
import resendVerification from './resendVerification';
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
  });
