import React from 'react';

import { Visible } from 'react-grid-system';

// import { useTheme } from 'utils/Theme';
import { MobileStickyBottomProps } from './MobileStickyBottom.props';
import { Container } from './MobileStickyBottom.style';

const MobileStickyBottom = (props: MobileStickyBottomProps): JSX.Element => {
  const { children } = props;
  return (
    <Visible xs sm>
      <Container>{children}</Container>
    </Visible>
  );
};

export default React.memo(MobileStickyBottom);
