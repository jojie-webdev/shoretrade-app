import React from 'react';

import PaginateList from 'components/base/PaginateList';
import { Octopus } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import EmptyState from 'components/module/EmptyState';
import Search from 'components/module/Search';
import SearchAddressView from 'components/module/SearchAddress';
import { BUYER_ROUTES } from 'consts';
import { isEmpty } from 'ramda';
import reverse from 'ramda/es/reverse';
import { useHistory } from 'react-router-dom';

// import { useTheme } from 'utils/Theme';
import { SearchLandingGeneratedProps } from './SearchLanding.props';
import {
  Container,
  Content,
  SearchContainer,
  ListContainer,
  ListItemInteraction,
} from './SearchLanding.style';

const SearchLandingView = (props: SearchLandingGeneratedProps) => {
  // const theme = useTheme();
  const history = useHistory();
  const {
    search,
    searchTerm,
    setSearchTerm,
    loading,
    results,
    onReset,
    recent,
    saveSearchHistory,
  } = props;

  const showRecentSearch = searchTerm.length === 0;
  const data = showRecentSearch ? reverse(recent) : results;

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
