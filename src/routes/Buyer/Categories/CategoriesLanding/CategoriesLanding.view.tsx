import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import Card from 'components/module/Card';
import Search from 'components/module/Search';
import { Row, Col, Container } from 'react-grid-system';
import { Link } from 'react-router-dom';

import { CategoriesLandingGeneratedProps } from './CategoriesLanding.props';
import { CategoriesContainer } from './CategoriesLanding.style';

const CategoriesLandingView = (props: CategoriesLandingGeneratedProps) => {
  // const theme = useTheme();
  const {
    categories,
    search,
    onChangeSearchValue,
    resetSearchValue,
    currentPath,
  } = props;

  if (!categories) {
    return null;
  }

  return (
    <Container fluid>
      <Row className="search-row">
        <Col xs={12}>
          <Search
            value={search}
            onChange={onChangeSearchValue}
            resetValue={resetSearchValue}
            placeholder="e.g. Ocean Trout"
          />
        </Col>
      </Row>
      <Row style={{ marginLeft: 20, marginTop: 50 }}>
        {categories.length > 0 &&
          categories.map((category, index) => {
            console.log(`${currentPath}/${category.id}`);
            return (
              <Link to={`${currentPath}/${category.id}`} key={category.id}>
                <Col sm={3} key={index}>
                  <Card
                    sortIndex={category.sortIndex}
                    id={category.id}
                    image={category.thumbnail}
                    label={category.name}
                  />
                </Col>
              </Link>
            );
          })}
      </Row>
    </Container>
  );
};

export default CategoriesLandingView;
