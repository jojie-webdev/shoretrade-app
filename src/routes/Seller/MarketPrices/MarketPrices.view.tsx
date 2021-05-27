import React from 'react';

// import { useTheme } from 'utils/Theme';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import TypographyView from 'components/base/Typography';
import Search from 'components/module/Search';
import { isIOS } from 'react-device-detect';
import { Row, Col, Visible } from 'react-grid-system';
import { Link } from 'react-router-dom';

import { MarketPricesGeneratedProps } from './MarketPrices.props';
import { MarketContainer, SpinnerContainer } from './MarketPrices.style';

const MarketPricesView = (props: MarketPricesGeneratedProps): JSX.Element => {
  // const theme = useTheme();
  const {
    onChangeSearchValue,
    searchValue,
    resetSearchValue,
    loading,
    results,
    currentPath,
  } = props;

  return (
    <MarketContainer isIOS={isIOS}>
      <Visible xs>
        <Row className="title-row">
          <Col xs={12}>
            <TypographyView variant="title5" color="noshade">
              Market Prices
            </TypographyView>
          </Col>
        </Row>
      </Visible>
      <Row className="search-row">
        <Col xs={12} md={6}>
          <Search
            value={searchValue}
            onChange={onChangeSearchValue}
            resetValue={resetSearchValue}
            placeholder="e.g. Ocean Trout"
          />
        </Col>
      </Row>
      {/* Market Items List */}
      <Row className="items-row">
        <Col xs={12}>
          {loading ? (
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          ) : (
            <>
              {results.map((r) => (
                <Link
                  to={`${currentPath}/${r.typeId}`}
                  className="market-item"
                  key={r.typeId}
                >
                  <Interactions value={r.typeName} onClick={() => {}} />
                </Link>
              ))}
            </>
          )}
        </Col>
      </Row>
    </MarketContainer>
  );
};

export default MarketPricesView;
