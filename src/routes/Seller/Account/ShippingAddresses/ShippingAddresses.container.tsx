import React, { useEffect, useState } from 'react';

import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAddressesActions } from 'store/actions';
import { Store } from 'types/store/Store';
import { useCompany } from 'utils/Hooks';

import { ShippingAddressesGeneratedProps } from './ShippingAddresses.props';
import ShippingAddressesView from './ShippingAddresses.view';

const ShippingAddresses = (): JSX.Element => {
  // Mark:- State / Stores
  const dispatch = useDispatch();
  const [companyId] = useCompany();
  const getAddress = useSelector((state: Store) => state.getAddresses);

  // Mark:- Variables
  const addresses = getAddress.data?.data.addresses || [];
  const pending = getAddress.pending || false;

  // Mark:- Methods
  const onClickAddress = (addressId: string) => {
    const route = `${SELLER_ACCOUNT_ROUTES.EDIT_ADDRESS}${qs.stringify(
      { companyId, addressId },
      { addQueryPrefix: true }
    )}`;
    dispatch(push(route));
  };

  const onClickAddAddress = () => {
    const route = `${SELLER_ACCOUNT_ROUTES.CREATE_ADDRESS}${qs.stringify(
      { companyId },
      { addQueryPrefix: true }
    )}`;

    dispatch(push(route));
  };

  // Mark:- Effects
  useEffect(() => {
    if (companyId !== '') {
      dispatch(getAddressesActions.request({ companyId }));
    }
  }, [companyId]);

  // Mark:- Render
  const generatedProps: ShippingAddressesGeneratedProps = {
    addresses,
    pending,
    onClickAddress,
    onClickAddAddress,
  };
  return <ShippingAddressesView {...generatedProps} />;
};

export default ShippingAddresses;
