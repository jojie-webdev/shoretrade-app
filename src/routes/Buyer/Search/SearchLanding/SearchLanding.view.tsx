import React from 'react';

import Typography from 'components/base/Typography';
import Search from 'components/module/Search';
import { isEmpty } from 'ramda';
import reverse from 'ramda/es/reverse';

// import { useTheme } from 'utils/Theme';
import { SearchLandingGeneratedProps } from './SearchLanding.props';
import { Container, Content, SearchContainer } from './SearchLanding.style';

const SearchLandingView = (props: SearchLandingGeneratedProps) => {
  // const theme = useTheme();
  const {
    search,
    searchTerm,
    setSearchTerm,
    loading,
    results,
    onReset,
    recent,
    // addresses,
    // selectedAddress,
    // selectAddress,
    saveSearchHistory,
  } = props;

  const showRecentSearch = searchTerm.length === 0;
  const data = showRecentSearch ? reverse(recent) : results;

  return (
    <Container>
      <Content>
        <SearchContainer>
          <Search
            value={searchTerm}
            resetValue={() => setSearchTerm('')}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        {!isEmpty(data) && (
          <Typography variant="overline" color="shade6">
            {showRecentSearch ? 'Recent Searches' : 'Results'}
          </Typography>
        )}
      </Content>
    </Container>
  );
};

export default SearchLandingView;