import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';

import Spinner from 'components/base/Spinner';
import { Filter } from 'components/base/SVG';
import PreviewCard from 'components/module/CategoryCards/Preview';
import FilterModal from 'components/module/FilterModal/FilterModal.view';
import SearchAddressView from 'components/module/SearchAddress';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';

import { CategoriesPreviewGeneratedProps } from './Preview.props';
import {
  PreviewContainer,
  LoadingContainer,
  FilterButton,
} from './Preview.style';

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
    modalFilterProps,
  } = props;

  useEffect(() => {
    selectAddress(typeId);
    onLoad(typeId);
  }, []);

  return (
    <PreviewContainer>
      <Row className="search-row">
        <Col xs={10.5}>
          <SearchAddressView />
        </Col>
        <Col xs={1.5} className="filter-container">
          <FilterButton
            onClick={modalFilterProps.onClickClose}
            text="Filters"
            icon={<Filter />}
          />
        </Col>
      </Row>

      {results && results.length > 0 ? (
        <Row className="results-row">
          {results.map((product) => {
            return (
              <Col
                xxl={3}
                xl={4}
                lg={4}
                md={6}
                sm={6}
                key={product.id}
                className="market-item"
              >
                <Link to={`/buyer/product/${product.id}`}>
                  <PreviewCard
                    key={product.id}
                    id={product.id}
                    images={product.images}
                    type={product.type}
                    price={toPrice(product.price)}
                    remaining={product.remaining.toFixed(2)}
                    coop={product.coop}
                    minimumOrder={product.minimumOrder}
                    origin={product.origin}
                    weight={sizeToString(
                      product.size.unit,
                      product.size.from,
                      product.size.to
                    )}
                    isAquafuture={product.isAquafuture}
                    unit={product.measurementUnit}
                    state={product.state}
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

      <FilterModal {...modalFilterProps} />
    </PreviewContainer>
  );
};

export default CategoriesPreviewView;
