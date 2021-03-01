import React, { useEffect, useState } from 'react';

import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAddressesActions,
  updateAddressActions,
  addAddressActions,
} from 'store/actions';
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
  const addresses =
    getAddress.data?.data.addresses.sort((a) => (a.default ? -1 : 1)) || [];
  const pending = getAddress.pending || false;
  const updateAddressResult = useSelector(
    (state: Store) => state.updateAddress
  );
  const addAddressResult = useSelector((state: Store) => state.addAddress);
  const [notificationMessage, setNotificationMessage] = useState('');

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

  useEffect(() => {
    const isUpdateLoading = updateAddressResult.pending;
    const updateClassification =
      updateAddressResult.data?.data?.address?.approved;
    if (
      !isUpdateLoading &&
      isUpdateLoading !== null &&
      updateClassification === 'DECLINED'
    ) {
      setNotificationMessage('Your address has been deleted successfully!');
    } else if (
      !isUpdateLoading &&
      isUpdateLoading !== null &&
      updateClassification !== 'DECLINED'
    ) {
      setNotificationMessage('Your address has been updated successfully!');
    }
  }, [updateAddressResult]);

  useEffect(() => {
    if (notificationMessage.length > 0) {
      dispatch(updateAddressActions.clear());
      dispatch(addAddressActions.clear());
    }
  }, [notificationMessage]);

  useEffect(() => {
    const isLoading = addAddressResult.pending;
    const addAddressData = addAddressResult.data;
    if (!isLoading && addAddressData) {
      setNotificationMessage('Your address has been successfully added!');
    }
  }, [addAddressResult]);

  // Mark:- Render
  const generatedProps: ShippingAddressesGeneratedProps = {
    addresses,
    pending,
    notificationMessage,
    onClickAddress,
    onClickAddAddress,
  };
  return <ShippingAddressesView {...generatedProps} />;
};

export default ShippingAddresses;
