import React, { useEffect, useState } from 'react';

import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import qs from 'qs';
import { isEmpty } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getAddressesActions, updateAddressActions } from 'store/actions';
import { PlaceData } from 'types/PlaceData';
import { Store } from 'types/store/Store';

import { QueryParams, EditAddressGeneratedProps } from './EditAddress.props';
import {
  addressToPlaceData,
  placeDataToUpdateAddressMeta,
} from './EditAddress.transform';
import EditAddressView from './EditAddress.view';

const EditAddress = (): JSX.Element => {
  // MARK:- Store
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const pending = useSelector(
    (state: Store) => state.updateAddress.pending || false
  );
  const addresses =
    useSelector((state: Store) => state.getAddresses.data?.data.addresses) ||
    [];
  const updateAddress = useSelector((state: Store) => state.updateAddress);

  // MARK:- States / Variables
  const [submitted, setIsSubmitted] = useState(false);
  const [addressId, setAddressId] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [isDefault, setIsDefault] = useState<boolean | null>(null);
  const currentAddress = addresses.find((a) => a.id === addressId);
  const initialAddress = currentAddress
    ? addressToPlaceData(currentAddress)
    : null;
  const [address, setAddress] = useState<PlaceData | null>(initialAddress);

  // MARK:- Methods
  const onClickSave = () => {
    if (address) {
      dispatch(
        updateAddressActions.request(
          placeDataToUpdateAddressMeta(
            address as PlaceData,
            unitNumber,
            companyId,
            isDefault || false,
            addressId
          )
        )
      );
      setIsSubmitted(true);
      history.goBack();
    }
  };

  const onDeleteAddress = () => {
    if (address) {
      const approved = 'DECLINED';
      dispatch(
        updateAddressActions.request(
          placeDataToUpdateAddressMeta(
            address as PlaceData,
            unitNumber,
            companyId,
            isDefault || false,
            addressId,
            approved
          )
        )
      );
      setIsSubmitted(true);
      history.goBack();
    }
  };
  const toggleIsDefault = () => setIsDefault(!isDefault);

  // MARK:- Effects
  useEffect(() => {
    const { companyId, addressId } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    }) as QueryParams;

    if (!companyId || !addressId) {
      dispatch(push(SELLER_ACCOUNT_ROUTES.LANDING));
    }

    setCompanyId(companyId);
    setAddressId(addressId);
  }, []);

  useEffect(() => {
    if (isEmpty(addresses) && companyId) {
      dispatch(getAddressesActions.request({ companyId }));
    }
  }, [companyId, addresses]);

  useEffect(() => {
    if (currentAddress && isDefault === null) {
      setIsDefault(currentAddress?.default);
    }
  }, [currentAddress]);

  useEffect(() => {
    if (currentAddress) {
      setAddress(addressToPlaceData(currentAddress));
      if (currentAddress.unitNumber) {
        setUnitNumber(currentAddress.unitNumber);
      }

      if (currentAddress.default) {
        setIsDefault(currentAddress.default);
      }
    }
  }, [currentAddress]);

  // MARK:- Watchers

  // MARK:- Render
  const generatedProps: EditAddressGeneratedProps = {
    companyId,
    type: 'EDIT',
    address: address as PlaceData,
    isDefault,
    onClickSave,
    pending,
    toggleIsDefault,
    setAddress,
    unitNumber,
    setUnitNumber,
    onDeleteAddress,
    isSuccess: updateAddress.data?.status === 200 && submitted,
  };
  return <EditAddressView {...generatedProps} />;
};

export default EditAddress;
