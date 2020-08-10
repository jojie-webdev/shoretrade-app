import React from 'react';

// import { useTheme } from 'utils/Theme';
import InnerRouteHeader from 'components/module/InnerRouteHeader';

import { ChangePasswordGeneratedProps } from './ChangePassword.props';
import { Wrapper } from './ChangePassword.style';

const ChangePasswordView = (props: ChangePasswordGeneratedProps) => {
  // const theme = useTheme();
  return (
    <Wrapper>
      <InnerRouteHeader title="Change Password" />
      <h1>ChangePassword Screen</h1>
    </Wrapper>
  );
};

export default ChangePasswordView;
