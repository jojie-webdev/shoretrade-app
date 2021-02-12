import React from 'react';

import { BoxContainerPublicProps } from './BoxContainer.props';
import { Container } from './BoxContainer.style';

//TODO: remove when all layouts are new designs (temporary container for new stuff)
const BoxContainerView = (props: BoxContainerPublicProps): JSX.Element => {
  return <Container>{props.children}</Container>;
};

export default React.memo(BoxContainerView);
