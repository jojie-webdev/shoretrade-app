import React from 'react';

// import { useTheme } from 'utils/Theme';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import Search from 'components/module/Search';
import { Row, Col } from 'react-grid-system';
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
    <MarketContainer>
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
