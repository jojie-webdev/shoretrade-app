import React from 'react';

// import { useTheme } from 'utils/Theme';
import LoadingView from 'components/module/Loading';
import SellerAddressForm from 'components/module/SellerAddressForm';

import { EditAddressGeneratedProps } from './EditAddress.props';

const EditAddressView = (props: EditAddressGeneratedProps) => {
  // const theme = useTheme();
  const { address, updateAddressSuccess, ...formProps } = props;

  if (!address) {
    return <LoadingView></LoadingView>;
  }

  return (
    <SellerAddressForm
      {...formProps}
      isSuccess={updateAddressSuccess}
      address={address}
    />
  );
};

export default EditAddressView;
