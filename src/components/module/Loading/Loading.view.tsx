import React from 'react';

import SpinnerLogo from 'components/base/SpinnerLogo';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import { LoadingProps } from './Loading.props';
import { Container, Label } from './Loading.style';

const Loading = (props: LoadingProps): JSX.Element => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const { label = 'Loading...', color, spinnerLogoProps } = props;
  const defaultColor = isSeller ? 'shade2' : 'shade6';
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <Container>
      <SpinnerLogo
        {...spinnerLogoProps}
        style={!isSmallScreen ? { width: '200px' } : { width: '100px' }}
      />
      <Label
        variant={isSmallScreen ? 'label' : 'title6'}
        color={color || defaultColor}
      >
        {label}
      </Label>
    </Container>
  );
};

export default React.memo(Loading);
