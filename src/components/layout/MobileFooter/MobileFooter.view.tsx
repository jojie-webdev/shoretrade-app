import React from 'react';

import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';

import { MobileFooterPublicProps } from './MobileFooter.props';
import { Container } from './MobileFooter.style';

const MobileFooterView = (props: MobileFooterPublicProps): JSX.Element => {
  const { children } = props;
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  if (!isSmallScreen) return <></>;

  return <Container className="mobile-footer">{children}</Container>;
};

export default React.memo(MobileFooterView);
