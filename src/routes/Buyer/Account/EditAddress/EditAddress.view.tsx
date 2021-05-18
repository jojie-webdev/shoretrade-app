import React from 'react';

import BuyerAddressForm from 'components/module/BuyerAddressForm';
import Loading from 'components/module/Loading';

import { EditAddresGeneratedProps } from './EditAddress.props';

const EditAddressView = (props: EditAddresGeneratedProps) => {
  if (!props.address) {
    return <Loading />;
  }

  return <BuyerAddressForm {...props} />;
};

export default EditAddressView;
