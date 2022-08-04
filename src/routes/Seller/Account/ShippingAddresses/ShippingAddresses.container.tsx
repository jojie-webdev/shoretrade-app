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
import { GetDefaultCompany } from 'store/selectors/buyer/company';
import { Store } from 'types/store/Store';
import { useCompany } from 'utils/Hooks';

import { ShippingAddressesGeneratedProps } from './ShippingAddresses.props';
import ShippingAddressesView from './ShippingAddresses.view';

const ShippingAddresses = (): JSX.Element => {
  // Mark:- State / Stores
  const dispatch = useDispatch();
  const [companyId] = useCompany();
  const getAddress = useSelector((state: Store) => state.getAddresses);
  const defaultCompany = GetDefaultCompany();

  // Mark:- Variables
  const addresses =
    getAddress.data?.data.addresses.sort((a) => (a.default ? -1 : 1)) || [];
  const pending = getAddress.pending || false;
  const updateAddressResult = useSelector(
    (state: Store) => state.updateAddress
  );
  const addAddressResult = useSelector((state: Store) => state.addAddress);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const user = useSelector((state: Store) => state.getUser.data?.data.user);
  const companyRelationship =
    (user &&
      user.companies.find((company) => company.id === defaultCompany?.id)
        ?.relationship) ||
    '';

  // Mark:- Methods
  const onClickAddress = (addressId: string) => {
    const route = `${SELLER_ACCOUNT_ROUTES.EDIT_ADDRESS}${qs.stringify(
      { companyId, addressId },
      { addQueryPrefix: true }
    )}`;
    dispatch(push(route));
  };

  const onClickAddAddress = () => {
    if (companyRelationship === 'SECONDARY') {
      // Block
      setErrorMessage('Only the Primary Account Holder can add a new address');
    } else {
      const route = `${SELLER_ACCOUNT_ROUTES.CREATE_ADDRESS}${qs.stringify(
        { companyId },
        { addQueryPrefix: true }
      )}`;

      dispatch(push(route));
    }
  };

  // Mark:- Effects
  useEffect(() => {
    if (companyId !== '') {
      dispatch(getAddressesActions.request({ companyId }));
    }
    // eslint-disable-next-line
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
    // eslint-disable-next-line
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
    errorMessage,
    onClickAddress,
    onClickAddAddress,
    companyRelationship,
  };
  return <ShippingAddressesView {...generatedProps} />;
};

export default ShippingAddresses;
