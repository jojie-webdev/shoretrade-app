import React, { useEffect, useState } from 'react';

import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAddressesActions } from 'store/actions';
import { Store } from 'types/store/Store';

import {
  ShippingAddressesGeneratedProps,
  QueryParams,
} from './ShippingAddresses.props';
import ShippingAddressesView from './ShippingAddresses.view';

const ShippingAddresses = (): JSX.Element => {
  // Mark:- State / Stores
  const dispatch = useDispatch();
  const location = useLocation();
  const [companyId, setCompanyId] = useState('');
  const getAddress = useSelector((state: Store) => state.getAddresses);

  // Mark:- Variables
  const addresses = getAddress.data?.data.addresses || [];
  const pending = getAddress.pending || false;

  // Mark:- Methods

  const onClickAddress = (addressId: string) => {
    const route = `${SELLER_ACCOUNT_ROUTES.EDIT_ADDRESS}?addressId=${addressId}&companyId=${companyId}`;
    dispatch(push(route));
  };

  // Mark:- Effects
  useEffect(() => {
    const { companyId } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    }) as QueryParams;

    if (!companyId) {
      dispatch(push(SELLER_ACCOUNT_ROUTES.LANDING));
    }
    setCompanyId(companyId);
  }, []);

  useEffect(() => {
    if (companyId !== '') {
      dispatch(getAddressesActions.request({ companyId }));
    }
  }, [companyId]);

  console.log(addresses);

  // Mark:- Render
  const generatedProps: ShippingAddressesGeneratedProps = {
    addresses,
    pending,
    onClickAddress,
  };
  return <ShippingAddressesView {...generatedProps} />;
};

export default ShippingAddresses;
