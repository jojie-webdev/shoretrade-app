import React from 'react';

import SpinnerLogo from 'components/base/SpinnerLogo/SpinnerLogo.view';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';

import { LoadingOverlayProps } from './LoadingOverlay.props';
import { Container, Label } from './LoadingOverlay.style';

const LoadingOverlay = (props: LoadingOverlayProps): JSX.Element => {
  const { label = 'Loading...', spinnerLogoProps } = props;
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <Container>
      <SpinnerLogo
        style={!isSmallScreen ? { width: '200px' } : { width: '100px' }}
        {...spinnerLogoProps}
      />
      <Label variant={isSmallScreen ? 'label' : 'title6'} color="noshade">
        {label}
      </Label>
    </Container>
  );
};

export default React.memo(LoadingOverlay);
