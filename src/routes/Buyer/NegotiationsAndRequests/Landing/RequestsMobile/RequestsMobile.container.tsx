import React from 'react';

import {
  RequestsMobilePublicProps,
  RequestsMobilePrivateProps,
} from './RequestsMobile.props';
import RequestsMobileView from './RequestsMobile.view';

const RequestsMobile = (props: RequestsMobilePublicProps): JSX.Element => {
  const generatedProps: RequestsMobilePrivateProps = {
    ...props,
  };

  return <RequestsMobileView {...generatedProps} />;
};

export default RequestsMobile;
