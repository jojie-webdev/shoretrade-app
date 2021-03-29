import React from 'react';

import SearchAddressView from 'components/module/SearchAddress';

import { SearchLandingGeneratedProps } from './SearchLanding.props';
import { Container, Content, SearchContainer } from './SearchLanding.style';

const SearchLandingView = (props: SearchLandingGeneratedProps) => {
  return (
    <Container>
      <Content>
        <SearchContainer>
          <SearchAddressView />
        </SearchContainer>
      </Content>
    </Container>
  );
};

export default SearchLandingView;
