import React from 'react';

import { isIOS } from 'react-device-detect';

import { BoxContainerPublicProps } from './BoxContainer.props';
import { Container } from './BoxContainer.style';

const BoxContainerView = (props: BoxContainerPublicProps): JSX.Element => {
  return (
    <Container
      isIOS={isIOS}
      isPreview={props.isPreview}
      isCreatListingSuccess={props.isCreatListingSuccess}
    >
      {props.children}
    </Container>
  );
};

export default React.memo(BoxContainerView);
