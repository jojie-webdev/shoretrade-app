import React from 'react';

// import { useTheme } from 'utils/Theme';
import Interactions from 'components/base/Interactions';
import Loading from 'components/module/Loading';
import MobileHeader from 'components/module/MobileHeader';
import Search from 'components/module/Search';
import { Row, Col, Visible } from 'react-grid-system';
import { Link } from 'react-router-dom';
import MarketDataImg from 'res/images/market-data.png';

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

  return <img src={MarketDataImg} width="100%" />;

  {
    /* return (
    <MarketContainer>
      <Visible xs>
        <Row>
          <Col xs={12}>
            <MobileHeader>Market Data</MobileHeader>
          </Col>
        </Row>
      </Visible>
      <Row className="search-row">
        <Col xs={12}>
          <Search
            value={searchValue}
            onChange={onChangeSearchValue}
            resetValue={resetSearchValue}
            placeholder="e.g. Ocean Trout"
          />
        </Col>
      </Row>
      <Row className="items-row">
        <Col xs={12}>
          {loading ? (
            <SpinnerContainer>
              <Loading />
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
  ); */
  }
};

export default MarketPricesView;
