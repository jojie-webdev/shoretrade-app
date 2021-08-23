import React from 'react';

import { Player } from '@lottiefiles/react-lottie-player';

import { AnimationPlayerProps } from './AnimationPlayer.props';
import { Container } from './AnimationPlayer.style';

const AnimationPlayer = (props: AnimationPlayerProps): JSX.Element => {
  const { src, style, ...playerProps } = props;

  return (
    <Container id="---CONTAINER" style={style}>
      <Player
        id="---Player"
        autoplay
        loop
        src={src}
        style={style}
        {...playerProps}
      />
    </Container>
  );
};

export default React.memo(AnimationPlayer);
