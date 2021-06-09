import React from 'react';

import { Player } from '@lottiefiles/react-lottie-player';
import dark from 'res/lottie/Horizontal – Dark.json';
import light from 'res/lottie/Horizontal – Light.json';
import { useTheme } from 'utils/Theme';

import { SpinnerLogoProps } from './SpinnerLogo.props';

const SpinnerLogo = (props: SpinnerLogoProps): JSX.Element => {
  const { variant, style, ...playerProps } = props;
  const theme = useTheme();

  const src =
    variant === 'dark'
      ? dark
      : variant === 'light'
      ? light
      : theme.appType === 'seller'
      ? dark
      : light;

  return (
    <Player
      autoplay
      loop
      src={src}
      style={{ width: '100px', ...style }}
      {...playerProps}
    />
  );
};

export default React.memo(SpinnerLogo);
