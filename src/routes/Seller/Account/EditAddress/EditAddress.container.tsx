import React, { useEffect, useState } from 'react';

import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { GetAddressesResponseItem } from 'types/store/GetAddressesState';
import { Store } from 'types/store/Store';

import { QueryParams, EditAddressGeneratedProps } from './EditAddress.props';
import { addressToPlaceData } from './EditAddress.transform';
import EditAddressView from './EditAddress.view';
const EditAddress = (): JSX.Element => {
  // MARK:- Store / States
  const location = useLocation();
  const dispatch = useDispatch();
  const addresses =
    useSelector((state: Store) => state.getAddresses.data?.data.addresses) ||
    [];
  const [addressId, setAddressId] = useState('');

  // MARK:- Variables
  const currentAddress = addresses.find((a) => a.id === addressId);
  const address = currentAddress ? addressToPlaceData(currentAddress) : null;

  // MARK:- Effects
  useEffect(() => {
    const { companyId, addressId } = queryString.parse(
      location.search
    ) as QueryParams;

    if (!companyId || !addressId) {
      dispatch(push(SELLER_ACCOUNT_ROUTES.LANDING));
    }

    setAddressId(addressId);
  }, []);

  // MARK:- Render
  const generatedProps: EditAddressGeneratedProps = {
    address,
    isDefault: currentAddress?.default || false,
  };
  return <EditAddressView {...generatedProps} />;
};

export default EditAddress;
