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
          <SearchAddressView
            value={searchTerm}
            resetValue={onReset}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search.."
          />
        </SearchContainer>

        {!isEmpty(data) && (
          <Typography variant="overline" color="shade6">
            {showRecentSearch ? 'Recent Searches' : `Results ${results.length}`}
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
            maxItemPerPage={6}
            onClickItem={(item) => {
              history.push(BUYER_ROUTES.SEARCH_PREVIEW(item.value));
              saveSearchHistory(item.value, item.label, item.count);
            }}
          />
        )}
      </Content>
    </Container>
  );
};

export default SearchLandingView;
