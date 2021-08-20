import React from 'react';

import { Player } from '@lottiefiles/react-lottie-player';

import { AnimationPlayerProps } from './AnimationPlayer.props';
import { Container } from './AnimationPlayer.style';

const AnimationPlayer = (props: AnimationPlayerProps): JSX.Element => {
  const { image, style, ...playerProps } = props;

  return (
    <Container>
      <Player autoplay loop src={image} style={style} {...playerProps} />
    </Container>
  );
};

export default React.memo(AnimationPlayer);
