import React, { useEffect } from 'react';

import { push } from 'connected-react-router';
import { BUYER_ACCOUNT_ROUTES } from 'consts/routes';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAddressesActions } from 'store/actions';
import { GetAddressOptions, GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import AccountDeliveryView from './Address.view';
const AccountDelivery = (): JSX.Element => {
  // Mark:- Variables
  const history = useHistory();
  const dispatch = useDispatch();
  const currentCompany = GetDefaultCompany();
  const companyId = currentCompany?.id || '';
  const getAddress = useSelector((state: Store) => state.getAddresses);
  const addresses = getAddress.data?.data.addresses || [];
  const pending = getAddress.pending || false;

  // Mark:- Methods
  const getAddresses = () => {
    if (companyId) {
      dispatch(getAddressesActions.request({ companyId }));
    }
  };

  const goToEditAddress = (addressId: string) => {
    history.push({
      pathname: `${BUYER_ACCOUNT_ROUTES.EDIT_ADDRESS(addressId)}`,
      state: {
        addressId,
        companyId,
      },
    });
  };

  const goToAddAddress = () => {
    history.push(`${BUYER_ACCOUNT_ROUTES.ADD_ADDRESS}`);
  };

  // Mark:- Effect
  useEffect(() => {
    getAddresses();
  }, [companyId]);

  const generatedProps = {
    addresses,
    pending,
    goToEditAddress,
    goToAddAddress,
  };
  return <AccountDeliveryView {...generatedProps} />;
};

export default AccountDelivery;
