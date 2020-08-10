import React from 'react';

// import { useTheme } from 'utils/Theme';

import { AccountGeneratedProps } from './Account.props';
import { Container } from './Account.style';

const AccountView = (props: AccountGeneratedProps) => {
  // const theme = useTheme();
  return (
    <Container>
      <h1>Account Screen</h1>
    </Container>
  );
};

export default AccountView;
