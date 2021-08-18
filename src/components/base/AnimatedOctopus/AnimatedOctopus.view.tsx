import React from 'react';

import { Player } from '@lottiefiles/react-lottie-player';

import { AnimatedOctopusProps } from './AnimatedOctopus.props';

const animatedOctopus =
  'https://uploads-ssl.webflow.com/60223707cdaf015858445991/602c9b78d6c456842fd41c35_Octopus.json';

const AnimatedOctopus = (props: AnimatedOctopusProps): JSX.Element => {
  const { style, ...playerProps } = props;

  return (
    <Player
      autoplay
      loop
      src={animatedOctopus}
      style={style}
      {...playerProps}
    />
  );
};

export default React.memo(AnimatedOctopus);
