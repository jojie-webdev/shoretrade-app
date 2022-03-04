import React from 'react';

import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import { Fish2 } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Loading from 'components/module/Loading';
import MobileHeader from 'components/module/MobileHeader';
import Search from 'components/module/Search/Search.view';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { BUYER_MARKET_REQUEST_ROUTES } from 'consts/routes';
import { Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router';
import { SearchLandingGeneratedProps } from 'routes/Buyer/Search/SearchLanding.props';
import {
  Container,
  LoadingContainer,
  Results,
  Label,
  SVGContainer,
} from 'routes/Buyer/Search/SearchLanding.style';
import { useTheme } from 'utils/Theme';

const SearchLandingView = (props: SearchLandingGeneratedProps) => {
  const theme = useTheme();
  const history = useHistory();
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const isBetween = useMediaQuery({
    query: '(min-width: 577px) and (max-width: 747px)',
  });

  const {
    data,
    isSearching,
    searchTerm,
    setSearchTerm,
    onReset,
    saveSearchHistory,
    isTyping,
  } = props;

  return (
    <Container>
      {!isSmallScreen ? (
        <Typography
          color={theme.isSFM ? 'secondary' : undefined}
          variant="title4"
          className="header-title"
        >
          <>
            {searchTerm.length <= 2 && (
              <>
                Discover 100,000+ products,
                <br />
                categories and sellers
              </>
            )}
          </>
        </Typography>
      ) : (
        <MobileHeader>Search</MobileHeader>
      )}

      <Row align="center" justify="between" nogutter>
        <div className="search-container">
          <Search
            placeholder={`e.g. Ocean Trout`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            resetValue={onReset}
            rounded
          />
        </div>

        {!isSmallScreen && searchTerm.length <= 2 && (
          <SVGContainer>
            <Fish2 height={186} width={326} fill={theme.grey.shade7} />
          </SVGContainer>
        )}
      </Row>

      {isSearching && !isTyping && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}

      {searchTerm.length > 2 && !isSearching && data.length === 0 && !isTyping && (
        <>
          <Row justify="between" nogutter className="no-search-results">
            <div>
              <Typography variant="title4">No search results</Typography>
              <Typography variant="label" weight="400" color="shade7">
                It seems we can’t find any results based on your search.
              </Typography>
            </div>

            {!isSmallScreen && isBetween && (
              <SVGContainer>
                <Fish2 height={186} width={326} fill={theme.grey.shade7} />
              </SVGContainer>
            )}
          </Row>

          <Button
            variant="primary"
            text="Create a market request"
            onClick={() =>
              history.push(BUYER_MARKET_REQUEST_ROUTES.CREATE_MARKET_REQUEST)
            }
            style={{ margin: '25px 0' }}
          />
        </>
      )}

      {data.length > 0 && (
        <Results notRecent={searchTerm.length > 2}>
          <Label variant="overline" color="shade6">
            {searchTerm.length <= 2 ? 'Recent searches' : 'Results'}
          </Label>

          {data.map((item, i) => (
            <Interactions
              key={i}
              value={item.label}
              onClick={() => {
                saveSearchHistory(item.value, item.label, item.count);
                history.push(BUYER_ROUTES.SEARCH_PREVIEW(item.value), {
                  title: item.label,
                });
              }}
            />
          ))}
        </Results>
      )}
    </Container>
  );
};

export default SearchLandingView;
