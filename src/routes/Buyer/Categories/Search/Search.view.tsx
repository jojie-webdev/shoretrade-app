import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import Search from 'components/module/Search';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';

import { CategoriesSearchGeneratedProps } from './Search.props';
import {
  SearchContainer,
  SpinnerContainer,
  LoadingContainer,
} from './Search.style';

const CategoriesSearchView = (props: CategoriesSearchGeneratedProps) => {
  const {
    results,
    searchValue,
    onChangeSearchValue,
    resetSearchValue,
    onLoad,
    categoryId,
    addresses,
    selectedAddress,
    selectAddress,
  } = props;

  useEffect(() => {
    selectAddress(categoryId);
    onLoad(categoryId);
  }, []);

  const children = (r: any) => (
    <Row>
      <img src={r.thumbnail} style={{ width: 100, height: 100 }} />
      <p
        style={{
          color: 'black',
          marginLeft: 10,
          marginTop: '15%',
        }}
      >
        {r.name}
      </p>
    </Row>
  );

  if (results.length <= 0) {
    return (
      <LoadingContainer>
        <Spinner width={24} height={24} />
      </LoadingContainer>
    );
  }

  return (
    <SearchContainer>
      <Row className="search-row">
        <Col xs={12}>
          <Search
            value={searchValue}
            onChange={onChangeSearchValue}
            resetValue={resetSearchValue}
            placeholder="Search for a Whole Fish"
          />
        </Col>
      </Row>
      <Row className="items-row">
        <Col xs={12}>
          {results &&
            results.map((r) => (
              <Link
                to={`/buyer/categories/products/${r.id}`}
                className="market-item"
                key={r.id}
              >
                <Interactions
                  children={children(r)}
                  // value={r.name}
                  onClick={() => {}}
                />
              </Link>
            ))}
        </Col>
      </Row>
    </SearchContainer>
  );
};

export default CategoriesSearchView;
