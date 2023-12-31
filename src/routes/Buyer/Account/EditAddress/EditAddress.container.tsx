import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { updateAddressActions } from 'store/actions';
import { PlaceData } from 'types/PlaceData';
import { Store } from 'types/store/Store';

import { EditAddresGeneratedProps, QueryParams } from './EditAddress.props';
import {
  addressToPlaceData,
  placeDataToUpdateAddressMeta,
} from './EditAddress.transform';
import EditAddressView from './EditAddress.view';

const EditAddress = (): JSX.Element => {
  // MARK:- Variables
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const { companyId, addressId } = location.state as QueryParams;

  const pending = useSelector(
    (state: Store) => state.updateAddress.pending || false
  );
  const addresses =
    useSelector((state: Store) => state.getAddresses.data?.data.addresses) ||
    [];
  const updateAddress = useSelector((state: Store) => state.updateAddress);

  const [submitted, setIsSubmitted] = useState(false);
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
    if (currentAddress && isDefault === null) {
      setIsDefault(currentAddress?.default);
    }
    // eslint-disable-next-line
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

  const generatedProps: EditAddresGeneratedProps = {
    // generated props here
    type: 'EDIT',
    address: address as PlaceData,
    isDefault,
    onClickSave,
    onDeleteAddress,
    pending,
    toggleIsDefault,
    setAddress,
    unitNumber,
    setUnitNumber,
    isSuccess: updateAddress.data?.status === 200 && submitted,
  };
  return <EditAddressView {...generatedProps} />;
};

export default EditAddress;
