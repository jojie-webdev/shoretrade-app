import React from 'react';

// import { useTheme } from 'utils/Theme';
import InteractionsView from 'components/base/Interactions';
import Search from 'components/module/Search';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';

import { MarketPricesGeneratedProps } from './MarketPrices.props';
import { MarketContainer } from './MarketPrices.style';

const MarketPricesView = (props: MarketPricesGeneratedProps): JSX.Element => {
  // const theme = useTheme();
  const {
    searchValue,
    onChangeSearchValue,
    resetSearchValue,
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
          />
        </Col>
      </Row>
      {/* Market Items List */}
      <Row className="items-row">
        <Col xs={12}>
          {Array.from('x'.repeat(10)).map((num) => (
            <Link
              to={`${currentPath}/randomId123123123`}
              className="market-item"
              key={num}
            >
              <InteractionsView value="Abait Tuna" onPress={() => {}} />
            </Link>
          ))}
        </Col>
      </Row>
    </MarketContainer>
  );
};

export default MarketPricesView;
