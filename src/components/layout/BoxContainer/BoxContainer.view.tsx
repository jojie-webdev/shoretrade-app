import React from 'react';

import { BoxContainerPublicProps } from './BoxContainer.props';
import { Container } from './BoxContainer.style';

//TODO: remove when all layouts are new designs in buyer
// temporary container for new stuff, seller has its own container in dashboard but full height
const BoxContainerView = (props: BoxContainerPublicProps): JSX.Element => {
  return <Container>{props.children}</Container>;
};

export default React.memo(BoxContainerView);
