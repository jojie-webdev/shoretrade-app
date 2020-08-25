import React, { useEffect, useState } from 'react';

import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { updateAddressActions } from 'store/actions';
import { PlaceData } from 'types/PlaceData';
import { GetAddressesResponseItem } from 'types/store/GetAddressesState';
import { Store } from 'types/store/Store';

import {
  QueryParams,
  EditAddressGeneratedProps,
  EditAddressForm,
} from './EditAddress.props';
import {
  addressToPlaceData,
  placeDataToUpdateAddressMeta,
} from './EditAddress.transform';
import EditAddressView from './EditAddress.view';
const EditAddress = (): JSX.Element => {
  // MARK:- Store
  const location = useLocation();
  const dispatch = useDispatch();
  const pending = useSelector(
    (state: Store) => state.updateAddress.pending || false
  );
  const addresses =
    useSelector((state: Store) => state.getAddresses.data?.data.addresses) ||
    [];

  // MARK:- States
  const [addressId, setAddressId] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [isDefault, setIsDefault] = useState<boolean | null>(null);

  // MARK:- Variables
  const currentAddress = addresses.find((a) => a.id === addressId);
  const address = currentAddress ? addressToPlaceData(currentAddress) : null;

  // MARK:- Methods
  const onClickSave = (values: EditAddressForm) => {
    const { unitNumber, address: addressStr } = values;

    const newCurrentAddress: GetAddressesResponseItem = {
      ...(currentAddress as GetAddressesResponseItem),
      unitNumber: unitNumber,
      default: isDefault || false,
    };

    const newAddress: PlaceData = {
      ...addressToPlaceData(newCurrentAddress),
      address: addressStr,
    };

    dispatch(
      updateAddressActions.request(
        placeDataToUpdateAddressMeta(
          newAddress,
          unitNumber,
          companyId,
          isDefault || false,
          addressId
        )
      )
    );
  };

  const toggleIsDefault = () => setIsDefault(!isDefault);

  // MARK:- Effects
  useEffect(() => {
    const { companyId, addressId } = queryString.parse(
      location.search
    ) as QueryParams;

    if (!companyId || !addressId) {
      dispatch(push(SELLER_ACCOUNT_ROUTES.LANDING));
    }

    setCompanyId(companyId);
    setAddressId(addressId);
  }, []);

  useEffect(() => {
    if (currentAddress && isDefault === null) {
      setIsDefault(currentAddress?.default);
      console.log(currentAddress.default);
    }
  }, [currentAddress]);

  // MARK:- Render
  const generatedProps: EditAddressGeneratedProps = {
    address,
    isDefault,
    onClickSave,
    pending,
    toggleIsDefault,
  };
  return <EditAddressView {...generatedProps} />;
};

export default EditAddress;
