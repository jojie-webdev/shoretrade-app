import React from 'react';

import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import { Fish2 } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import Search from 'components/module/Search/Search.view';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import { SearchLandingGeneratedProps } from './SearchLanding.props';
import { Container, Label, SVGContainer } from './SearchLanding.style';

const SearchLandingView = (props: SearchLandingGeneratedProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <BoxContainer>
      <Container>
        <Typography variant="title4" className="header-title">
          {isSmallScreen ? (
            <>Search</>
          ) : (
            <>
              Discover 100.000+ products,
              <br />
              categories and sellers
            </>
          )}
        </Typography>

        <Row align="center" justify="between" nogutter>
          <div className="search-container">
            <Search
              placeholder={`e.g. Ocean Trout`}
              value={''}
              onChange={() => {}}
              resetValue={() => {}}
              rounded
            />
          </div>

          {!isSmallScreen && (
            <SVGContainer>
              <Fish2 height={186} width={326} fill={theme.grey.shade7} />
            </SVGContainer>
          )}
        </Row>

        {/*<Row justify="between" nogutter className="no-search-results">*/}
        {/*  <div>*/}
        {/*    <Typography variant="title4">No search results</Typography>*/}
        {/*    <Typography variant="label" weight="400" color="shade7">*/}
        {/*      It seems we can’t find any results based on your search.*/}
        {/*    </Typography>*/}
        {/*  </div>*/}

        {/*  {!isSmallScreen && (*/}
        {/*    <SVGContainer>*/}
        {/*      <Fish2 height={186} width={326} fill={theme.grey.shade7} />*/}
        {/*    </SVGContainer>*/}
        {/*  )}*/}
        {/*</Row>*/}

        {/*<Button*/}
        {/*  variant="primary"*/}
        {/*  text="Create a market request"*/}
        {/*  onClick={() => {}}*/}
        {/*  style={{ margin: '25px 0' }}*/}
        {/*/>*/}

        {/*<div className="results">*/}
        {/*  <Label variant="overline" color="shade6">*/}
        {/*    Results*/}
        {/*  </Label>*/}

        {/*  <Interactions key={1} value="Result 1" onClick={() => {}} />*/}
        {/*</div>*/}

        <div className="recent-searches">
          <Label variant="overline" color="shade6">
            Recent searches
          </Label>

          <Interactions key={1} value="Result 1" onClick={() => {}} />
        </div>
      </Container>
    </BoxContainer>
  );
};

export default SearchLandingView;
