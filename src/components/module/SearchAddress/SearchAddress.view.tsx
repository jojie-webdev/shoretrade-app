import React from 'react';

// import { useTheme } from 'utils/Theme';
import { SearchAddressProps } from './SearchAddress.props';
import { InputContainer } from './SearchAddress.style';

const SearchAddress = (props: SearchAddressProps): JSX.Element => {
  // const theme = useTheme();
  return <InputContainer />;
};

export default React.memo(SearchAddress);
