import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import Search from 'components/module/Search';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';

import { CategoriesSearchGeneratedProps } from './Search.props';
import { CSearchContainer } from './Search.style';

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

  return (
    <CSearchContainer>
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
    </CSearchContainer>
  );
};

export default CategoriesSearchView;
