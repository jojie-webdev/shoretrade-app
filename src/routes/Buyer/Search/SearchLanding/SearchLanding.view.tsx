import React from 'react';

import PaginateList from 'components/base/PaginateList';
import { Octopus } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import EmptyState from 'components/module/EmptyState';
import Search from 'components/module/Search';
import { isEmpty } from 'ramda';
import reverse from 'ramda/es/reverse';

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
            resetValue={onReset}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        {!isEmpty(data) && (
          <Typography variant="overline" color="shade6">
            {showRecentSearch ? 'Recent Searches' : 'Results'}
          </Typography>
        )}
        {isEmpty(data) && searchTerm.length > 0 && !loading ? (
          <EmptyState
            onButtonClicked={onReset}
            Svg={Octopus}
            title="No search result"
            buttonText="Reset Search"
          />
        ) : (
          <PaginateList
            list={data || []}
            labelPath={['label']}
            maxItemPerPage={2}
            onClickItem={(item) => console.log(item)}
          />
        )}
      </Content>
    </Container>
  );
};

export default SearchLandingView;
