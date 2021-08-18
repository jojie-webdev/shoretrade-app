import React from 'react';

import { Player } from '@lottiefiles/react-lottie-player';

import { AnimatedAnchorProps } from './AnimatedAnchor.props';

const animatedAnchor =
  'https://uploads-ssl.webflow.com/60223707cdaf015858445991/602c9b785af17a56c2bbdb1b_Anchor.json';

const AnimatedAnchor = (props: AnimatedAnchorProps): JSX.Element => {
  const { style, ...playerProps } = props;

  return (
    <Player autoplay loop src={animatedAnchor} style={style} {...playerProps} />
  );
};

export default React.memo(AnimatedAnchor);
