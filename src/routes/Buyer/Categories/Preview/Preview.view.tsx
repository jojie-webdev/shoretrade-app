import React from 'react';

// import { useTheme } from 'utils/Theme';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import Card from 'components/module/CategoryCards/Preview';
import Search from 'components/module/Search';
import { Row, Col, Container } from 'react-grid-system';
import { Link } from 'react-router-dom';

import { CategoriesPreviewGeneratedProps } from './Preview.props';
import { PreviewContainer } from './Preview.style';
const CategoriesPreviewView = (props: CategoriesPreviewGeneratedProps) => {
  // const theme = useTheme();
  const {
    results,
    onChangeSearchValue,
    searchValue,
    resetSearchValue,
    loading,
    onLoad,
    typeId,
    addresses,
    selectedAddress,
    selectAddress,
  } = props;

  return (
    <PreviewContainer>
      <Row className="search-row">
        <Col xs={12}>
          <Search
            value={searchValue}
            onChange={onChangeSearchValue}
            resetValue={resetSearchValue}
            placeholder="Search for an Atlantic Salmon"
          />
        </Col>
      </Row>
      {results.map((product) => {
        return <Card />;
      })}
    </PreviewContainer>
  );
};

export default CategoriesPreviewView;
