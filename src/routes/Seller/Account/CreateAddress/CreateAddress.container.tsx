import React, { useState } from 'react';

import SellerAddressForm from 'components/module/SellerAddressForm';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addAddressActions } from 'store/actions';
import { PlaceData } from 'types/PlaceData';
import { Store } from 'types/store/Store';
import { useCompany } from 'utils/Hooks';

import { CreateAddressGeneratedProps } from './CreateAddress.props';
import { placeDataToAddAddressMeta } from './CreateAddress.transform';
import CreateAddressView from './CreateAddress.view';

const CreateAddress = (): JSX.Element => {
  // MARK:- Store / Hooks
  const [companyId] = useCompany();
  const dispatch = useDispatch();
  const history = useHistory();
  const pending = useSelector(
    (store: Store) => store.addAddress.pending || false
  );
  const isSuccess = useSelector(
    (store: Store) => store.addAddress.data?.status === 200
  );

  // MARK:- States / Variables
  const [submitted, setIsSubmitted] = useState(false);

  const [unitNumber, setUnitNumber] = useState('');
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const [address, setAddress] = useState<PlaceData | null>(null);

  // MARK:- Methods
  const onClickSave = () => {
    if (address) {
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

  // MARK:- Render
  const generatedProps: CreateAddressGeneratedProps = {
    type: 'CREATE',
    address,
    isDefault,
    pending,
    isSuccess: isSuccess && submitted,
    unitNumber,
    onClickSave,
    toggleIsDefault,
    setAddress,
    setUnitNumber,
  };

  return <SellerAddressForm {...generatedProps} />;
};

export default CreateAddress;
