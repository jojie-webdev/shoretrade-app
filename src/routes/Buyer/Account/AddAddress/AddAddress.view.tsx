import React from 'react';

// import { useTheme } from 'utils/Theme';
import BuyerAddressForm from 'components/module/BuyerAddressForm';

import { AddAddressGeneratedProps } from './AddAddress.props';
const AddAddressView = (props: AddAddressGeneratedProps) => {
  // const theme = useTheme();
  return <BuyerAddressForm {...props} />;
};

export default AddAddressView;
