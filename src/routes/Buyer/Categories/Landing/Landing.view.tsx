import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import Card from 'components/module/CategoryCards/Landing';
import Search from 'components/module/Search';
import { Row, Col, Container } from 'react-grid-system';
import { Link } from 'react-router-dom';

import { CategoriesLandingGeneratedProps } from './Landing.props';
import { CategoriesContainer, LoadingContainer } from './Landing.style';

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

  useEffect(() => {
    onLoad();
  }, []);

  if (categories.length <= 0) {
    return (
      <LoadingContainer>
        <Spinner width={24} height={24} />
      </LoadingContainer>
    );
  }

  return (
    <CategoriesContainer>
      <Row className="search-row">
        <Col xs={12}>
          <Search
            value={search}
            onChange={onChangeSearchValue}
            resetValue={resetSearchValue}
            placeholder="Search for a Product"
          />
        </Col>
      </Row>
      <Row className="cards" style={{ marginTop: 20 }}>
        {categories.length > 0 &&
          categories.map((category, index) => {
            return (
              <Col sm={3} key={index}>
                <Link to={`${currentPath}/${category.id}`} key={category.id}>
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
    </CategoriesContainer>
  );
};

export default CategoriesLandingView;
