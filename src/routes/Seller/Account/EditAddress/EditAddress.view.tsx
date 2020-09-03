import React from 'react';

// import { useTheme } from 'utils/Theme';
import LoadingView from 'components/module/Loading';
import SellerAddressForm from 'components/module/SellerAddressForm';

import { EditAddressGeneratedProps } from './EditAddress.props';

const EditAddressView = (props: EditAddressGeneratedProps) => {
  // const theme = useTheme();

  if (!props.address) {
    return <LoadingView></LoadingView>;
  }

  return <SellerAddressForm {...props} />;
};

export default EditAddressView;
