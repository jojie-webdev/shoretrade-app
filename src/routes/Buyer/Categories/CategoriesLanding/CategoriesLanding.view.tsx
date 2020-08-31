import React from 'react';

// import { useTheme } from 'utils/Theme';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import Card from 'components/module/Card';
import Search from 'components/module/Search';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';

import { CategoriesLandingGeneratedProps } from './CategoriesLanding.props';
import { CategoriesContainer } from './CategoriesLanding.style';

const CategoriesLandingView = (props: CategoriesLandingGeneratedProps) => {
  // const theme = useTheme();
  // const {
  //   onChangeSearchValue,
  //   searchValue,
  //   resetSearchValue,
  //   loading,
  //   results,
  //   currentPath,
  // } = props;
  return (
    <CategoriesContainer>
      <Row className="search-row">
        <Col xs={12}>
          <Search
            value={''}
            // onChange={'onChangeSearchValue'}
            resetValue={() => {}}
            placeholder="e.g. Ocean Trout"
          />
        </Col>
      </Row>
      <Row style={{ marginLeft: 40 }}>
        <Row className="items-row">
          <Card
            image={
              'https://s3-ap-southeast-2.amazonaws.com/shoretrade-prod-assets/category/Whole-Fish.jpg'
            }
            label="Fish"
          />
          <Card
            image={
              'https://s3-ap-southeast-2.amazonaws.com/shoretrade-prod-assets/category/Whole-Fish.jpg'
            }
            label="Fish"
          />
          <Card
            image={
              'https://s3-ap-southeast-2.amazonaws.com/shoretrade-prod-assets/category/Whole-Fish.jpg'
            }
            label="Fish"
          />
          <Card
            image={
              'https://s3-ap-southeast-2.amazonaws.com/shoretrade-prod-assets/category/Whole-Fish.jpg'
            }
            label="Fish"
          />
        </Row>
        <Row className="items-row" style={{ marginTop: 250 }}>
          {/* <Card />
          <Card />
          <Card />
          <Card /> */}
        </Row>
      </Row>
    </CategoriesContainer>
  );
};

export default CategoriesLandingView;
