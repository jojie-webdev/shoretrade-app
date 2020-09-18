import React, { useReducer, useState } from 'react';

import { push } from 'connected-react-router';
import { SELLER_ROUTES, BUYER_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { registerActions } from 'store/actions';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';
import { useTheme } from 'utils/Theme';

import { PAYMENT_METHOD_OPTIONS } from './Register.constants';
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
      callingCode: '',
      // business
      businessName: '',
      abn: '',
      address: null,
      businessLogo: null,
      // bank
      accountName: '',
      bsb: '',
      accountNumber: '',
      selectedPaymentMethod: '',
      estimatedAnnualRevenue: '',
      selectedMarketSector: '',
      tncAgreement: false,
    }
  );

  const isApplicationForLineCredit =
    !isSeller &&
    registrationDetails.selectedPaymentMethod ===
      PAYMENT_METHOD_OPTIONS[0].value;

  const registerSeller = (details: RegistrationDetails) => {
    if (details.address) {
      dispatch(
        registerActions.request({
          firstName: details.firstName,
          lastName: details.lastName,
          email: details.email,
          password: details.password,
          passwordConfirm: details.passwordConfirm,
          mobile: `+${details.callingCode || '61'}${details.mobile}`,
          company: {
            businessName: details.businessName,
            abn: details.abn,
          },
          address: details.address,
          businessLogo: details.businessLogo,
          bankAccounts: {
            accountName: details.accountName,
            bsb: details.bsb,
            accountNumber: details.accountNumber,
          },
          userGroup: 'seller',
        })
      );
    }
  };

  const registerBuyer = (details: RegistrationDetails) => {
    console.log('REGISTER BUYER EVENT', details);
  };

  const register = (details: RegistrationDetails) => {
    if (isSeller) {
      registerSeller(details);
    } else {
      registerBuyer(details);
    }
  };

  const isPending =
    useSelector((state: Store) => state.register.pending) || false;
  const isSuccess =
    useSelector((state: Store) => (state.register.data?.status || 0) === 200) ||
    false;

  const generatedProps = {
    // generated props here
    backToLogin,
    registrationDetails,
    updateRegistrationDetails,
    register,
    isPending,
    isSuccess,
    isApplicationForLineCredit,
  };
  return <RegisterView {...generatedProps} />;
};

export default Register;
