import React from 'react';

import { SearchLandingGeneratedProps } from './SearchLanding.props';
import SearchLandingView from './SearchLanding.view';

const SearchLanding = (): JSX.Element => {
  const generatedProps: SearchLandingGeneratedProps = {};

  return <SearchLandingView {...generatedProps} />;
};

export default SearchLanding;
