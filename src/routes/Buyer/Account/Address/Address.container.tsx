import React, { useEffect, useState } from 'react';

import { BUYER_ACCOUNT_ROUTES } from 'consts/routes';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  getAddressesActions,
  updateAddressActions,
  addAddressActions,
} from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
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
  const [notificationMessage, setNotifficationMessage] = useState('');
  const updateAdrressResult = useSelector(
    (state: Store) => state.updateAddress
  );
  const addAddressResult = useSelector((state: Store) => state.addAddress);

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

  useEffect(() => {
    const isUpdateLoading = updateAdrressResult.pending;
    const updateClassification =
      updateAdrressResult.data?.data?.address?.approved;
    if (
      !isUpdateLoading &&
      isUpdateLoading !== null &&
      updateClassification === 'DECLINED'
    ) {
      setNotifficationMessage('Your address has been deleted successfully!');
    } else if (
      !isUpdateLoading &&
      isUpdateLoading !== null &&
      updateClassification !== 'DECLINED'
    ) {
      setNotifficationMessage('Your address has been updated successfully!');
    }
  }, [updateAdrressResult]);

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
      setNotifficationMessage('Your address has been successfully added!');
    }
  }, [addAddressResult]);

  const generatedProps = {
    notificationMessage,
    addresses,
    pending,
    goToEditAddress,
    goToAddAddress,
  };
  return <AccountDeliveryView {...generatedProps} />;
};

export default AccountDelivery;
