import React from 'react';

import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner/Spinner.view';
import { Fish2 } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import Search from 'components/module/Search/Search.view';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router';
import { useTheme } from 'utils/Theme';

import { SearchLandingGeneratedProps } from './SearchLanding.props';
import {
  Container,
  LoadingContainer,
  Results,
  Label,
  SVGContainer,
} from './SearchLanding.style';

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
  } = props;

  return (
    <BoxContainer>
      <Container>
        <Typography variant="title4" className="header-title">
          {isSmallScreen ? (
            <>Search</>
          ) : (
            <>
              {searchTerm.length <= 2 && (
                <>
                  Discover 100.000+ products,
                  <br />
                  categories and sellers
                </>
              )}
            </>
          )}
        </Typography>

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

        {isSearching && (
          <LoadingContainer>
            <Spinner />
          </LoadingContainer>
        )}

        {searchTerm.length > 2 && !isSearching && data.length === 0 && (
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
              onClick={() => history.push(BUYER_ROUTES.CREATE_MARKET_REQUEST)}
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
    </BoxContainer>
  );
};

export default SearchLandingView;
