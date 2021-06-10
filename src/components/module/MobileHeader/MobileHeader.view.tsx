import React from 'react';

import { useTheme } from 'utils/Theme';

import { MobileHeaderProps } from './MobileHeader.props';
import { Header } from './MobileHeader.style';

const MobileHeader = (props: MobileHeaderProps): JSX.Element => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';

  return (
    <Header color={isSeller ? 'noshade' : 'shade9'} style={props.style}>
      {props.children}
    </Header>
  );
};

export default React.memo(MobileHeader);
