import React from 'react';

import { Player } from '@lottiefiles/react-lottie-player';

import { AnimatedSwordfishProps } from './../AnimatedSwordfish/AnimatedSwordfish.props';

const animatedSwordfish =
  'https://uploads-ssl.webflow.com/60223707cdaf015858445991/602c9757060ca90a7dcea38c_Swordfish.json';

const AnimatedSwordfish = (props: AnimatedSwordfishProps): JSX.Element => {
  const { style, ...playerProps } = props;

  return (
    <Player
      autoplay
      loop
      src={animatedSwordfish}
      style={style}
      {...playerProps}
    />
  );
};

export default React.memo(AnimatedSwordfish);
