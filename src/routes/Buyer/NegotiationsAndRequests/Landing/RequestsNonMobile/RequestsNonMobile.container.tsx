import React from 'react';

import {
  RequestsNonMobilePublicProps,
  RequestsNonMobilePrivateProps,
} from './RequestsNonMobile.props';
import RequestsNonMobileView from './RequestsNonMobile.view';

const RequestsNonMobile = (
  props: RequestsNonMobilePublicProps
): JSX.Element => {
  const generatedProps: RequestsNonMobilePrivateProps = {
    ...props,
  };

  return <RequestsNonMobileView {...generatedProps} />;
};

export default RequestsNonMobile;
