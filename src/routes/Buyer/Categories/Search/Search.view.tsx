import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import TypographyView from 'components/base/Typography';
import Search from 'components/module/Search';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import { GetListingTypesByCategoryTypeItem } from 'types/store/GetListingTypesByCategoryState';

import { CategoriesSearchGeneratedProps } from './Search.props';
import {
  SearchContainer,
  LoadingContainer,
  Image,
  DetailsContainer,
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

  const children = (result: GetListingTypesByCategoryTypeItem) => (
    <>
      <Image src={result.thumbnail} />
      <DetailsContainer>
        <TypographyView variant="label" style={{ fontSize: 16 }}>
          {' '}
          {result.name}
        </TypographyView>
        <div className="result-container">
          <TypographyView className="font" variant="label">
            ${result.price.to}
          </TypographyView>
          <TypographyView
            className="font"
            variant="label"
            color="shade6"
            style={{ marginLeft: 1 }}
          >
            per
          </TypographyView>
          <TypographyView
            variant="label"
            color="shade6"
            style={{ marginLeft: 4 }}
          >
            {result.measurementUnit}
          </TypographyView>
          <TypographyView variant="label" style={{ marginLeft: 1 }}>
            {result.count}
          </TypographyView>
          <TypographyView
            variant="label"
            color="shade6"
            style={{ marginLeft: 1 }}
          >
            item
          </TypographyView>
        </div>
      </DetailsContainer>
    </>
  );

  // if (results.length <= 0) {
  //   return (
  //     <LoadingContainer>
  //       <Spinner width={24} height={24} />
  //     </LoadingContainer>
  //   );
  // }
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
      {results.length <= 0 ? (
        <LoadingContainer>
          <Spinner width={24} height={24} />
        </LoadingContainer>
      ) : (
        <>
          {results.length > 0 ? (
            <>
              <div className="result-container">
                <TypographyView
                  variant="label"
                  color="warning"
                  style={{ fontSize: 24, fontWeight: 'normal' }}
                >
                  Results
                </TypographyView>
                <TypographyView
                  variant="label"
                  color="warning"
                  style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 24 }}
                >
                  {results.length}
                </TypographyView>
              </div>

              <Row className="items-row">
                <Col xs={12}>
                  {results.map((result) => (
                    <Link
                      to={`/buyer/categories/products/${result.id}`}
                      className="market-item"
                      key={result.id}
                    >
                      <Interactions
                        children={children(result)}
                        // value={r.name}
                        onClick={() => {}}
                      />
                    </Link>
                  ))}
                </Col>
              </Row>
            </>
          ) : null}
        </>
      )}
    </SearchContainer>
  );
};

export default CategoriesSearchView;
