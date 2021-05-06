import React from 'react';

import { Visible } from 'react-grid-system';

// import { useTheme } from 'utils/Theme';
import { MobileStickyBottomProps } from './MobileStickyBottom.props';
import { Container } from './MobileStickyBottom.style';

const MobileStickyBottom = (props: MobileStickyBottomProps): JSX.Element => {
  const { children, withBackground = false } = props;
  return (
    <Visible xs sm>
      <Container withBackground={withBackground}>{children}</Container>
    </Visible>
  );
};

export default React.memo(MobileStickyBottom);
