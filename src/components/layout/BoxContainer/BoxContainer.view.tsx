import React from 'react';

import { BoxContainerPublicProps } from './BoxContainer.props';
import { Container } from './BoxContainer.style';

const BoxContainerView = (props: BoxContainerPublicProps): JSX.Element => {
  return (
    <Container
      isPreview={props.isPreview}
      isCreatListingSuccess={props.isCreatListingSuccess}
    >
      {props.children}
    </Container>
  );
};

export default React.memo(BoxContainerView);
