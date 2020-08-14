import React, { useReducer } from 'react';

import { push } from 'connected-react-router';
import { SELLER_ROUTES, BUYER_ROUTES } from 'consts';
import { useDispatch } from 'react-redux';
import { createUpdateReducer } from 'utils/Hooks';
import { useTheme } from 'utils/Theme';

import { RegistrationDetails } from './Register.props';
import RegisterView from './Register.view';

const Register = (): JSX.Element => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const backToLogin = () => {
    dispatch(push(isSeller ? SELLER_ROUTES.LOGIN : BUYER_ROUTES.LOGIN));
  };

  const [registrationDetails, updateRegistrationDetails] = useReducer(
    createUpdateReducer<RegistrationDetails>(),
    {
      // user
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      mobile: '',
      // business
      businessName: '',
      abn: '',
      // bank
      accountName: '',
      bsb: '',
      accountNumber: '',
      tncAgreement: false,
    }
  );

  const generatedProps = {
    // generated props here
    backToLogin,
    registrationDetails,
    updateRegistrationDetails,
  };
  return <RegisterView {...generatedProps} />;
};

export default Register;
