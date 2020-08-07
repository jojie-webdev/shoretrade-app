import React from 'react';

// import { useTheme } from 'utils/Theme';
import { BankDetailsGeneratedProps } from './BankDetails.props';
import { Container } from './BankDetails.style';

const BankDetailsView = (props: BankDetailsGeneratedProps) => {
  // const theme = useTheme();
  return (
    <Container>
      <h1>BankDetails Screen</h1>
    </Container>
  );
};

export default BankDetailsView;