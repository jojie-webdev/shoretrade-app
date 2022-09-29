import React, { useState } from 'react';

import BuyerAddressForm from 'components/module/BuyerAddressForm';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addAddressActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { PlaceData } from 'types/PlaceData';
import { GetAddressesResponseItem } from 'types/store/GetAddressesState';
import { Store } from 'types/store/Store';
import useLocalStorage from 'utils/Hooks/useLocalStorage';

import { AddAddressGeneratedProps } from './AddAddress.props';
import { placeDataToAddAddressMeta } from './AddAddress.transform';

const AddAddress = (): JSX.Element => {
  // MARK:- States / Variables
  const dispatch = useDispatch();
  const history = useHistory();
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
  const [address, setAddress] = useState<PlaceData | null>(null);
  const [previousDefaultAddress, setPreviousDefaultAddress] = useLocalStorage(
    'previousDefaultAddress',
    {} as GetAddressesResponseItem
  );
  const addresses =
    useSelector((state: Store) => state.getAddresses.data?.data.addresses) ||
    [];
  const currentDefaultAddress = addresses.find(
    (i) => i.approved === 'APPROVED' && i.default
  );

  // MARK:- Methods
  const onClickSave = () => {
    if (address) {
      if (currentDefaultAddress && isDefault) {
        setPreviousDefaultAddress(currentDefaultAddress);
      }
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
      history.goBack();
    }
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
  return <BuyerAddressForm {...generatedProps} />;
};

export default AddAddress;
