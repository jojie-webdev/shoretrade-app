import React from 'react';

import {
  NegotiationNonMobilePublicProps,
  NegotiationNonMobilePrivateProps,
} from './NegotiationNonMobile.props';
import NegotiationNonMobileView from './NegotiationNonMobile.view';

const NegotiationNonMobile = (
  props: NegotiationNonMobilePublicProps
): JSX.Element => {
  const generatedProps: NegotiationNonMobilePrivateProps = {
    ...props,
  };

  return <NegotiationNonMobileView {...generatedProps} />;
};

export default NegotiationNonMobile;
