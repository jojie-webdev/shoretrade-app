import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import { Filter } from 'components/base/SVG';
import Card from 'components/module/CategoryCards/Landing';
import Search from 'components/module/Search';
import SearchAddressView from 'components/module/SearchAddress';
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
  const { categories, currentPath } = props;

  return (
    <CategoriesContainer>
      <Row nogutter className="search-row">
        <Col xs={12}>
          <SearchAddressView />
        </Col>
      </Row>
      {categories.length <= 0 ? (
        <LoadingContainer>
          <Spinner width={24} height={24} />
        </LoadingContainer>
      ) : (
        <Row className="cards">
          {categories.length > 0 &&
            categories.map((category) => {
              return (
                <Col xs={6} sm={6} md={6} lg={4} xl={3} key={category.id}>
                  <Link
                    to={{
                      pathname: `${currentPath}/${category.id}`,
                      state: { title: category.name },
                    }}
                  >
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
