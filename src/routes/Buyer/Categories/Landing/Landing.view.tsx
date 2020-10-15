import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import { Filter } from 'components/base/SVG';
import Card from 'components/module/CategoryCards/Landing';
import Search from 'components/module/Search';
import { Row, Col, Container } from 'react-grid-system';
import { Link } from 'react-router-dom';

import { CategoriesLandingGeneratedProps } from './Landing.props';
import {
  CategoriesContainer,
  LoadingContainer,
  FilterButton,
} from './Landing.style';

const CategoriesLandingView = (props: CategoriesLandingGeneratedProps) => {
  // const theme = useTheme();
  const {
    categories,
    search,
    onChangeSearchValue,
    resetSearchValue,
    currentPath,
    onLoad,
  } = props;

  // useEffect(() => {
  //   onLoad();
  // }, []);

  // if (categories.length <= 0) {
  //   return (
  //     <LoadingContainer>
  //       <Spinner width={24} height={24} />
  //     </LoadingContainer>
  //   );
  // }

  return (
    <CategoriesContainer>
      <Row nogutter className="search-row">
        <Col xs={12}>
          <Search
            value={search}
            onChange={onChangeSearchValue}
            resetValue={resetSearchValue}
            placeholder="Search for a Product"
          />
        </Col>
        {/* <Col xs={1.5}>
          <FilterButton>
            Filters <Filter></Filter>
          </FilterButton>
        </Col> */}
      </Row>
      {categories.length <= 0 ? (
        <LoadingContainer>
          <Spinner width={24} height={24} />
        </LoadingContainer>
      ) : (
        <Row className="cards" style={{ marginTop: 20 }}>
          {categories.length > 0 &&
            categories.map((category, index) => {
              return (
                <Col sm={4} md={4} lg={3} key={category.id}>
                  <Link to={`${currentPath}/${category.id}`}>
                    <Card
                      sortIndex={category.sortIndex}
                      id={category.id}
                      image={category.thumbnail}
                      label={category.name}
                    />
                  </Link>
                </Col>
              );
            })}
        </Row>
      )}
    </CategoriesContainer>
  );
};

export default CategoriesLandingView;
