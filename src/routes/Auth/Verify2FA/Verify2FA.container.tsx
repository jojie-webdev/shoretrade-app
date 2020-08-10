import React, { useReducer } from 'react';

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  loginActions,
  verifyActions,
  resendVerificationActions,
} from 'store/actions';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';

import Verify2FAView from './Verify2FA.view';

const Verify2FA = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const email = useSelector((state: Store) => state.login.request?.email) || '';

  const backToLogin = () => {
    history.goBack();
  };

  const pending = useSelector((state: Store) => state.verify.pending) || false;
  const isError =
    (useSelector((state: Store) => state.verify.error) || '').length > 0;

  const verify = (code: string) => {
    dispatch(verifyActions.request({ verify2Fa: code, email }));
  };

  const lastRequest = useSelector(
    (state: Store) => state.resendVerification.request?.lastRequest || null
  );

  const resendCode = () => {
    if (lastRequest) {
      const now = moment(new Date());
      const end = moment(lastRequest);
      const interval = moment.duration(now.diff(end)).asSeconds();
      if (interval > 15) {
        dispatch(resendVerificationActions.request());
      }
    } else {
      dispatch(resendVerificationActions.request());
    }
  };

  const generatedProps = {
    // generated props here
    verify,
    pending,
    backToLogin,
    resendCode,
    isError,
  };
  return <Verify2FAView {...generatedProps} />;
};

export default Verify2FA;
