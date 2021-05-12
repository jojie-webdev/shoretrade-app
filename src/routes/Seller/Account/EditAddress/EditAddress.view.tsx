import React from 'react';

import LoadingView from 'components/module/Loading';
import SellerAddressForm from 'components/module/SellerAddressForm';

import { EditAddressGeneratedProps } from './EditAddress.props';

const EditAddressView = (props: EditAddressGeneratedProps) => {
  if (!props.address) {
    return <LoadingView />;
  }

  return <SellerAddressForm {...props} />;
};

export default EditAddressView;
