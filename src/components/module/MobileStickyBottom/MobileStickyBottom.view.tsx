import React from 'react';

import { BREAKPOINTS } from 'consts/breakpoints';
import { Visible, setConfiguration } from 'react-grid-system';

// import { useTheme } from 'utils/Theme';
import { MobileStickyBottomProps } from './MobileStickyBottom.props';
import { Container } from './MobileStickyBottom.style';

setConfiguration({ breakpoints: [567, 768, 992, 1200, 1600] });

const MobileStickyBottom = (props: MobileStickyBottomProps): JSX.Element => {
  const { children, withBackground = false } = props;
  return (
    <Visible xs>
      <Container withBackground={withBackground}>{children}</Container>
    </Visible>
  );
};

export default React.memo(MobileStickyBottom);
