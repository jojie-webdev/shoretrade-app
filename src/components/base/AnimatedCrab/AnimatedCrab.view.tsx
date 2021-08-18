import React from 'react';

import { Player } from '@lottiefiles/react-lottie-player';

import { AnimatedCrabProps } from './AnimatedCrab.props';

const animatedCrab =
  'https://uploads-ssl.webflow.com/60223707cdaf015858445991/602c9b79441981683d7ab620_Crab.json';

const AnimatedCrab = (props: AnimatedCrabProps): JSX.Element => {
  const { style, ...playerProps } = props;

  return (
    <Player autoplay loop src={animatedCrab} style={style} {...playerProps} />
  );
};

export default React.memo(AnimatedCrab);
