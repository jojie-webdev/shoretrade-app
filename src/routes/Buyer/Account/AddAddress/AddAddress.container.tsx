import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addAddressActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { PlaceData } from 'types/PlaceData';
import { Store } from 'types/store/Store';

import { AddAddressGeneratedProps } from './AddAddress.props';
import { placeDataToAddAddressMeta } from './AddAddress.transform';
import AddAddressView from './AddAddress.view';

const AddAddress = (): JSX.Element => {
  // MARK:- States / Variables
  const dispatch = useDispatch();
  const currentCompany = GetDefaultCompany();
  const companyId = currentCompany?.id || '';
  const pending = useSelector(
    (state: Store) => state.addAddress.pending || false
  );
  const isSuccess = useSelector(
    (state: Store) => state.addAddress.data?.status === 200
  );

  const [submitted, setIsSubmitted] = useState(false);
  const [unitNumber, setUnitNumber] = useState('');
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const [address, setAddress] = useState<PlaceData>({
    address: '',
    coordinates: {
      lat: null,
      lng: null,
    },
    unitNumber: '',
    level: '',
    streetNumber: '',
    route: '',
    locality: '',
    administrativeAreaLevel1: '',
    postcode: '',
    countryCode: '',
  });

  // MARK:- Methods
  const onClickSave = () => {
    dispatch(
      addAddressActions.request(
        placeDataToAddAddressMeta(
          address as PlaceData,
          unitNumber,
          companyId,
          isDefault
        )
      )
    );
    setIsSubmitted(true);
  };

  const toggleIsDefault = () => setIsDefault(!isDefault);
  const generatedProps: AddAddressGeneratedProps = {
    type: 'CREATE',
    address: address as PlaceData,
    isDefault,
    pending,
    isSuccess: isSuccess && submitted,
    unitNumber,
    onClickSave,
    toggleIsDefault,
    setAddress,
    setUnitNumber,
  };
  return <AddAddressView {...generatedProps} />;
};

export default AddAddress;
