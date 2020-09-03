import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import Card from 'components/module/CategoryCards/Preview';
import Search from 'components/module/Search';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';

import { CategoriesPreviewGeneratedProps } from './Preview.props';
import { PreviewContainer, LoadingContainer } from './Preview.style';
const CategoriesPreviewView = (props: CategoriesPreviewGeneratedProps) => {
  // const theme = useTheme();
  const {
    results,
    onChangeSearchValue,
    searchValue,
    resetSearchValue,
    onLoad,
    typeId,
    addresses,
    selectedAddress,
    selectAddress,
  } = props;

  useEffect(() => {
    selectAddress(typeId);
    onLoad(typeId);
  }, []);

  // if (results.length <= 0) {
  //   return (
  //     <LoadingContainer>
  //       <Spinner width={24} height={24} />
  //     </LoadingContainer>
  //   );
  // }

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
      {results.length > 0 ? (
        <Row className="cards" style={{ marginTop: 20 }}>
          {results.map((product) => {
            return (
              <Col sm={3} key={product.id}>
                <Link
                  to={`/buyer/product/${product.id}`}
                  className="market-item"
                >
                  <Card
                    id={product.id}
                    images={product.images}
                    type={product.type}
                    price={product.price}
                    remaining={product.remaining}
                    coop={product.coop}
                    minimumOrder={product.minimumOrder}
                    origin={product.origin}
                    isAquafuture={product.isAquafuture}
                  />
                </Link>
              </Col>
            );
          })}
        </Row>
      ) : (
        <LoadingContainer>
          <Spinner width={24} height={24} />
        </LoadingContainer>
      )}
    </PreviewContainer>
  );
};

export default CategoriesPreviewView;
